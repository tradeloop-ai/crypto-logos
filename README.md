## About

An abstraction built from the actively maintained database of cryptocurrencies by CoinMarketCap. Add crypto logos to your application by downloading from 9000+ logos using [**Crypto Logos**](https://cryptologos.vercel.app), or through the [**API**](https://github.com/0x-Legend/crypto-logos/blob/c35e0141730f32ac4d9768d7ff56ec8ed58721d5/app/api/README.md).

## Features

- A collection of over 9000 cryptocurrencies and their logos in PNG format.
- An easy-to-use and lightning fast API to get up-to-date logos in real-time.
- Updated every Sunday at 5AM UTC through cron jobs ```/api/cron/CMC/route.ts```.

## API
- Powered by Vercel Functions, Postgres, KV (and Blob soon).
- No authentication or API keys, just a 30 reqs/min rate-limit based on IP. 
  - Please open an issue to request an increase.
- Support POST requests with parameters to customize logo output.
- View the [API Docs](https://github.com/0x-Legend/crypto-logos/blob/c35e0141730f32ac4d9768d7ff56ec8ed58721d5/app/api/README.md) or try the [API Playground](https://cryptologos.vercel.app/api/playground) for more info.

## Future
- SVG & JSX versions will be added progressively.
- Docs on how to use [SVGR](https://react-svgr.com/).

## Development

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Clone the repository, then run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You will need to add the following to your .env.local.
- [CMC_PRO_API_KEY](https://pro.coinmarketcap.com/)
- [POSTGRES_URL](https://vercel.com/storage/postgres)
- [KV_REST_API_TOKEN](https://vercel.com/storage/kv)
- [KV_REST_API_URL](https://vercel.com/storage/kv)

Then visit http://localhost:3000/api/cron/cmc to trigger data retrieval from CMC
- This is only required if it is your first time running dev server or deployment.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.


## Deploy on Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fajayvignesh01%2FCrypto-Logos&env=CMC_PRO_API_KEY&stores=[{"type":"postgres"},{"type":"kv"}])

The easiest way to deploy this app is to use the Vercel Deploy button above.
- You will need to obtain a [CMC Pro API Key](https://pro.coinmarketcap.com/).
- Once your application is deployed, visit `/api/cron/cmc` to trigger data retrieval from CMC.
  - This is only required for your first deployment.
- And you're good to go!
