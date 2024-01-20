'use client'

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from '@/components/ui/context-menu'
import { CMC } from '@/lib/types'
import Image from 'next/image'

export function CryptoCard({ crypto }: { crypto: CMC }) {
  async function handleDownload() {
    try {
      const response = await fetch(`/api/downloadLogo?id=${crypto.id}`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${crypto.symbol}.png`
      document.body.appendChild(link)
      link.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error downloading the image:', error)
    }
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className='relative flex h-[160px] w-[135px] flex-col rounded-md border border-accent bg-white py-2 hover:border-muted-foreground dark:bg-black'>
          {/*<Button*/}
          {/*  variant='outline'*/}
          {/*  size='icon'*/}
          {/*  className='absolute right-2 top-2 h-5 w-5'*/}
          {/*  onClick={handleDownload}*/}
          {/*>*/}
          {/*  <DownloadIcon className='h-3 w-3' />*/}
          {/*</Button>*/}
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
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleDownload}>Download Logo</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
