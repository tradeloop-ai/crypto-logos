import { CMCMap } from '@/lib/types'
import Image from 'next/image'

export function CryptoCard({ crypto }: { crypto: CMCMap }) {
  return (
    <div className='flex h-[160px] w-[135px] flex-col rounded-md border border-accent bg-white py-2 hover:border-muted-foreground dark:bg-black'>
      <div className='flex basis-8/12 items-center justify-center'>
        <div>
          <Image
            className='rounded-full border'
            src={`https://s2.coinmarketcap.com/static/img/coins/128x128/${crypto?.id}.png`}
            width={50}
            height={50}
            alt=''
            unoptimized
          />
        </div>
      </div>
      <div className='flex basis-4/12 items-center justify-center'>
        <div className='text-center'>
          <p className='font-semibold'>{crypto.symbol}</p>
          <p className='text-sm text-muted-foreground'>{crypto.name}</p>
        </div>
      </div>
    </div>
  )
}
