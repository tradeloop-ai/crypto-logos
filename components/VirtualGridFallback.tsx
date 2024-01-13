import { CryptoCardFallback } from '@/components/CryptoCardFallback'

export function VirtualGridFallback() {
  return (
    <div className='flex items-center justify-center pt-[74px]'>
      <ul
        role='list'
        className='grid w-[302px] grid-cols-2 justify-items-center gap-5 min-[480px]:w-[445px] min-[480px]:grid-cols-3 sm:w-[588px] sm:grid-cols-4 md:w-[739px] md:grid-cols-5 lg:w-[890px] lg:grid-cols-6 xl:w-[1176px] xl:grid-cols-8'
      >
        <CryptoCardFallback count={32} />
      </ul>
    </div>
  )
}
