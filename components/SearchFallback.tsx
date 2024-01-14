import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export function SearchFallback({ className }: { className?: string }) {
  return <Skeleton className={cn('h-9 w-full max-w-sm', className)} />
}
