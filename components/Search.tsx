'use client'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function Search({ className }: { className?: string }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  function handleSearch(search: string) {
    const params = new URLSearchParams(searchParams)
    if (search) {
      params.set('search', search)
    } else {
      params.delete('search')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Input
      type='text'
      id='search'
      placeholder='Search by name or symbol'
      onChange={(e) => {
        handleSearch(e.target.value)
      }}
      defaultValue={searchParams.get('search')?.toString()}
      className={cn('w-full max-w-sm', className)}
    />
  )
}
