import { PPRGrid } from '@/app/ppr/PPRGrid'
import { Search } from '@/components/Search'
import { SearchFallback } from '@/components/SearchFallback'
import { VirtualGridFallback } from '@/components/VirtualGridFallback'
import { Suspense } from 'react'

export default function PPR() {
  return (
    <div>
      <div className='fixed z-50 flex h-16 w-full items-center justify-center bg-transparent backdrop-blur-lg'>
        <Suspense fallback={<SearchFallback />}>
          <Search />
        </Suspense>
      </div>
      <Suspense fallback={<VirtualGridFallback />}>
        <PPRGrid />
      </Suspense>
    </div>
  )
}
