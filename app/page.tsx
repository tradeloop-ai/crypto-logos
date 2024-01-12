import Search from '@/app/Search'
import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'

type CMCMap = {
  id: number
  rank: number
  name: string
  symbol: string
  slug: string
  is_active: boolean
  first_historical_data: string
  last_historical_data: string
  platform: {
    id: number
    name: string
    slug: string
    symbol: string
    token_address: string
  }
}

export default async function Home({
  searchParams
}: {
  searchParams?: { query?: string; page?: string }
}) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: cmc } = await supabase
    .from('cmc_map')
    .select('id,rank,name,symbol')
    .returns<CMCMap[]>()

  console.log(searchParams?.query)

  const filteredCmc = cmc?.filter(
    (coin) =>
      searchParams?.query === undefined ||
      coin.name.toLowerCase().includes(searchParams.query.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchParams.query.toLowerCase())
  )

  return (
    <div className='p-4 px-24'>
      <div className='flex w-full items-center justify-center pb-4'>
        <Search />
      </div>
      <div className='grid grid-cols-7 justify-items-center gap-4'>
        {filteredCmc
          ?.sort((a, b) => a.rank - b.rank)
          ?.map((coin) => {
            return (
              <div
                key={coin.id}
                className='flex h-44 w-36 flex-col rounded-md border border-accent bg-white py-2 dark:bg-black'
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
    </div>
  )
}
