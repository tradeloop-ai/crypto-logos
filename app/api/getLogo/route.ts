import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get('id') as string
  return await fetch(`https://s2.coinmarketcap.com/static/img/coins/128x128/${id}.png`)
}
