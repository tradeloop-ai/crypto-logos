import { Input } from '@/components/ui/input'

export function StaticSearchFallback() {
  return (
    <div className='flex w-full items-center justify-center pb-4'>
      <Input
        type='text'
        id='loading'
        placeholder='Loading...'
        className='fixed top-4 w-full max-w-sm'
      />
    </div>
  )
}
