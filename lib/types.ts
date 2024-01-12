export type CMCMap = {
  id: number
  rank: number
  name: string
  symbol: string
  slug: string
  is_active: boolean
  first_historical_data: string
  last_historical_data: string
  platform: {
    id: number
    name: string
    slug: string
    symbol: string
    token_address: string
  }
}
