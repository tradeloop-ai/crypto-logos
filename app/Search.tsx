'use client'

import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function Search({ className }: { className?: string }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  function handleSearch(query: string) {
    const params = new URLSearchParams(searchParams)
    if (query) {
      params.set('query', query)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className={cn('grid w-full max-w-sm items-center gap-1.5', className)}>
      {/*<Label htmlFor='symbol'>Search</Label>*/}
      <Input
        type='text'
        id='symbol'
        placeholder='Search by name or symbol'
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  )
}
