import { Skeleton } from '@/components/ui/skeleton'

export function StaticSearchFallback({ className }: { className?: string }) {
  return (
    <div className='flex w-full items-center justify-center pb-4'>
      <Skeleton className='fixed top-4 h-9 w-full max-w-sm' />
    </div>
  )
}
