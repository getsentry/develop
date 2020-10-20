import { withPrefix } from "gatsby";
import React from "react";
import { useLocation } from "@reach/router";

import SmartLink from "./smartLink";

export default ({ to, title, children, collapsed = null, className = "" }) => {
  const location = useLocation();
  const isActive = location && location.pathname.indexOf(withPrefix(to)) === 0;

  className += " toc-item";
  if (isActive || collapsed === false) {
    className += " toc-visible";
  }

  return (
    <li className={className} data-sidebar-branch>
      <SmartLink to={to} className="d-block" data-sidebar-link>
        {title || children}
      </SmartLink>
      {title && children && (
        <ul className="list-unstyled" data-sidebar-tree>
          {children}
        </ul>
      )}
    </li>
  );
};
