import { CMCMap } from '@/lib/types'
import { createClient } from '@supabase/supabase-js'
// import { unstable_cache } from 'next/cache'
import { unstable_noStore as noStore } from 'next/cache'
import Image from 'next/image'

export default async function LogoGrid({
  searchParams
}: {
  searchParams?: { query?: string; page?: string }
}) {
  noStore()

  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)

  // const get_cmc_map = unstable_cache(
  //   async () => {
  //     const { data } = await supabase
  //       .from('cmc_map')
  //       .select('id,rank,name,symbol')
  //       .limit(100)
  //       .returns<CMCMap[]>()
  //     console.log('fetched cmc_map')
  //     return data
  //   },
  //   ['cmc_map'],
  //   { revalidate: 86400 }
  // )
  //
  // const cmc = await get_cmc_map()

  const { data: cmc } = await supabase
    .from('cmc_map')
    .select('id,rank,name,symbol')
    .limit(100)
    .returns<CMCMap[]>()
  console.log('fetched cmc_map')

  const filteredCmc = cmc?.filter(
    (coin) =>
      searchParams?.query === undefined ||
      coin.name.toLowerCase().includes(searchParams.query.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchParams.query.toLowerCase())
  )
  return (
    <div className='grid grid-cols-2 justify-items-center gap-4 min-[480px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7'>
      {filteredCmc
        ?.sort((a, b) => a.rank - b.rank)
        ?.map((coin) => {
          return (
            <div
              key={coin.id}
              className='flex h-44 w-36 flex-col rounded-md border border-accent bg-white py-2 hover:border-muted-foreground dark:bg-black'
            >
              <div className='flex basis-8/12 items-center justify-center'>
                <div>
                  <Image
                    className='rounded-full border'
                    src={`https://s2.coinmarketcap.com/static/img/coins/128x128/${coin?.id}.png`}
                    width={50}
                    height={50}
                    alt=''
                  />
                </div>
              </div>
              <div className='flex basis-4/12 items-center justify-center'>
                <div className='text-center'>
                  <p className='font-semibold'>{coin.symbol}</p>
                  <p className='text-sm text-muted-foreground'>{coin.name}</p>
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}
