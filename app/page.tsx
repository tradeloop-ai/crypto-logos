import LogoGrid from '@/app/LogoGrid'
import Search from '@/app/Search'
import { Suspense } from 'react'

export default function Home() {
  return (
    <div className='p-2 lg:p-3 xl:p-4'>
      <div className='flex w-full items-center justify-center pb-4'>
        <Suspense fallback={<p>Loading Search...</p>}>
          <Search />
        </Suspense>
      </div>
      <Suspense fallback={<p>Loading Logos...</p>}>
        <LogoGrid />
      </Suspense>
    </div>
  )
}
