# develop

Welcome to Sentry's Developer documentation!

## Quickstart

Simply run 

```shell
 yarn run init
 yarn gatsby develop
```

## Get the Config Ready

Copy the example configuration (and update if needed):

```shell
cp .env.example .env.development
```

## Running it with Yarn and/or Volta

No need to install `gatsby-cli` globally

```shell
yarn install
yarn gatsby develop
```

Docs live in `docs/` and `pages/`.

https://www.gatsbyjs.org/docs/

### Alternatively

Install Gatsby:

```shell
npm install -g gatsby-cli
```

Run the development server:

```shell
gatsby develop
```

Docs live in `docs/` and `pages/`.

### Testing Search

Search is built with Algolia. At some point may wish to test index changes or other changes to search behavior. To do this you'll need to run `gatsby build` with a special flag to write to your development environment:

```
GATSBY_ENV=development gatsby build
```

You will also need to configure the following in your `.env.development`:

- `ALGOLIA_INDEX=1`
- `ALGOLIA_ADMIN_KEY=[admin write key]`

## Deployment

`master` is automatically deployed via Vercel.
