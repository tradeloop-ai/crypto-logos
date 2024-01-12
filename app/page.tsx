import LogoGrid from '@/app/LogoGrid'
import Search from '@/app/Search'
import { CryptoCardSkeleton } from '@/components/CryptoCardSkeleton'
import { Suspense } from 'react'

export default function Home({
  searchParams
}: {
  searchParams?: { search?: string; page?: string }
}) {
  return (
    <div className='p-2 lg:p-3 xl:p-4'>
      <Search />
      <ul
        // key={Math.random()} // invalidate router cache
        role='list'
        className='grid grid-cols-2 justify-items-center gap-4 min-[480px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7'
      >
        <Suspense fallback={<CryptoCardSkeleton count={40} />}>
          <LogoGrid search={searchParams?.search} />
        </Suspense>
      </ul>
    </div>
  )
}
