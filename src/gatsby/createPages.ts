export default async function({ actions, graphql, reporter }) {
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
              draft
              noindex
              keywords
              title
              sidebar_order
              sidebar_title
            }
            excerpt(pruneLength: 5000)
          }
        }
      }
    }
  `);

  if (errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }
  const component = require.resolve(`../templates/doc.tsx`);
  data.allFile.nodes.forEach(node => {
    if (node.childMdx && node.childMdx.fields) {
      const child = node.childMdx;
      actions.createPage({
        path: child.fields.slug,
        component,
        context: {
          excerpt: child.excerpt,
          ...child.frontmatter,
          id: node.id,
        },
      });
    }
  });
}
