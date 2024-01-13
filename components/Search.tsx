'use client'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function Search({ className }: { className?: string }) {
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
    <div className={cn('flex w-full items-center justify-center pb-4', className)}>
      <Input
        type='text'
        id='symbol'
        placeholder='Search by name or symbol'
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get('search')?.toString()}
        className='w-full max-w-sm'
      />
    </div>
  )
}
