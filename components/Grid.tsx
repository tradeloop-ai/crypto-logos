import { VirtualGrid } from '@/components/VirtualGrid'
import { CMCMap } from '@/lib/types'
import { sql } from '@vercel/postgres'
import { unstable_cache, unstable_noStore } from 'next/cache'

export async function Grid() {
  unstable_noStore()

  const cache = unstable_cache(
    async () => {
      console.log('cache invalidated')
      return await sql.query(`SELECT id, rank, symbol, name FROM public.cmc ORDER BY rank`)
    },
    [],
    { revalidate: 604800 }
  )

  const result = await cache()

  const CMC = result.rows as CMCMap[] | null

  return <>{CMC && <VirtualGrid CMC={CMC || []} />}</>
}
