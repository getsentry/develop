const path = require("path");

module.exports = {
  // pathPrefix: `/develop`,
  siteMetadata: {
    title: "Sentry Documentation",
    homeUrl: "https://sentry.io",
    sitePath: "develop.sentry.dev",
    description: "",
    author: "@getsentry",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-sharp",
    "gatsby-plugin-zeit-now",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: "anchor",
              icon: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.879 6.05L15 1.93A5.001 5.001 0 0 1 22.071 9l-4.121 4.121a1 1 0 0 1-1.414-1.414l4.12-4.121a3 3 0 1 0-4.242-4.243l-4.121 4.121a1 1 0 1 1-1.414-1.414zm2.242 11.9L9 22.07A5 5 0 1 1 1.929 15l4.121-4.121a1 1 0 0 1 1.414 1.414l-4.12 4.121a3 3 0 1 0 4.242 4.243l4.121-4.121a1 1 0 1 1 1.414 1.414zm-8.364-.122l13.071-13.07a1 1 0 0 1 1.415 1.414L6.172 19.242a1 1 0 1 1-1.415-1.414z" fill="currentColor"></path></svg>`,
              enableCustomId: true,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              noInlineHighlight: true,
            },
          },
        ],
      },
    },
    "gatsby-plugin-react-helmet",
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
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
};
