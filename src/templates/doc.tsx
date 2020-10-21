import React from "react";
import { graphql } from "gatsby";

import BasePage from "~src/components/basePage";
import Content from "~src/components/content";
import Sidebar from "~src/components/sidebar";

export default (props: any) => {
  return (
    <BasePage sidebar={<Sidebar />} {...props}>
      <Content file={props.data.file} />
    </BasePage>
  );
};

export const pageQuery = graphql`
  query DocQuery($id: String) {
    file(id: { eq: $id }) {
      id
      relativePath
      sourceInstanceName
      childMdx {
        body
        internal {
          type
        }
      }
    }
  }
`;
