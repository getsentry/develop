import React from "react";
import { Link } from "gatsby";

import ExternalLink from "./externalLink";

export default ({ to, href, children, ...props }) => {
  const realTo = to || href || "";
  if (realTo.indexOf("://") !== -1) {
    return (
      <ExternalLink href={realTo} {...props}>
        {children}
      </ExternalLink>
    );
  }
  return (
    <Link to={realTo} activeClassName="active" {...props}>
      {children}
    </Link>
  );
};
