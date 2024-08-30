# News Aggregator

## TODO

- [x] Article search and filtering: Users should be able to search for articles by keyword and filter the results by date, category, and source.
- [x] Personalized news feed: Users should be able to customize their news feed by selecting their preferred sources, categories, and authors.
- [x] Mobile-responsive design: The website should be optimized for viewing on mobile devices.

## Setup

Copy `.env.example` to `.env`
```sh
cp .env.example .env
````

## How to run
```sh
docker compose up --build
```
Go to http://localhost:5173

## How to test
```sh
npm run test
```

## Notes
- _For some reason, unfortunately, the tests using Vitest are been false positives_
- _Due to the heterogeneous nature of the API sources, filters like Author is not supported_

