'use client'

import { Button } from '@/components/ui/button'

export default function Test() {
  async function handleTest() {
    const response = await fetch('/api/logos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ symbols: ['BTCUSDT', 'ETH', 'PEPE'], parser: { enable: false } })
    })
    const json = await response.json()
    console.log(json)
  }

  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <Button onClick={handleTest}>Test</Button>
    </div>
  )
}
