import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";

import "prismjs/themes/prism-tomorrow.css";

import Alert from "./alert";
import Break from "./break";
import SmartLink from "./smartLink";
import CodeBlock from "./codeBlock";
import CodeTabs from "./codeTabs";
import Note from "./note";
import PageGrid from "./pageGrid";
import DefinitionList from "./definitionList";

const mdxComponents = {
  Alert,
  a: SmartLink,
  Break,
  CodeBlock,
  CodeTabs,
  Link: SmartLink,
  Note,
  PageGrid,
  DefinitionList,
};

export default ({ value }) => {
  return (
    <MDXProvider components={mdxComponents}>
      <MDXRenderer>{value}</MDXRenderer>
    </MDXProvider>
  );
};
