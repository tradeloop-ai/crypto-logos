import { Search } from '@/components/Search'
import { SearchFallback } from '@/components/SearchFallback'
import { VirtualGrid } from '@/components/VirtualGrid'
import { VirtualGridFallback } from '@/components/VirtualGridFallback'
import { CMC } from '@/lib/CMC'
import { Suspense } from 'react'

export default function Static() {
  return (
    <div>
      <div className='fixed z-50 flex h-16 w-full items-center justify-center bg-transparent backdrop-blur-lg'>
        <Suspense fallback={<SearchFallback />}>
          <Search />
        </Suspense>
      </div>
      <Suspense fallback={<VirtualGridFallback />}>
        <VirtualGrid CMC={CMC} />
      </Suspense>
    </div>
  )
}
