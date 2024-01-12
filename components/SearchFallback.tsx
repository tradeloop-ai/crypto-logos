import { Input } from '@/components/ui/input'

export function SearchFallback() {
  return (
    <div className='flex w-full items-center justify-center pb-4'>
      <Input type='text' id='loading' placeholder='Loading...' className='w-full max-w-sm' />
    </div>
  )
}
