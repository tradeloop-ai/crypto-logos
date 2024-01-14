// import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'

export function StaticSearchFallback() {
  return (
    <div className='flex w-full items-center justify-center pb-4'>
      {/*<Input type='text' id='loading' className='fixed top-4 w-full max-w-sm' />*/}
      <Skeleton className='fixed top-4 h-9 w-full max-w-sm' />
    </div>
  )
}
