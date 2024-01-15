# API Documentation

## Endpoint: `/api/logos`

This endpoint provides functionality to fetch logo information for cryptocurrency symbols. It supports different modes and offers optional parsing of symbols.

### HTTP Method: `POST`

#### Request Body

- **symbols** (required, array of strings): The cryptocurrency symbols for which to fetch logo information. This field is mandatory.
- **mode** (optional, string): Determines the response format. Can be either `'single'` or `'multiple'`. Default is `'single'`.
    - `'single'`: Returns the most probable logo for each symbol based on popularity.
    - `'multiple'`: Returns all logos found for the symbols.
- **parser** (optional, object): Contains parsing options for symbols. If not provided, parsing is enabled by default with the option to remove numbers.
    - **enable** (boolean): Whether to enable parsing. Default is `true`.
    - **options** (object):
        - **removeNumbers** (boolean): Whether to remove numbers from symbols. Default is `true`. 
          - `1000PEPEUSDT --> PEPE`
          - `ZEUS10000USDT --> ZEUS`

##### Example Request Body

```json
{
  "symbols": ["BTCUSDT", "ETH", "1000PEPE"],
  "mode": "single",
  "parser": {
    "enable": true,
    "options": {
      "removeNumbers": true
    }
  }
}
```

#### Response
- The response is a JSON array of objects.
- Each object contains id, rank, and symbol of a cryptocurrency.

#### Success Response
- Status Code: 200 OK
- Content: An array of logo objects.
- Example Success Response (Single Mode)
```json
[
  {
    "id": 1,
    "rank": 1,
    "symbol": "BTC"
  },
  {
    "id": 1027,
    "rank": 2,
    "symbol": "ETH"
  },
  {
    "id": 24478,
    "rank": 110,
    "symbol": "PEPE"
  }
]
```

#### Error Responses
- No Symbols Requested 
  - Status Code: 400 Bad Request 
  - Content: [] with a status text of 'No symbols requested'. 
- No Logos Found 
  - Status Code: 201 Created 
  - Content: [] with a status text of 'No logos found'. 
- Unexpected Error 
  - Status Code: 400 Bad Request 
  - Content: [] with a status text of 'An unexpected error occurred'.

#### Types 
```typescript
interface Crypto {
  id: number;
  rank: number;
  symbol: string;
}
```