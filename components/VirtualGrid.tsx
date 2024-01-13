'use client'

import { CryptoCard } from '@/components/CryptoCard'
import { CMCMap } from '@/lib/types'
import { useSearchParams } from 'next/navigation'
import { CSSProperties, memo, Ref, useEffect, useState } from 'react'
import { FixedSizeGrid, GridOnScrollProps } from 'react-window'
import { ReactWindowScroller as WindowScroller } from 'react-window-scroller'

export function VirtualGrid({ CMC }: { CMC: CMCMap[] }) {
  const getColumns = (width: number) => {
    if (width >= 1280) return 8 // xl
    else if (width >= 1024) return 6 // lg
    else if (width >= 768) return 5 // md
    else if (width >= 640) return 4 // sm
    else if (width >= 480) return 3 // min-[480px]
    return 2
  }

  const getWidth = (width: number) => {
    if (width >= 1280) return 135 * 8 + 48 * 2 // xl:px-12
    else if (width >= 1024) return 135 * 6 + 40 * 2 // lg:px-10
    else if (width >= 768) return 135 * 5 + 32 * 2 // md:px-8
    else if (width >= 640) return 135 * 4 + 24 * 2 // sm:px-6
    else if (width >= 480) return 135 * 3 + 20 * 2 // min-[480px]:px-5
    return 135 * 2 + 16 * 2 // px-4
  }

  const [dimensions, setDimensions] = useState({
    height: 1280,
    width: getWidth(1280),
    columnCount: getColumns(1280)
  })

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: getWidth(window.innerWidth),
        columnCount: getColumns(window.innerWidth)
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const MemoizedCell = memo(
    ({
      columnIndex,
      rowIndex,
      style,
      data
    }: {
      columnIndex: any
      rowIndex: any
      style: any
      data: any
    }) => {
      // Calculate the index in the data array
      const index = rowIndex * data.columnCount + columnIndex
      const item = data.items[index]

      // Check if the item exists
      if (!item) return <div style={style}></div>

      return (
        <div style={style} className='flex items-center justify-center px-[10px]'>
          <CryptoCard key={item.id} crypto={item} />
        </div>
      )
    }
  )
  MemoizedCell.displayName = 'MemoizedCell'

  // Process the data (apply search filter, sorting, etc.)
  const searchParams = useSearchParams()
  const search = searchParams.get('search') as string | null
  const processedData = CMC.filter(
    (coin) =>
      search === null ||
      coin.name.toLowerCase().includes(search?.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search?.toLowerCase())
  )

  // Define the number of columns and rows
  const columnCount = dimensions.columnCount
  const rowCount = Math.ceil(processedData.length / columnCount)

  return (
    <div className='flex items-center justify-center px-4 pt-16 min-[480px]:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12'>
      <WindowScroller isGrid>
        {({ ref, outerRef, style, onScroll }) => (
          <FixedSizeGrid
            height={dimensions.height}
            width={dimensions.width}
            rowHeight={180}
            rowCount={rowCount}
            columnWidth={dimensions.width / columnCount}
            columnCount={columnCount}
            itemData={{ items: processedData, columnCount }} // Pass processed data and column count
            // WindowScroller Props
            ref={ref as Ref<FixedSizeGrid>}
            outerRef={outerRef as Ref<FixedSizeGrid> | undefined}
            style={style as CSSProperties | undefined}
            onScroll={onScroll as ((props: GridOnScrollProps) => any) | undefined}
          >
            {MemoizedCell}
          </FixedSizeGrid>
        )}
      </WindowScroller>
    </div>
  )
}
