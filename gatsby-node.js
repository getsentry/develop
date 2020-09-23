const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (
    node.internal.type === "Mdx" &&
    (!node.parent ||
      getNode(node.parent).internal.type !== "JsonSchemaMarkdown")
  ) {
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
      allFile {
        nodes {
          id
          childMdx {
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
  data.allFile.nodes.forEach(node => {
    if (node.childMdx && node.childMdx.fields) {
      actions.createPage({
        path: node.childMdx.fields.slug,
        component,
        context: { id: node.id },
      });
    }
  });
};

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  const typeDefs = `
  type Mdx implements Node {
    frontmatter: MdxFrontmatter
  }

  type MdxFrontmatter {
    keywords: [String]
  }
`;

  createTypes(typeDefs);
};
