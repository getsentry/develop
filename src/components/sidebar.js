import React from "react";
import { Link } from "gatsby";

const Sidebar = () => (
  <ul className="list-unstyled" data-sidebar-tree>
    <li className="mb-3" data-sidebar-branch>
      <div
        className="sidebar-title d-flex align-items-center mb-0"
        data-sidebar-link
      >
        <h6>General</h6>
      </div>
      <ul className="list-unstyled" data-sidebar-tree>
        <li className="toc-item" data-sidebar-branch>
          <Link
            to="/"
            className="d-block"
            activeClassName="active"
            data-sidebar-link
          >
            Overview
          </Link>
        </li>
        <li className="toc-item" data-sidebar-branch>
          <Link
            to="/environment/"
            className="d-block"
            activeClassName="active"
            data-sidebar-link
          >
            Development Environment
          </Link>
        </li>
        <li className="toc-item" data-sidebar-branch>
          <Link
            to="/docs/"
            className="d-block"
            activeClassName="active"
            data-sidebar-link
          >
            Documentation Guide
          </Link>
        </li>
        <li className="toc-item" data-sidebar-branch>
          <Link
            to="/translations/"
            className="d-block"
            activeClassName="active"
            data-sidebar-link
          >
            Translations
          </Link>
        </li>
        <li className="toc-item" data-sidebar-branch>
          <Link
            to="/code-review/"
            className="d-block"
            activeClassName="active"
            data-sidebar-link
          >
            Code Review
          </Link>
        </li>
      </ul>
    </li>
    <li className="mb-3" data-sidebar-branch>
      <div
        className="sidebar-title d-flex align-items-center mb-0"
        data-sidebar-link
      >
        <h6>Understand</h6>
      </div>
      <ul className="list-unstyled" data-sidebar-tree>
        <li className="toc-item" data-sidebar-branch>
          <Link
            to="/python-dependencies/"
            className="d-block"
            activeClassName="active"
            data-sidebar-link
          >
            Python Dependencies
          </Link>
        </li>
        <li className="toc-item" data-sidebar-branch>
          <Link
            to="/database-migrations/"
            className="d-block"
            activeClassName="active"
            data-sidebar-link
          >
            Database Migrations
          </Link>
        </li>
        <li className="toc-item" data-sidebar-branch>
          <Link
            to="/serializers/"
            className="d-block"
            activeClassName="active"
            data-sidebar-link
          >
            Serializers
          </Link>
        </li>
        <li className="toc-item" data-sidebar-branch>
          <Link
            to="/issue-grouping/"
            className="d-block"
            activeClassName="active"
            data-sidebar-link
          >
            Issue Grouping
          </Link>
        </li>
      </ul>
    </li>
  </ul>
);

export default Sidebar;
