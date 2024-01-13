'use client'

import { CryptoCard } from '@/components/CryptoCard'
import { CryptoCardFallback } from '@/components/CryptoCardFallback'
import { Skeleton } from '@/components/ui/skeleton'
import { CMCMap } from '@/lib/types'
import { createClient } from '@supabase/supabase-js'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export function InfiniteScroll({
  search,
  initialCMC
}: {
  search?: string
  initialCMC?: CMCMap[] | null
}) {
  const [CMC, setCMC] = useState<CMCMap[] | null | undefined>(initialCMC)
  const [page, setPage] = useState(0)
  const [ref, inView] = useInView()
  const [fetchMore, setFetchMore] = useState(true)

  let prevSearch = useRef<string | undefined>(undefined)

  async function loadMoreCMC() {
    const next = page + 1
    const rangeLow = 20 + page * 20
    const rangeHigh = 20 + next * 20

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    let query

    let nextCMC: CMCMap[] | null | undefined = undefined

    if (search && (fetchMore || search !== prevSearch.current)) {
      console.log(
        'InfiniteScroll',
        `Fetching for search: ${search}
      rangeLow: ${rangeLow} | rangeHigh: ${rangeHigh}`
      )

      setFetchMore(true)

      query = supabase
        .from('cmc_map')
        .select('id,rank,name,symbol')
        .textSearch('symbol_name', search)
        .order('rank', { ascending: true })
        .range(rangeLow, rangeHigh)
        .limit(20)
        .returns<CMCMap[]>()
      const { data } = await query
      nextCMC = data
    } else if (fetchMore) {
      console.log(
        'InfiniteScroll',
        `Fetching next few rows
      rangeLow: ${rangeLow} | rangeHigh: ${rangeHigh}`
      )
      query = supabase
        .from('cmc_map')
        .select('id,rank,name,symbol')
        .order('rank', { ascending: true })
        .range(rangeLow, rangeHigh)
        .limit(20)
        .returns<CMCMap[]>()
      const { data } = await query
      nextCMC = data
    }

    prevSearch.current = search

    if (nextCMC?.length) {
      setPage(next)
      setCMC((prev) => [...(prev?.length ? prev : []), ...(nextCMC?.length ? nextCMC : [])])
    }

    if (!nextCMC || nextCMC.length < 20) {
      console.log('InfiniteScroll', `End of page, ${nextCMC?.length} final fetched`)
      setFetchMore(false)
    }
  }

  useEffect(() => {
    if (inView) loadMoreCMC().then()
  }, [inView, loadMoreCMC])

  return (
    <>
      {CMC
        // ?.filter(
        // (coin) =>
        //   search === undefined ||
        //   coin.name.toLowerCase().includes(search.toLowerCase()) ||
        //   coin.symbol.toLowerCase().includes(search.toLowerCase())
        // )
        // ?.sort((a, b) => a.rank - b.rank)
        ?.map((crypto) => {
          return <CryptoCard key={crypto.id} crypto={crypto} />
        })}
      {fetchMore && (
        <>
          <div
            ref={ref}
            className='flex h-44 w-36 flex-col rounded-md border border-accent bg-white py-2 hover:border-muted-foreground dark:bg-black'
          >
            <Skeleton className='h-full w-full scale-y-110'></Skeleton>
          </div>
          <CryptoCardFallback count={7} />
        </>
      )}
      <div className='col-span-2 flex w-full items-center justify-center py-12 min-[480px]:col-span-3 sm:col-span-4 md:col-span-5 lg:col-span-6 xl:col-span-7'>
        {fetchMore ? (
          <p className='text-center'>Loading...</p>
        ) : CMC?.length === 0 ? (
          <p className='text-center'>No Results Found</p>
        ) : (
          <p className='text-center'>End of Results</p>
        )}
      </div>
    </>
  )
}
