## About

Add crypto logos to your application by either downloading from 9000+ logos using [**Crypto Logos**](https://cryptologos.vercel.app), or through the **API**.

## Features

- A collection of over 9000 cryptocurrencies and their logos in PNG format.
- An easy-to-use and lightning fast API to get up-to-date logos in real-time.
- Updated every Sunday at 5AM UTC through cron jobs ```/api/cron/CMC/route.ts```.

## API
- Powered by Vercel Functions, Postgres, KV.
- No authentication or API keys, instead a very generous rate limit of 30 requests per minute is imposed based on IP. Please open an issue to request an increase.
- Support POST requests with parameters for customized logo PNGs.
- Check out the API Docs for more info.

## Future
- SVG & JSX versions will be added progressively. 
- Please open a discussion or issue on GitHub for any API suggestions regarding how to handle multiple formats.
- Add docs on how to use [SVGR](https://react-svgr.com/).

## Development

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Clone the repository, then run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.


## Deploy on Vercel

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
