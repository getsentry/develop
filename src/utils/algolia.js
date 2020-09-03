const {
  extrapolate,
  sentryAlgoliaIndexSettings,
} = require("sentry-global-search");

const pageQuery = `{
    pages: allMdx(
      filter: {
        fileAbsolutePath: { regex: "/(pages|docs)/" },
      }
    ) {
      edges {
        node {
          objectID: id
          frontmatter {
            title
          }
          fields {
              slug
          }
          excerpt(pruneLength: 5000)
        }
      }
    }
  }`;

const flatten = (arr) =>
  arr.map(({ node: { frontmatter, objectID, excerpt, fields } }) => {
    // https://github.com/getsentry/sentry-global-search#algolia-record-stategy
    const record = {
      objectID,
      title: frontmatter.title,
      section: frontmatter.title,
      text: excerpt,
      url: fields.slug,
      pathSegments: extrapolate(fields.slug, "/").map((x) => `/${x}/`),
    };

    return record;
  });

const indexPrefix = process.env.GATSBY_ALGOLIA_INDEX_PREFIX;
if (!indexPrefix) {
  throw new Error("`GATSBY_ALGOLIA_INDEX_PREFIX` must be configured!");
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => flatten(data.pages.edges),
    indexName: `${indexPrefix}docs`,
    settings: sentryAlgoliaIndexSettings,
    enablePartialUpdates: true,
    matchFields: ["text", "section", "title", "url"],
  },
];

module.exports = queries;
