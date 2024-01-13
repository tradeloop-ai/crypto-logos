import { VirtualGrid } from '@/components/VirtualGrid'
import { CMCMap } from '@/lib/types'
import { createClient } from '@supabase/supabase-js'
import { unstable_noStore } from 'next/cache'

export async function CMCGrid() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  unstable_noStore()
  const { data: CMC } = await supabase
    .from('cmc_map')
    .select('id,rank,name,symbol')
    .order('rank', { ascending: true })
    // .limit(20)
    .returns<CMCMap[]>()

  return <>{CMC && <VirtualGrid CMC={CMC || []} />}</>
}
