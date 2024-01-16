'use client'

import { MarkdownCodeblock } from '@/components/markdown-codeblock'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

export default function Test() {
  const [symbols, setSymbols] = useState<string>(JSON.stringify(['BTCUSDT', 'ETH', '1000PEPE']))
  const [resolution, setResolution] = useState<'16' | '32' | '64' | '128'>('64')
  const [mode, setMode] = useState<'single' | 'multiple'>('single')
  const [parser, setParser] = useState<{ enable: boolean; options: { removeNumbers: boolean } }>({
    enable: true,
    options: { removeNumbers: true }
  })

  const [response, setResponse] = useState([])

  async function handleTest() {
    let parsedSymbols: string[]
    try {
      parsedSymbols = JSON.parse(symbols)
    } catch (error) {
      toast(`Error parsing JSON: ${error}`)
      return
    }
    const capitalizedParsedSymbols = parsedSymbols.map((symbol) => symbol.toUpperCase())
    const response = await fetch('/api/logos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        symbols: capitalizedParsedSymbols,
        resolution: resolution,
        mode: mode,
        parser: {
          enable: parser.enable,
          options: {
            removeNumbers: parser.options.removeNumbers
          }
        }
      })
    })
    if (response.status !== 200) {
      toast(response.statusText)
      return
    }
    const json = await response.json()
    // console.log(`/api/logos (${new Date().toLocaleTimeString()})`, json)
    toast('Check console for output')
    setResponse(json)
  }

  const code = `const response = await fetch('/api/logos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    symbols: ${symbols},
    resolution: "${resolution}",
    mode: "${mode}",
    parser: {{
      enable: ${parser.enable},
      options: {
        removeNumbers: ${parser.options.removeNumbers}
      }
    }}
  })
})
const json = await response.json()`

  return (
    <div>
      <div className='flex w-full flex-col items-center justify-center space-y-4 p-12 lg:flex-row lg:space-x-12 lg:space-y-0'>
        {/* Code Block */}
        <div className='flex basis-1/2'>
          <MarkdownCodeblock language={'jsx'} value={code} />
        </div>

        <div className='flex basis-1/2 flex-col space-y-4'>
          {/* Symbols */}
          <div>
            <Label className='font-semibold'>Symbols</Label>
            <Textarea
              value={symbols}
              onChange={(e) => {
                setSymbols(e.target.value)
              }}
              className='h-[165px] w-full font-mono'
            />
          </div>

          {/* Resolution */}
          <div className='flex flex-col'>
            <RadioGroup
              name='resolution'
              id='resolution'
              onValueChange={(value: '16' | '32' | '64' | '128') => setResolution(value)}
              className='font-mono'
            >
              <Label htmlFor='resolution' className='font-sans font-semibold'>
                Resolution
              </Label>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='16' id='r1' checked={resolution === '16'} />
                <Label htmlFor='r1'>16 x 16</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='32' id='r2' checked={resolution === '32'} />
                <Label htmlFor='r2'>32 x 32</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='64' id='r3' checked={resolution === '64'} />
                <Label htmlFor='r3'>64 x 64</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='128' id='r4' checked={resolution === '128'} />
                <Label htmlFor='r4'>128 x 128</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Mode */}
          <div>
            <RadioGroup
              name='mode'
              id='mode'
              onValueChange={(value: 'single' | 'multiple') => setMode(value)}
              className='font-mono'
            >
              <Label htmlFor='mode' className='font-sans font-semibold'>
                Mode
              </Label>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='single' id='r5' checked={mode === 'single'} />
                <Label htmlFor='r5'>single</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='multiple' id='r6' checked={mode === 'multiple'} />
                <Label htmlFor='r6'>multiple</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Parser */}
          <div className='flex flex-row space-x-12'>
            {/* Enable */}
            <div>
              <RadioGroup
                name='parser'
                id='parser'
                onValueChange={(value: string) => {
                  const enable = JSON.parse(value) as boolean
                  setParser((prevParser) => ({
                    ...prevParser,
                    enable: enable
                  }))
                }}
                className='font-mono'
              >
                <Label htmlFor='parser' className='font-sans font-semibold'>
                  Parser
                </Label>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='true' id='r7' checked={parser.enable} />
                  <Label htmlFor='r7'>enable</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='false' id='r8' checked={!parser.enable} />
                  <Label htmlFor='r8'>disable</Label>
                </div>
              </RadioGroup>
            </div>

            {/* removeNumbers */}
            <div>
              <RadioGroup
                name='removeNumbers'
                id='removeNumbers'
                onValueChange={(value: string) => {
                  const removeNumbers = JSON.parse(value) as boolean
                  setParser((prevParser) => ({
                    ...prevParser,
                    options: {
                      removeNumbers: removeNumbers
                    }
                  }))
                }}
                className='font-mono'
              >
                <Label htmlFor='removeNumbers' className='font-sans font-semibold'>
                  Remove Numbers
                </Label>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='true' id='r9' checked={parser.options.removeNumbers} />
                  <Label htmlFor='r9'>true</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='false' id='r10' checked={!parser.options.removeNumbers} />
                  <Label htmlFor='r10'>false</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className='flex flex-row space-x-4'>
            <Button onClick={handleTest} className='flex-grow'>
              Fetch
            </Button>
            <Link
              href='https://github.com/0x-Legend/crypto-logos/blob/c35e0141730f32ac4d9768d7ff56ec8ed58721d5/app/api/README.md'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Button className='ml-4'>Docs</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className='px-12 pb-12'>
        <MarkdownCodeblock language={'json'} value={JSON.stringify(response, null, 2)} />
      </div>
    </div>
  )
}
