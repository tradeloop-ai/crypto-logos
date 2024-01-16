import { CMCMap } from '@/lib/types'
import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const response = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map', {
    headers: {
      'X-CMC_PRO_API_KEY': process.env.CMC_PRO_API_KEY! as string
    }
  })
  const json = await response.json()
  const cmc = json.data as CMCMap[]

  const delete_query = await sql.query(`DELETE FROM public.cmc`)

  const insert_query = await sql.query(
    `INSERT INTO public.cmc (id, rank, name, symbol, slug, is_active, first_historical_data, last_historical_data, platform)
     SELECT id, rank, name, symbol, slug, is_active, first_historical_data, last_historical_data, platform::jsonb
     FROM json_populate_recordset(NULL::public.cmc, $1)`,
    [JSON.stringify(cmc)]
  )

  console.log(
    `${delete_query.rowCount} coins deleted & ${insert_query.rowCount} coins inserted from CMC`
  )

  return NextResponse.json(
    {
      message: `${insert_query.rowCount} coins updated from CMC`
    },
    {
      status: 200
    }
  )
}
