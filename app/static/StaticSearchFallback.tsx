import { Skeleton } from '@/components/ui/skeleton'

export function StaticSearchFallback() {
  return (
    <div className='fixed top-4 flex w-full items-center justify-center'>
      <Skeleton className='h-9 w-full max-w-sm' />
    </div>
  )
}
