import React from "react";
import { Link } from "gatsby";

const NavLink = ({ to, children }) => (
  <li className="toc-item" data-sidebar-branch>
    <Link
      to={to}
      className="d-block"
      activeClassName="active"
      data-sidebar-link
    >
      {children}
    </Link>
  </li>
);

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
        <NavLink to="/">Overview</NavLink>
        <NavLink to="/environment/">Development Environment</NavLink>
        <NavLink to="/docs/">Documentation Guide</NavLink>
        <NavLink to="/translations/">Translations</NavLink>
        <NavLink to="/code-review/">Code Review</NavLink>
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
        <NavLink to="/python-dependencies/">Python Dependencies</NavLink>
        <NavLink to="/database-migrations/">Database Migrations</NavLink>
        <NavLink to="/serializers/">Serializers</NavLink>
        <NavLink to="/issue-grouping/">Issue Grouping</NavLink>
        <NavLink to="/config/">Configuration</NavLink>
      </ul>
    </li>
    <li className="mb-3" data-sidebar-branch>
      <div
        className="sidebar-title d-flex align-items-center mb-0"
        data-sidebar-link
      >
        <h6>Services</h6>
      </div>

      <ul className="list-unstyled" data-sidebar-tree>
        <NavLink to="/services/devservices/">
          Service Manager (devservices)
        </NavLink>
        <NavLink to="/services/feature-flags/">Feature Flags</NavLink>
        <NavLink to="/services/queue/">Asynchronous Workers (celery)</NavLink>
        <NavLink to="/services/nodestore/">Node Storage</NavLink>
        <NavLink to="/services/filestore/">File Storage</NavLink>
        <NavLink to="/services/tsdb/">Time Series Storage (tsdb)</NavLink>
        <NavLink to="/services/buffers/">Write Buffers</NavLink>
        <NavLink to="/services/metrics/">Internal Metrics</NavLink>
        <NavLink to="/services/quotas/">Quotas & Rate Limiter</NavLink>
        <NavLink to="/services/inbound-mail/">Inbound Mail</NavLink>
        <NavLink to="/services/digests/">Notifcation Digests</NavLink>
      </ul>
    </li>
  </ul>
);

export default Sidebar;
