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
  arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    ...rest,
  }));

const settings = { attributesToSnippet: [`excerpt:20`] };

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
