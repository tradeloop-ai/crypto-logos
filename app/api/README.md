# API Documentation
Try the [API Playground](https://cryptologos.vercel.app/api/playground)

## Endpoint: `/api/getLogos`

This endpoint provides functionality to fetch logo information for cryptocurrency symbols. It supports different modes and offers optional parsing of symbols. There is a rate limit of 30 requests per minute on this endpoint.

### HTTP Method: `POST`

#### Request Body

- **symbols** (required, array of strings): The cryptocurrency symbols for which to fetch logo information. This field is mandatory.
- **resolution** (optional, string): Choose from either `'16'`, `'32'`, `'64'`, or `'128'`. Default is `'64'`.
- **mode** (optional, string): Determines the response format. Can be either `'single'` or `'multiple'`. Default is `'single'`.
    - `'single'`: Returns the most probable logo for each symbol based on popularity.
    - `'multiple'`: Returns all logos found for each symbol.
- **parser** (optional, object): Contains parsing options for symbols. If not provided, parsing is enabled by default with the option to remove numbers.
    - **enable** (boolean): Whether to enable parsing. Default is `true`.
    - **options** (object):
        - **removeNumbers** (boolean): Whether to remove the lot/bundle size indicator from symbols. Default is `true`. 
          - `1000PEPEUSDT --> PEPE`
          - `ZEUS10000USDT --> ZEUS`
          - `1INCHUSDT --> 1INCH`

##### Example Request Body

```json
{
  "symbols": [
    "BTCUSDT",
    "ETH",
    "1000PEPE"
  ],
  "resolution": "64",
  "mode": "single",
  "parser": {
    "enable": true,
    "options": {
      "removeNumbers": true
    }
  }
}
```

### Responses

The response is a JSON array of objects. Each object contains png, rank, symbol, and name of a cryptocurrency.

#### Success Response
- Status Code: 200 OK
- Content: An array of Crypto objects.
- Example Success Response (Single Mode)
```json
[
  {
    "png": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
    "rank": 1,
    "symbol": "BTC",
    "name": "Bitcoin"
  },
  {
    "png": "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    "rank": 2,
    "symbol": "ETH",
    "name": "Ethereum"
  },
  {
    "png": "https://s2.coinmarketcap.com/static/img/coins/64x64/24478.png",
    "rank": 110,
    "symbol": "PEPE",
    "name": "Pepe"
  }
]
```

#### Error Responses
- No Symbols Requested 
  - Status Code: 400 Bad Request 
  - Content: Empty [] with a status text of 'No symbols requested'. 
- No Logos Found 
  - Status Code: 201 Created 
  - Content: Empty [] with a status text of 'No logos found'. 
- Unexpected Error 
  - Status Code: 400 Bad Request 
  - Content: Empty [] with a status text of 'An unexpected error occurred'.

#### Types 
```typescript
interface Crypto {
  png: string; // url
  rank: number;
  symbol: string;
  name: string
}
```

## Endpoint: `/api/getAllLogos`

This endpoint provides functionality to fetch all 9000+ logos available in the database. There is a rate limit of 5 requests per day on this endpoint.

### HTTP Method: `GET`
No parameters

### Responses

The response is a JSON array of objects. Each object contains the id, rank, symbol, and name of a cryptocurrency. Unlike the `api/getLogos` endpoint, you are returned the id of the cryptocurrency rather than the link to the png. You can use this id to get the required png like so:
- Assuming the coin ID is 1 (BTC)...
- 16x16 png = https://s2.coinmarketcap.com/static/img/coins/16x16/1.png
- 32x32 png = https://s2.coinmarketcap.com/static/img/coins/32x32/1.png
- 64x64 png = https://s2.coinmarketcap.com/static/img/coins/64x64/1.png
- 128x128 png = https://s2.coinmarketcap.com/static/img/coins/128x128/1.png

#### Success Response
- Status Code: 200 OK
- Content: An array of Crypto objects.
- Example Success Response
```json
[
  {
    "id": "1",
    "rank": 1,
    "symbol": "BTC",
    "name": "Bitcoin"
  },
  {
    "id": "1027",
    "rank": 2,
    "symbol": "ETH",
    "name": "Ethereum"
  },
  {
    "id": "24478",
    "rank": 110,
    "symbol": "PEPE",
    "name": "Pepe"
  },
  ...{}
]
```

#### Error Responses
- Unexpected Error
    - Status Code: 400 Bad Request
    - Content: Empty [] with a status text of 'An unexpected error occurred'.

#### Types
```typescript
interface Crypto {
  id: string;
  rank: number;
  symbol: string;
  name: string
}
```