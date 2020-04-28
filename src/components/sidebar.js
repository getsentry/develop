import React from 'react';
import { Link } from 'gatsby';

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
          <Link
            to="/code-review/"
            className="d-block"
            activeClassName="active"
            data-sidebar-link
          >
            Code Review
          </Link>
          <Link
            to="/docs/"
            className="d-block"
            activeClassName="active"
            data-sidebar-link
          >
            Documentation Guide
          </Link>
          <Link
            to="/translations/"
            className="d-block"
            activeClassName="active"
            data-sidebar-link
          >
            Translations
          </Link>
        </li>
      </ul>
    </li>
    <li className="mb-3" data-sidebar-branch>
      <div
        className="sidebar-title d-flex align-items-center mb-0"
        data-sidebar-link
      >
        <h6>Server</h6>
      </div>
      <ul className="list-unstyled" data-sidebar-tree>
        <li className="toc-item" data-sidebar-branch>
          <Link
            to="/environment/"
            className="d-block"
            activeClassName="active"
            data-sidebar-link
          >
            Development Environment
          </Link>
          <Link
            to="/python-dependencies/"
            className="d-block"
            activeClassName="active"
            data-sidebar-link
          >
            Python Dependencies
          </Link>
          <Link
            to="/database-migrations/"
            className="d-block"
            activeClassName="active"
            data-sidebar-link
          >
            Database Migrations
          </Link>
          <Link
            to="/serializers/"
            className="d-block"
            activeClassName="active"
            data-sidebar-link
          >
            Serializers
          </Link>
        </li>
      </ul>
    </li>
  </ul>
);

export default Sidebar;
