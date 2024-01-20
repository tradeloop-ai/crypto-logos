import { getSymbol } from '@/lib/utils'
import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'
import { sql } from '@vercel/postgres'
import { NextRequest, NextResponse } from 'next/server'

const ratelimit = new Ratelimit({
  redis: kv,
  // 5 requests from the same IP in 10 seconds
  limiter: Ratelimit.slidingWindow(5, '10 s')
})

export async function POST(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1'
  const { success, pending, limit, reset, remaining } = await ratelimit.limit(ip)
  if (!success) return NextResponse.json([], { status: 400, statusText: 'Rate limit exceeded' })

  const body = await request.json()
  console.log('body', body)

  // symbols
  const symbols = body.symbols as string[]

  // resolution
  let resolution = body.resolution as '16' | '32' | '64' | '128'
  if (resolution !== '16' && resolution !== '32' && resolution !== '64' && resolution !== '128') {
    resolution = '64'
  }
  // mode
  let mode = body.mode as 'single' | 'multiple' | undefined
  // handle no symbols in request body error
  if (!symbols || symbols.length === 0)
    return NextResponse.json([], { status: 400, statusText: 'No symbols requested' })
  // default mode = single
  if (mode === undefined) {
    mode = 'single'
  }

  // parser
  let parser = body.parser as { enable: boolean; options: { removeNumbers: boolean } }
  // default parser = enabled & remove numbers
  if (parser === undefined) {
    parser = { enable: true, options: { removeNumbers: true } }
  }
  // default parser options = remove numbers
  if (
    parser.enable &&
    (parser?.options === undefined || parser?.options?.removeNumbers === undefined)
  ) {
    parser = { enable: true, options: { removeNumbers: true } }
  }
  let parsedSymbols: string[] = []
  if (parser.enable) {
    parsedSymbols = symbols.map((symbol) => {
      if (parser.options.removeNumbers) {
        return getSymbol(symbol, true)
      } else {
        return getSymbol(symbol, false)
      }
    })
  }

  // Prepare the query
  let symbolList = parser.enable ? parsedSymbols : symbols
  let placeholders = symbolList.map((_, index) => `$${index + 1}`).join(',')
  let query = `SELECT id, rank, symbol, name FROM cmc WHERE symbol IN (${placeholders})`

  // Execute the query
  const res = await sql.query(query, symbolList)
  const data = res.rows as Data[]

  if (!data)
    return NextResponse.json([], { status: 400, statusText: 'An unexpected error occurred' })

  if (data.length === 0)
    return NextResponse.json(data, {
      status: 201,
      statusText: 'No logos found'
    })

  const coinLogos = data.map((coin) => {
    return {
      png: `https://s2.coinmarketcap.com/static/img/coins/${resolution}x${resolution}/${coin.id}.png`,
      rank: Number(coin.rank),
      symbol: coin.symbol,
      name: coin.name
    }
  })

  if (mode === 'multiple') {
    return NextResponse.json(coinLogos, {
      status: 200,
      statusText: `${coinLogos.length} logos found`
    })
  }

  const record: { [symbol: string]: Crypto } = {}

  coinLogos?.forEach((obj) => {
    if (!record[obj.symbol] || record[obj.symbol].rank > obj.rank) {
      record[obj.symbol] = obj
    }
  })

  const singleCoinLogos = Object.values(record)

  return NextResponse.json(singleCoinLogos, {
    status: 200,
    statusText: `${singleCoinLogos.length} logos found`
  })
}

interface Crypto {
  png: string
  rank: number
  symbol: string
  name: string
}

interface Data {
  id: number
  rank: number
  symbol: string
  name: string
}
