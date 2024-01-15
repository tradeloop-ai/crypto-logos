import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Function to remove "USD" or "USDT" from the end of the string
 * @param symbol - any string with USD or USDT suffix
 * @param removeNumbers - remove numbers at the beginning or end of the symbol >=10
 */
export function getSymbol(symbol: string, removeNumbers?: boolean) {
  // Regular expression to match either "USD" or "USDT" or "PERP" at the end of the symbol
  const regex = /(USD|USDT|PERP)$/
  let result = symbol.replace(regex, '').trim()

  if (removeNumbers) {
    // Regular expression to match numbers >10 at the beginning or end of the symbol
    const regex2 = /^(1000000|100000|10000|1000|100|10)|(1000000|100000|10000|1000|100|10)$/
    result = result.replace(regex2, '').trim()
  }

  return result
}
