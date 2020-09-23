// const path = require("path");
const activeEnv =
  process.env.GATSBY_ENV || process.env.NODE_ENV || "development";

console.log(`Using environment config: '${activeEnv}'`);

require("dotenv").config({
  path: `.env.${activeEnv}`,
});

const queries = require("./src/utils/algolia");

const getPlugins = () => {
  const plugins = [
    {
      resolve: '@sentry/gatsby',
      options: {
        dsn:
          process.env.SENTRY_DSN ||
          'https://f107f3f0deb544289e4e056922e5e5a4@o1.ingest.sentry.io/5266138',
        tracesSampleRate: activeEnv === 'development' ? 0 : 1,
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    'gatsby-plugin-zeit-now',
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          'UA-30327640-1', // Sentry
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        remarkPlugins: [require('remark-deflist')],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-copy-linked-files`,
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: 'anchor',
              icon: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.879 6.05L15 1.93A5.001 5.001 0 0 1 22.071 9l-4.121 4.121a1 1 0 0 1-1.414-1.414l4.12-4.121a3 3 0 1 0-4.242-4.243l-4.121 4.121a1 1 0 1 1-1.414-1.414zm2.242 11.9L9 22.07A5 5 0 1 1 1.929 15l4.121-4.121a1 1 0 0 1 1.414 1.414l-4.12 4.121a3 3 0 1 0 4.242 4.243l4.121-4.121a1 1 0 1 1 1.414 1.414zm-8.364-.122l13.071-13.07a1 1 0 0 1 1.415 1.414L6.172 19.242a1 1 0 1 1-1.415-1.414z" fill="currentColor"></path></svg>`,
              enableCustomId: true,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: 'gatsby-remark-mermaid',
          },
          {
            resolve: require.resolve('./plugins/gatsby-plugin-code-tabs'),
          },
          {
            resolve: require.resolve('./plugins/gatsby-plugin-include'),
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              noInlineHighlight: true,
            },
          },
          {
            resolve: `gatsby-remark-check-links`,
          },
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs`,
        path: `${__dirname}/src/docs`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: require.resolve('./plugins/gatsby-plugin-jsonschema'),
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ];
  if (process.env.ALGOLIA_INDEX === "1") {
    plugins.push({
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries,
        chunkSize: 10000, // default: 1000
        enablePartialUpdates: true,
        matchFields: ["text", "section", "title", "url", "keywords"],
      },
    });
  }
  return plugins;
};

module.exports = {
  // pathPrefix: `/develop`,
  siteMetadata: {
    title: "Sentry Developer Documentation",
    homeUrl: "https://sentry.io",
    sitePath: "develop.sentry.dev",
    description: "",
    author: "@getsentry",
  },
  plugins: getPlugins(),
};
