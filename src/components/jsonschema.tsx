import React from 'react';
import {MDXProvider} from '@mdx-js/react';
import {MDXRenderer} from 'gatsby-plugin-mdx';
import {graphql, useStaticQuery} from 'gatsby';

const JsonSchema = ({id}) => {
  // XXX(markus): No clue if this can be replaced by non-static query
  //
  // This contrived query takes extra care in not referencing allJsonSchema or
  // allJsonSchemaMarkdown, as those nodes are not usable if they have not been
  // constructed once. That is the case if the data-schema submodule has not
  // been checked out in which case we can still show a dummy text instead of
  // failing the build.
  const query = useStaticQuery(graphql`
    {
      allMdx(filter: {parent: {internal: {type: {eq: "JsonSchemaMarkdown"}}}}) {
        nodes {
          body
          parent {
            parent {
              id
            }
          }
        }
      }
    }
  `);

  const mdxNode = query.allMdx.nodes.find(node => node.parent.parent.id === id);

  if (!mdxNode) {
    return 'Failed to load JSON Schema. Either the ID you have passed into the component does not exist or you are missing some git submmodules.';
  }

  return (
    <MDXProvider>
      <MDXRenderer>{mdxNode.body}</MDXRenderer>
    </MDXProvider>
  );
};

export default JsonSchema;
