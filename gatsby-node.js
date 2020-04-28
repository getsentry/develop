const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: "slug",
      node,
      value,
    });
  }
};

exports.createPages = async function({ actions, graphql }) {
  const { data, errors } = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  if (errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }
  const component = require.resolve(`./src/components/layout.js`);
  data.allMdx.edges.forEach(({ node }) => {
    actions.createPage({
      path: node.fields.slug,
      component,
      context: { id: node.id },
    });
  });
};
