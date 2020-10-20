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
            frontmatter {
              title
              sidebar_order
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
      const child = node.childMdx;
      actions.createPage({
        path: child.fields.slug,
        component,
        context: {
          id: node.id,
          title: child.frontmatter.title,
          sidebar_order: child.frontmatter.sidebar_order,
          sidebar_title:
            child.frontmatter.sidebar_title || child.frontmatter.title,
        },
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
    title: String
    sidebar_order: Int
    sidebar_title: String
    keywords: [String]
    description: String
  }
`;

  createTypes(typeDefs);
};
