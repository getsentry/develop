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
    const record = {
      objectID,
      title: frontmatter.title,
      text: excerpt,
      url: fields.slug,

      // https://github.com/getsentry/sentry-global-search#sorting-by-path
      pathSegments: extrapolate(fields.slug, "/").map((x) => `/${x}/`),
    };

    return record;
  });

const settings = {
  snippetEllipsisText: "…",
  highlightPreTag: "<mark>",
  highlightPostTag: "</mark>",
  attributesToSnippet: [`text:15`],
  distinct: 3,
  attributeForDistinct: "title",
  attributesToHighlight: ["title", "text"],
  attributesToRetrieve: ["text", "title", "url"],
  attributesForFaceting: ["filterOnly(pathSegments)"],
  searchableAttributes: ["title", "text"],
  disableTypoToleranceOnWords:
    sentryAlgoliaIndexSettings.disableTypoToleranceOnWords,
  advancedSyntax: true,
};

const indexPrefix = process.env.GATSBY_ALGOLIA_INDEX_PREFIX;
if (!indexPrefix) {
  throw new Error("`GATSBY_ALGOLIA_INDEX_PREFIX` must be configured!");
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => flatten(data.pages.edges),
    indexName: `${indexPrefix}docs`,
    settings,
  },
];

module.exports = queries;
