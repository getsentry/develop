import * as Sentry from "@sentry/node";
import { createFilePath } from "gatsby-source-filesystem";

export default ({ node, actions, getNode }) => {
  const transaction = Sentry.getCurrentHub()
    .getScope()
    .getTransaction();
  const span = transaction.startChild({
    op: "function",
    description: `onCreateNode ${node.internal.type}`,
    tags: {
      nodeType: node.internal.type,
    },
  });

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
  span.finish();
};
