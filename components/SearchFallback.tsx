import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export function SearchFallback({ className }: { className?: string }) {
  return (
    <div className={cn('flex w-full items-center justify-center pb-4', className)}>
      <Skeleton className='h-9 w-full max-w-sm' />
    </div>
  )
}
