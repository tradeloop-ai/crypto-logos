'use client'

import { CryptoCard } from '@/components/CryptoCard'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import { CMCMap } from '@/lib/types'
import { useSearchParams } from 'next/navigation'
import { CSSProperties, memo, Ref, useCallback, useEffect, useState } from 'react'
import { FixedSizeGrid, GridOnScrollProps } from 'react-window'
import { ReactWindowScroller as WindowScroller } from 'react-window-scroller'

export function VirtualGrid({ CMC }: { CMC: CMCMap[] }) {
  const xl = useMediaQuery('(min-width: 1280px)')
  const lg = useMediaQuery('(min-width: 1024px)')
  const md = useMediaQuery('(min-width: 768px)')
  const sm = useMediaQuery('(min-width: 640px)')
  const min480 = useMediaQuery('(min-width: 480px)')

  const width = useCallback(() => {
    // if (typeof window === 'undefined') return 0
    if (xl) return 135 * 8 + 48 * 2 + 20 // xl:px-12
    else if (lg) return 135 * 6 + 40 * 2 + 20 // lg:px-10
    else if (md) return 135 * 5 + 32 * 2 + 20 // md:px-8
    else if (sm) return 135 * 4 + 24 * 2 + 20 // sm:px-6
    else if (min480) return 135 * 3 + 20 * 2 + 20 // min-[480px]:px-5
    return 135 * 2 + 16 * 2 // px-4
  }, [xl, lg, md, sm, min480])

  const columns = useCallback(() => {
    // if (typeof window === 'undefined') return 0
    if (xl) return 8 // xl
    else if (lg) return 6 // lg
    else if (md) return 5 // md
    else if (sm) return 4 // sm
    else if (min480) return 3 // min-[480px]
    return 2
  }, [xl, lg, md, sm, min480])

  const [dimensions, setDimensions] = useState({
    height: 0,
    width: 0,
    columns: 0
  })

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: width(),
        columns: columns()
      })
    }

    handleResize()
  }, [xl, lg, md, sm, min480, columns, width])

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
        // px-[10px]
        <div style={style} className='flex items-center justify-center'>
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
  const columnCount = dimensions.columns
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
            className=''
          >
            {MemoizedCell}
          </FixedSizeGrid>
        )}
      </WindowScroller>
    </div>
  )
}
