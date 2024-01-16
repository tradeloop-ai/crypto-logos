import { PPRGrid } from '@/components/PPRGrid'
import { Search } from '@/components/Search'
import { SearchFallback } from '@/components/SearchFallback'
import { VirtualGridFallback } from '@/components/VirtualGridFallback'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Suspense } from 'react'

export default function PPR() {
  return (
    <div>
      <div className='fixed z-50 flex h-16 w-full items-center justify-center bg-transparent backdrop-blur-lg'>
        <Suspense fallback={<SearchFallback />}>
          <Search />
        </Suspense>
        <Link href={'/api/playground'}>
          <Button className='ml-4'>API</Button>
        </Link>
      </div>
      <Suspense fallback={<VirtualGridFallback />}>
        <PPRGrid />
      </Suspense>
    </div>
  )
}
