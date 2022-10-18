import { createFilePath } from "gatsby-source-filesystem";

export default ({ node, actions, getNode }) => {
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
