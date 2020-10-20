import { withPrefix } from "gatsby";
import React from "react";
import { useLocation } from "@reach/router";

import SmartLink from "./smartLink";

const NavLink = ({ to, title, children, ...props }) => {
  const location = useLocation();

  let className = "toc-item";
  if (location && location.pathname.indexOf(withPrefix(to)) === 0) {
    className += " toc-active";
  }
  className += props.className ? " " + props.className : "";

  return (
    <li className={className} data-sidebar-branch>
      <SmartLink to={to} className="d-block" data-sidebar-link>
        {title || children}
      </SmartLink>
      {title && (
        <ul className="list-unstyled" data-sidebar-tree>
          {children}
        </ul>
      )}
    </li>
  );
};

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
        <NavLink to="/docs/" title="Documentation Guide">
          <NavLink to="/docs/api/">Making an API Public</NavLink>
        </NavLink>
        <NavLink to="/inclusion/">Inclusive Language</NavLink>
        <NavLink to="/translations/">Translations</NavLink>
        <NavLink to="/code-review/">Code Review</NavLink>
      </ul>
    </li>
    <li className="mb-3" data-sidebar-branch>
      <div
        className="sidebar-title d-flex align-items-center mb-0"
        data-sidebar-link
      >
        <h6>Development</h6>
      </div>
      <ul className="list-unstyled" data-sidebar-tree>
        <NavLink to="/environment/">Environment</NavLink>
        <NavLink to="/environment/pycharm/">Configuring PyCharm</NavLink>
        <NavLink to="/workflow/">Workflow</NavLink>
        <NavLink to="/continuous-integration/">Continuous Integration</NavLink>
        <NavLink to="/python-dependencies/">Python Dependencies</NavLink>
        <NavLink to="/database-migrations/">Database Migrations</NavLink>
        <NavLink to="/testing/">Testing Tips</NavLink>
      </ul>
    </li>
    <li className="mb-3" data-sidebar-branch>
      <div
        className="sidebar-title d-flex align-items-center mb-0"
        data-sidebar-link
      >
        <h6>Application</h6>
      </div>
      <ul className="list-unstyled" data-sidebar-tree>
        <NavLink to="/architecture/">Architecture</NavLink>
        <NavLink to="/sentry-vs-getsentry/">sentry vs getsentry</NavLink>
        <NavLink to="/config/">Configuration</NavLink>
        <NavLink to="/feature-flags/">Feature Flags</NavLink>
        <NavLink to="/serializers/">Serializers</NavLink>
        <NavLink to="/pii/" title="PII and Data Scrubbing">
          <NavLink to="/pii/types/">Rule Types</NavLink>
          <NavLink to="/pii/methods/">Redaction Methods</NavLink>
          <NavLink to="/pii/selectors/">Selectors</NavLink>
        </NavLink>
      </ul>
    </li>
    <li className="mb-3" data-sidebar-branch>
      <div
        className="sidebar-title d-flex align-items-center mb-0"
        data-sidebar-link
      >
        <h6>Self-Hosted</h6>
      </div>
      <ul className="list-unstyled" data-sidebar-tree>
        <NavLink to="/self-hosted/">Overview</NavLink>
        <NavLink to="/self-hosted/sso/">Single Sign-On (SSO)</NavLink>
        <NavLink to="/self-hosted/releases/">Versioning & Releases</NavLink>
        <NavLink to="/self-hosted/email/">Email</NavLink>
        <NavLink to="/self-hosted/support/">Support</NavLink>
      </ul>
    </li>
    <li className="mb-3" data-frontend-branch>
      <div
        className="sidebar-title d-flex align-items-center mb-0"
        data-sidebar-link
      >
        <h6>Frontend</h6>
      </div>

      <ul className="list-unstyled" data-frontend-tree>
        <NavLink to="/frontend/">Frontend Handbook</NavLink>
        <NavLink to="/frontend/storybook/">Storybook Styleguide</NavLink>
        <NavLink to="/frontend/defaultprops/">Typing DefaultProps</NavLink>
        <NavLink to="/frontend/migration-gridemotion/">
          Migration - grid-emotion
        </NavLink>
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
        <NavLink to="/services/ports/">Assigned ports</NavLink>
        <NavLink to="/services/queue/">Asynchronous Workers (celery)</NavLink>
        <NavLink to="/services/email/">Email</NavLink>
        <NavLink to="/services/nodestore/">Node Storage</NavLink>
        <NavLink to="/services/filestore/">File Storage</NavLink>
        <NavLink to="/services/tsdb/">Time Series Storage (tsdb)</NavLink>
        <NavLink to="/services/buffers/">Write Buffers</NavLink>
        <NavLink to="/services/metrics/">Internal Metrics</NavLink>
        <NavLink to="/services/quotas/">Quotas & Rate Limiter</NavLink>
        <NavLink to="/services/digests/">Notification Digests</NavLink>
        <NavLink to="https://getsentry.github.io/relay/">Relay</NavLink>
        <NavLink to="https://github.com/getsentry/snuba">Snuba</NavLink>
      </ul>
    </li>

    <li className="mb-3" data-sidebar-branch>
      <div
        className="sidebar-title d-flex align-items-center mb-0"
        data-sidebar-link
      >
        <h6>SDK Development</h6>
      </div>

      <ul className="list-unstyled" data-sidebar-tree>
        <NavLink to="/sdk/philosophy/">Philosophy</NavLink>
        <NavLink to="/sdk/overview/">Overview</NavLink>
        <NavLink to="/sdk/unified-api/" title="Unified API">
          <NavLink to="/sdk/unified-api/tracing">
            Guidelines for Tracing Support
          </NavLink>
        </NavLink>
        <NavLink to="/sdk/features/">Expected Features</NavLink>
        <NavLink to="/sdk/data-handling/">Data Handling</NavLink>
        <NavLink to="/sdk/store/">Store Endpoint</NavLink>
        <NavLink to="/sdk/envelopes/">Envelopes</NavLink>
        <NavLink to="/sdk/event-payloads/" title="Event Payloads">
          <NavLink to="/sdk/event-payloads/transaction/">
            Transaction Type
          </NavLink>
          <NavLink to="/sdk/event-payloads/span/">Span Interface</NavLink>
          <NavLink to="/sdk/event-payloads/breadcrumbs/">
            Breadcrumbs Interface
          </NavLink>
          <NavLink to="/sdk/event-payloads/contexts/">
            Contexts Interface
          </NavLink>
          <NavLink to="/sdk/event-payloads/debugmeta">
            Debug Meta Interface
          </NavLink>
          <NavLink to="/sdk/event-payloads/exception/">
            Exception Interface
          </NavLink>
          <NavLink to="/sdk/event-payloads/message/">Message Interface</NavLink>
          <NavLink to="/sdk/event-payloads/request/">Request Interface</NavLink>
          <NavLink to="/sdk/event-payloads/sdk/">SDK Interface</NavLink>
          <NavLink to="/sdk/event-payloads/stacktrace/">
            Stack Trace Interface
          </NavLink>
          <NavLink to="/sdk/event-payloads/template/">
            Template Interface
          </NavLink>
          <NavLink to="/sdk/event-payloads/threads/">Threads Interface</NavLink>
          <NavLink to="/sdk/event-payloads/user/">User Interface</NavLink>
        </NavLink>
        <NavLink to="/sdk/sessions/">Sessions</NavLink>
      </ul>
    </li>
    <li className="mb-3" data-sidebar-branch>
      <div
        className="sidebar-title d-flex align-items-center mb-0"
        data-sidebar-link
      >
        <h6>Integrations</h6>
      </div>

      <ul className="list-unstyled" data-sidebar-tree>
        <NavLink to="/integrations/">Overview</NavLink>
        <NavLink to="/integrations/github/">GitHub</NavLink>
        <NavLink to="/integrations/slack/">Slack</NavLink>
        <NavLink to="/integrations/vercel/">Vercel</NavLink>
        <NavLink to="/integrations/msteams/">Microsoft Teams</NavLink>
        <NavLink to="/integrations/gitlab/">GitLab</NavLink>
      </ul>
    </li>
    <li className="mb-3" data-sidebar-branch>
      <div
        className="sidebar-title d-flex align-items-center mb-0"
        data-sidebar-link
      >
        <h6>Resources</h6>
      </div>

      <ul className="list-unstyled" data-sidebar-tree>
        <NavLink to="https://docs.sentry.io">User Documentation</NavLink>
        <NavLink to="https://forum.sentry.io">Community Forum</NavLink>
      </ul>
    </li>
    <li className="mb-3" data-sidebar-branch>
      <div
        className="sidebar-title d-flex align-items-center mb-0"
        data-sidebar-link
      >
        <h6>Meta Documentation</h6>
      </div>

      <ul className="list-unstyled" data-sidebar-tree>
        <NavLink to="/docs-components/">Documentation Components</NavLink>
      </ul>
    </li>
  </ul>
);

export default Sidebar;
