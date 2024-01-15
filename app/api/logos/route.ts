import { getSymbol } from '@/lib/utils'
import { createClient } from '@supabase/supabase-js'
import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'
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

  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)

  const { data: coinLogos } = await supabase
    .from('cmc_map')
    .select('id,rank,symbol')
    .in('symbol', parser.enable ? parsedSymbols : symbols)
    .returns<Crypto[]>()

  if (!coinLogos)
    return NextResponse.json([], { status: 400, statusText: 'An unexpected error occurred' })

  if (coinLogos.length === 0)
    return NextResponse.json(coinLogos, {
      status: 201,
      statusText: 'No logos found'
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
  id: number
  rank: number
  symbol: string
}
