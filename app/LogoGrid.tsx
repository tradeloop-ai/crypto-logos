import InfiniteScroll from '@/app/InfiniteScroll'
import { CMCMap } from '@/lib/types'
import { createClient } from '@supabase/supabase-js'

export default async function LogoGrid({ search }: { search?: string }) {
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)

  let query

  if (search) {
    query = supabase
      .from('cmc_map')
      .select('id,rank,name,symbol')
      .textSearch('symbol_name', search)
      .order('rank', { ascending: true })
      .limit(20)
      .returns<CMCMap[]>()
  } else {
    query = supabase
      .from('cmc_map')
      .select('id,rank,name,symbol')
      .order('rank', { ascending: true })
      .limit(20)
      .returns<CMCMap[]>()
  }

  const { data: initialCMC } = await query

  return <InfiniteScroll search={search} initialCMC={initialCMC} />
}
