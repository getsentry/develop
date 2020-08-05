import React from "react"
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { graphql, useStaticQuery } from "gatsby"

const JsonSchema = ({id}) => {
  // XXX(markus): No clue if this can be replaced by non-static query
  const query = useStaticQuery(graphql`
    {
      allJsonSchema {
        nodes {
          id
          childJsonSchemaMarkdown {
            parent {
              id
            }
            childMdx {
              body
            }
          }
        }
      }
    }
  `);

  const jsonSchemaNode = query.allJsonSchema.nodes.find(node => node.id === id);

  if (!jsonSchemaNode) {
    return "Failed to load JSON Schema. Either the ID you have passed into the component does not exist or you are missing some git submmodules.";
  }

  return (
    <MDXProvider>
      <MDXRenderer>{jsonSchemaNode.childJsonSchemaMarkdown.childMdx.body}</MDXRenderer>
    </MDXProvider>
  );
}

export default JsonSchema;
