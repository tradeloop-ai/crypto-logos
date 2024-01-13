import { CMCGrid } from '@/app/ppr/CMCGrid'
import { Search } from '@/app/ppr/Search'
import { SearchFallback } from '@/components/SearchFallback'
import { Suspense } from 'react'

export default function PPR() {
  return (
    <div>
      <div className='fixed z-50 h-16 w-full bg-transparent backdrop-blur-lg'>
        <Suspense fallback={<SearchFallback />}>
          <Search />
        </Suspense>
      </div>
      <Suspense fallback={<p>Suspense...</p>}>
        <CMCGrid />
      </Suspense>
    </div>
  )
}
