# Crypto currency price monitor

A small frontend app for monitoring the prices of crypto currencies in live mode.

The CryptoCompare API is used to get the data. For production you will need to generate (api has a FREE plan) [CryptoCompare API key](https://min-api.cryptocompare.com/documentation).

## Under the hood

- vue3
- pinia
- typescript
- vite as a bundler

## Installation

- clone project
- install dependencies

```terminal
npm i
```

- make a copy of `.env.sample` and rename it to `.env`
- setup your VITE_CRYPTOAPI_KEY
- run development mode

```terminal
npm run dev
```

- or build project for production

```terminal
npm run build
```
