# Sentry Developer Documentation

Welcome to [Sentry's Developer documentation](https://develop.sentry.dev)!

## Quickstart

Simply run the following:

```shell
 yarn run init
 yarn run develop
```

Open the docs on your browser at http://localhost:8000/

NOTES:
* `yarn run init` copies `.env.example` to `.env.development`.
* No need to install `gatsby-cli` globally
* Docs live in `docs/` and `pages/`.

## Making Search Changes

The search functionality is built with [Algolia](https://www.algolia.com/doc/api-client/getting-started/install/javascript/?language=javascript). If you wish to test index changes or other changes to the searching behavior, you'll need to generate a production build with a special flag to write to your development environment:

```
GATSBY_ENV=development yarn gatsby build
```

NOTES:
* Using `GATSBY_ENV=development` allows you to reuse the `.env.development` file
* The contents will be placed under `public/`

You will also need to configure the following in your `.env.development`:

- `ALGOLIA_INDEX=1`
- `ALGOLIA_ADMIN_KEY=[admin write key]`

## Deployment

`master` is automatically deployed via Vercel.
