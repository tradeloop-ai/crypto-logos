import { CryptoCard } from '@/components/CryptoCard'
import Search from '@/components/Search'
import { SearchFallback } from '@/components/SearchFallback'
import { CMC } from '@/lib/CMC'
import { Suspense } from 'react'

export default function Static({
  searchParams
}: {
  searchParams?: { search?: string; page?: string }
}) {
  return (
    <div className='p-2 lg:p-3 xl:p-4'>
      <Suspense fallback={<SearchFallback />}>
        <Search />
      </Suspense>
      <ul
        role='list'
        className='grid grid-cols-2 justify-items-center gap-4 min-[480px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7'
      >
        {CMC?.filter(
          (coin) =>
            searchParams?.search === undefined ||
            coin.name.toLowerCase().includes(searchParams?.search.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchParams?.search.toLowerCase())
        )
          // ?.sort((a, b) => a.rank - b.rank)
          ?.map((crypto) => {
            return <CryptoCard key={crypto.id} crypto={crypto} />
          })}
      </ul>
    </div>
  )
}
