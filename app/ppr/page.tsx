import { CMCGrid } from '@/app/ppr/CMCGrid'
import { Search } from '@/components/Search'
import { SearchFallback } from '@/components/SearchFallback'
import { Suspense } from 'react'

export default function PPR() {
  return (
    <div>
      <div className='fixed z-50 h-16 w-full bg-transparent backdrop-blur-lg'>
        <Suspense fallback={<SearchFallback />}>
          <Search className={'fixed top-4 pb-0'} />
        </Suspense>
      </div>
      <Suspense fallback={<p>Suspense...</p>}>
        <CMCGrid />
      </Suspense>
    </div>
  )
}
