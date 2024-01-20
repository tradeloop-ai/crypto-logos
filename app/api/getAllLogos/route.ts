import { CMC } from '@/lib/types'
import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'
import { sql } from '@vercel/postgres'
import { NextRequest, NextResponse } from 'next/server'

export const revalidate = 604800

const ratelimit = new Ratelimit({
  redis: kv,
  // 5 requests from the same IP in 1 day
  limiter: Ratelimit.slidingWindow(5, '1 d')
})

export async function GET(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1'
  const { success, pending, limit, reset, remaining } = await ratelimit.limit(ip)
  if (!success) return NextResponse.json([], { status: 400, statusText: 'Rate limit exceeded' })

  // Execute the query
  const res = await sql`SELECT id, rank, symbol, name FROM cmc ORDER BY rank`
  const data = res.rows as CMC[]

  if (!data || data.length === 0)
    return NextResponse.json([], { status: 400, statusText: 'An unexpected error occurred' })

  const coinLogos = data.map((coin) => {
    return {
      id: coin.id,
      rank: Number(coin.rank),
      symbol: coin.symbol,
      name: coin.name
    }
  })

  return NextResponse.json(coinLogos, {
    status: 200,
    statusText: `${coinLogos.length} logos found`
  })
}
