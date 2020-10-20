import { withPrefix } from "gatsby";
import React from "react";
import { useLocation } from "@reach/router";

import SmartLink from "./smartLink";
import SidebarLink from "./sidebarLink";

export const sortPages = (arr, extractor = a => a) => {
  return arr.sort((a, b) => {
    a = extractor(a);
    b = extractor(b);
    const aso = a.context.sidebar_order >= 0 ? a.context.sidebar_order : 10;
    const bso = b.context.sidebar_order >= 0 ? b.context.sidebar_order : 10;
    if (aso > bso) return 1;
    else if (bso > aso) return -1;
    return (a.context.sidebar_title || a.context.title).localeCompare(
      b.context.sidebar_title || b.context.title
    );
  });
};

export const toTree = nodeList => {
  const result = [];
  const level = { result };

  nodeList
    .sort((a, b) => a.path.localeCompare(b.path))
    .forEach(node => {
      let curPath = "";
      node.path.split("/").reduce((r, name, i, a) => {
        curPath += `${name}/`;
        if (!r[name]) {
          r[name] = { result: [] };
          r.result.push({
            name,
            children: r[name].result,
            node: curPath === node.path ? node : null,
          });
        }

        return r[name];
      }, level);
    });

  return result[0].children;
};

export const renderChildren = (children, exclude, showDepth = 0, depth = 0) => {
  return sortPages(
    children.filter(
      ({ name, node }) =>
        node &&
        !!node.context.title &&
        name !== "" &&
        exclude.indexOf(node.path) === -1
    ),
    ({ node }) => node
  ).map(({ node, children }) => {
    return (
      <SidebarLink
        to={node.path}
        key={node.path}
        title={node.context.sidebar_title || node.context.title}
        collapsed={depth >= showDepth}
      >
        {renderChildren(children, exclude, showDepth, depth + 1)}
      </SidebarLink>
    );
  });
};

export const Children = ({ tree, exclude = [], showDepth = 0 }) => {
  return (
    <React.Fragment>{renderChildren(tree, exclude, showDepth)}</React.Fragment>
  );
};

export default ({
  root,
  title,
  tree,
  collapse = false,
  exclude = [],
  showDepth = 0,
  prependLinks = [],
  suppressMissing = false,
  noHeadingLink = false,
}) => {
  if (root.indexOf("/") === 0) root = root.substr(1);

  let entity;
  let currentTree = tree;
  const rootBits = root.split("/");
  rootBits.forEach(bit => {
    entity = currentTree.find(n => n.name === bit);
    if (!entity) {
      if (!suppressMissing)
        console.warn(
          `Could not find entity at ${root} (specifically at ${bit})`
        );
      return;
    }
    currentTree = entity.children;
  });
  if (!entity) return null;
  if (!title && entity.node)
    title = entity.node.context.sidebar_title || entity.node.context.title;
  const parentNode = entity.children
    ? entity.children.find(n => n.name === "")
    : null;

  const location = useLocation();
  const isActive =
    location && location.pathname.indexOf(withPrefix(`/${root}/`)) === 0;

  const headerClassName = "sidebar-title d-flex align-items-center mb-0";
  const header =
    parentNode && !noHeadingLink ? (
      <SmartLink
        to={`/${root}/`}
        className={headerClassName}
        activeClassName=""
        data-sidebar-link
      >
        <h6>{title}</h6>
      </SmartLink>
    ) : (
      <div className={headerClassName} data-sidebar-link>
        <h6>{title}</h6>
      </div>
    );

  return (
    <li className="mb-3" data-sidebar-branch>
      {header}
      {(!collapse || isActive) && entity.children && (
        <ul className="list-unstyled" data-sidebar-tree>
          {prependLinks &&
            prependLinks.map(link => (
              <SidebarLink to={link[0]} key={link[0]}>
                {link[1]}
              </SidebarLink>
            ))}
          <Children
            tree={entity.children}
            exclude={exclude}
            showDepth={showDepth}
          />
        </ul>
      )}
    </li>
  );
};
