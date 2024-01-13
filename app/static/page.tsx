import { Search } from '@/app/static/Search'
import { SearchFallback } from '@/components/SearchFallback'
import { VirtualGrid } from '@/components/VirtualGrid'
import { CMC } from '@/lib/CMC'
import { Suspense } from 'react'

export default function Static() {
  return (
    <div>
      <div className='fixed z-50 h-16 w-full bg-transparent backdrop-blur-lg'>
        <Suspense fallback={<SearchFallback />}>
          <Search />
        </Suspense>
      </div>
      <VirtualGrid CMC={CMC} />
    </div>
  )
}
