import { Skeleton } from '@/components/ui/skeleton'

export function CryptoCardFallback({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className='flex h-44 w-36 flex-col rounded-md border border-accent bg-white py-2 hover:border-muted-foreground dark:bg-black'
        >
          <Skeleton className='h-full w-full scale-y-110'></Skeleton>
          {/*<div className='flex basis-8/12 items-center justify-center'>*/}
          {/*  <div>*/}
          {/*    <Skeleton className='h-[50px] w-[50px] rounded-full'></Skeleton>*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className='flex basis-4/12 items-center justify-center'>*/}
          {/*  <div className='flex flex-col items-center justify-center space-y-1'>*/}
          {/*    <Skeleton className='h-5 w-12'></Skeleton>*/}
          {/*    <Skeleton className='h-4 w-20'></Skeleton>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      ))}
    </>
  )
}
