import { VirtualGrid } from '@/components/VirtualGrid'
import { CMCMap } from '@/lib/types'
import { sql } from '@vercel/postgres'
import { unstable_noStore } from 'next/cache'

export async function PPRGrid() {
  unstable_noStore()
  const result = await sql.query(`SELECT id, rank, symbol, name FROM public.cmc ORDER BY rank`)
  const CMC = result.rows as CMCMap[] | null

  return <>{CMC && <VirtualGrid CMC={CMC || []} />}</>
}
