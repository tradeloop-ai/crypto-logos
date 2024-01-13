import { CryptoCardFallback } from '@/components/CryptoCardFallback'
import { Search } from '@/components/Search'
import { SearchFallback } from '@/components/SearchFallback'
import { VirtualGrid } from '@/components/VirtualGrid'
import { CMC } from '@/lib/CMC'
import { Suspense } from 'react'

export default function Static() {
  return (
    <div>
      <div className='fixed z-50 h-16 w-full bg-transparent backdrop-blur-lg'>
        <Suspense fallback={<SearchFallback />}>
          <Search className={'fixed top-4 pb-0'} />
        </Suspense>
      </div>
      <Suspense fallback={<CryptoCardFallback count={32} />}>
        <VirtualGrid CMC={CMC} />
      </Suspense>
    </div>
  )
}
