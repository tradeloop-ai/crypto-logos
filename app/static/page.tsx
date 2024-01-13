import Search from '@/components/Search'
import { SearchFallback } from '@/components/SearchFallback'
import { VirtualGrid } from '@/components/VirtualGrid'
import { CMC } from '@/lib/CMC'
import { Suspense } from 'react'

export default function Static() {
  return (
    <div>
      <Suspense fallback={<p>Loading Search</p>}>
        <div className='fixed z-50 h-16 w-full bg-transparent backdrop-blur-lg'>
          <Search className={'fixed top-4 pb-0'} />
        </div>
      </Suspense>
      <VirtualGrid CMC={CMC} />
    </div>
  )
}
