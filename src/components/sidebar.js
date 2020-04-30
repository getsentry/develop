import React from "react";
import { Link } from "gatsby";

const NavLink = ({ to, children }) => (
  <li className="toc-item" data-sidebar-branch>
    {to.indexOf("://") !== -1 ? (
      <a href={to} className="d-block" data-sidebar-link>
        {children}

        <span className="icon icon-external-link">
          <svg viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
            />
          </svg>
        </span>
      </a>
    ) : (
      <Link
        to={to}
        className="d-block"
        activeClassName="active"
        data-sidebar-link
      >
        {children}
      </Link>
    )}
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
        <NavLink to="https://github.com/getsentry/.github/blob/master/CODE_OF_CONDUCT.md">
          Code of Conduct
        </NavLink>
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
        <NavLink to="/sentry-vs-getsentry/">sentry vs getsentry</NavLink>
        <NavLink to="/config/">Configuration</NavLink>
        <NavLink to="/feature-flags/">Feature Flags</NavLink>
        <NavLink to="/python-dependencies/">Python Dependencies</NavLink>
        <NavLink to="/database-migrations/">Database Migrations</NavLink>
        <NavLink to="/serializers/">Serializers</NavLink>
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
        <NavLink to="/services/queue/">Asynchronous Workers (celery)</NavLink>
        <NavLink to="/services/email/">Email</NavLink>
        <NavLink to="/services/nodestore/">Node Storage</NavLink>
        <NavLink to="/services/filestore/">File Storage</NavLink>
        <NavLink to="/services/tsdb/">Time Series Storage (tsdb)</NavLink>
        <NavLink to="/services/buffers/">Write Buffers</NavLink>
        <NavLink to="/services/metrics/">Internal Metrics</NavLink>
        <NavLink to="/services/quotas/">Quotas & Rate Limiter</NavLink>
        <NavLink to="/services/digests/">Notifcation Digests</NavLink>
        <NavLink to="https://getsentry.github.io/relay/">Relay</NavLink>
      </ul>
    </li>
  </ul>
);

export default Sidebar;
