import { VirtualGrid } from '@/components/VirtualGrid'
import { CMC } from '@/lib/types'
import { sql } from '@vercel/postgres'
import { unstable_cache } from 'next/cache'

export async function ISRGrid() {
  const cache = unstable_cache(
    async () => {
      console.log('CMC cache revalidated')
      return await sql.query(`SELECT id, rank, symbol, name FROM public.cmc ORDER BY rank`)
    },
    ['cmc'],
    { tags: ['cmc'], revalidate: 604800 }
  )

  const result = await cache()

  const CMC = result.rows as CMC[] | null

  return <>{CMC && <VirtualGrid CMC={CMC || []} />}</>
}
