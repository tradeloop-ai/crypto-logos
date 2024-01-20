export type CMC = {
  id: number
  rank: number
  name: string
  symbol: string
  slug?: string
  is_active?: boolean
  first_historical_data?: string
  last_historical_data?: string
  platform?: {
    id: number
    name: string
    slug: string
    symbol: string
    token_address?: string
  }
}

export type Crypto = {
  png: string
  rank: number
  symbol: string
  name: string
}
