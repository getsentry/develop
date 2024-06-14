import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';

import {Children, toTree} from './dynamicNav';
import SidebarLink from './sidebarLink';

const navQuery = graphql`
  query NavQuery {
    allSitePage {
      nodes {
        path
        context {
          title
          sidebar_order
          sidebar_title
        }
      }
    }
  }
`;

export default () => {
  const data = useStaticQuery(navQuery);
  const tree = toTree(data.allSitePage.nodes.filter(n => !!n.context));

  return (
    <ul className="list-unstyled" data-sidebar-tree>
      <li className="mb-3" data-sidebar-branch>
        <div className="sidebar-title d-flex align-items-center mb-0" data-sidebar-link>
          <h6>General</h6>
        </div>
        <ul className="list-unstyled" data-sidebar-tree>
          <SidebarLink to="/">Overview</SidebarLink>
          <SidebarLink to="https://github.com/getsentry/.github/blob/master/CODE_OF_CONDUCT.md">
            Code of Conduct
          </SidebarLink>
          <SidebarLink to="/docs/">Documentation Guide</SidebarLink>
          <SidebarLink to="/inclusion/">Inclusive Language</SidebarLink>
          <SidebarLink to="/translations/">Translations</SidebarLink>
        </ul>
      </li>
      <li className="mb-3" data-sidebar-branch>
        <div className="sidebar-title d-flex align-items-center mb-0" data-sidebar-link>
          <h6>Development</h6>
        </div>
        <ul className="list-unstyled" data-sidebar-tree>
          <SidebarLink to="/environment/" title="Environment">
            <Children tree={tree.find(n => n.name === 'environment').children} />
          </SidebarLink>
          <SidebarLink to="/philosophy/">Philosophy</SidebarLink>
          <SidebarLink to="/commit-messages/">Commit Messages</SidebarLink>
          <SidebarLink to="/code-review/">Code Review</SidebarLink>
          <SidebarLink to="/frontend/pull-request-previews/">
            Pull Request Previews
          </SidebarLink>
          <SidebarLink to="/workflow/">Workflow</SidebarLink>
          <SidebarLink to="/continuous-integration/">Continuous Integration</SidebarLink>
          <SidebarLink to="/python-dependencies/">Python Dependencies</SidebarLink>
          <SidebarLink to="/database-migrations/">Database Migrations</SidebarLink>
          <SidebarLink to="/testing/">Testing Tips</SidebarLink>
          <SidebarLink to="/analytics/">Analytics</SidebarLink>
          <SidebarLink to="/rust/">Rust Development</SidebarLink>
        </ul>
      </li>
      <li className="mb-3" data-sidebar-branch>
        <div className="sidebar-title d-flex align-items-center mb-0" data-sidebar-link>
          <h6>Application</h6>
        </div>
        <ul className="list-unstyled" data-sidebar-tree>
          <SidebarLink to="/architecture/">Architecture</SidebarLink>
          <SidebarLink to="/sentry-vs-getsentry/">sentry vs getsentry</SidebarLink>
          <SidebarLink to="/config/">Configuration</SidebarLink>
          <SidebarLink to="/issue-platform/">Issue Platform</SidebarLink>
          <SidebarLink to="/issue-platform-detectors/">
            Issue Platform - Writing Detectors
          </SidebarLink>
          <SidebarLink to="/feature-flags/">Feature Flags</SidebarLink>
          <SidebarLink to="/feature-flags/flagpole/">Flagpole</SidebarLink>
          <SidebarLink to="/ab-testing/">A/B Testing</SidebarLink>
          <SidebarLink to="/options/">Options</SidebarLink>
          <SidebarLink to="/serializers/">Serializers</SidebarLink>
          <SidebarLink to="/grouping/">Grouping</SidebarLink>
          <SidebarLink to="/api/" title="API">
            <Children tree={tree.find(n => n.name === 'api').children} />
          </SidebarLink>
          <SidebarLink to="/pii/" title="PII and Data Scrubbing">
            <SidebarLink to="/pii/types/">Rule Types</SidebarLink>
            <SidebarLink to="/pii/methods/">Redaction Methods</SidebarLink>
            <SidebarLink to="/pii/selectors/">Selectors</SidebarLink>
          </SidebarLink>
          <SidebarLink to="/transaction-clustering/">
            Clustering URL Transactions
          </SidebarLink>
          <SidebarLink to="/dynamic-sampling/" title="Dynamic Sampling">
            <Children tree={tree.find(n => n.name === 'dynamic-sampling').children} />
          </SidebarLink>
          <SidebarLink
            to="/delightful-developer-metrics/"
            title="Sentry Developer Metrics"
          >
            <Children
              tree={tree.find(n => n.name === 'delightful-developer-metrics').children}
            />
          </SidebarLink>
        </ul>
      </li>
      <li className="mb-3" data-sidebar-branch>
        <div className="sidebar-title d-flex align-items-center mb-0" data-sidebar-link>
          <h6>Self-Hosted</h6>
        </div>
        <ul className="list-unstyled" data-sidebar-tree>
          <SidebarLink to="/self-hosted/">Overview</SidebarLink>
          <SidebarLink to="/self-hosted/releases/">Releases & Upgrading</SidebarLink>
          <SidebarLink to="/self-hosted/backup/">Backup & Restore</SidebarLink>
          <SidebarLink to="/self-hosted/custom-ca-roots/">Custom CA Roots</SidebarLink>
          <SidebarLink to="/self-hosted/email/">Email</SidebarLink>
          <SidebarLink to="/self-hosted/geolocation/">Geolocation</SidebarLink>
          <SidebarLink to="/self-hosted/sso/">Single Sign-On (SSO)</SidebarLink>
          <SidebarLink to="/self-hosted/csp/">Content Security Policy (CSP)</SidebarLink>
          <SidebarLink to="/self-hosted/reverse-proxy">Reverse Proxy</SidebarLink>
          <SidebarLink to="/self-hosted/troubleshooting/">Troubleshooting</SidebarLink>
          <SidebarLink to="/self-hosted/support/">Support</SidebarLink>
        </ul>
      </li>
      <li className="mb-3" data-frontend-branch>
        <div className="sidebar-title d-flex align-items-center mb-0" data-sidebar-link>
          <h6>Frontend</h6>
        </div>

        <ul className="list-unstyled" data-frontend-tree>
          <SidebarLink to="/frontend/">Frontend Handbook</SidebarLink>
          <SidebarLink to="/frontend/upgrade-policies/">
            Dependency Upgrade Policies
          </SidebarLink>
          <SidebarLink to="/frontend/development-server/">Development Server</SidebarLink>
          <SidebarLink to="/frontend/component-library/">Component Library</SidebarLink>
          <SidebarLink to="/frontend/design-tenets/">Design Tenets</SidebarLink>
          <SidebarLink to="/frontend/network-requests/">Network Requests</SidebarLink>
          <SidebarLink to="/frontend/using-styled-components/">Using Styled Components</SidebarLink>
          <SidebarLink to="/frontend/using-hooks/">Using hooks</SidebarLink>
          <SidebarLink to="/frontend/using-rtl/">Using React Testing Library</SidebarLink>
          <SidebarLink to="/frontend/working-on-getting-started-docs/">
            Working on Getting Started Docs
          </SidebarLink>
        </ul>
      </li>

      <li className="mb-3" data-frontend-branch>
        <div className="sidebar-title d-flex align-items-center mb-0" data-sidebar-link>
          <h6>Backend</h6>
        </div>

        <ul className="list-unstyled" data-frontend-tree>
          <SidebarLink to="/backend/development-server/">Development Server</SidebarLink>
          <SidebarLink to="/backend/control-silo/">Control Silo</SidebarLink>
          <SidebarLink to="/backend/cross-region-rpc/">Cross Region RPC</SidebarLink>
          <SidebarLink to="/backend/outboxes/">Outboxes</SidebarLink>
          <SidebarLink to="/backend/cross-region-replication/">Cross Region Replication</SidebarLink>
        </ul>
      </li>

      <li className="mb-3" data-sidebar-branch>
        <div className="sidebar-title d-flex align-items-center mb-0" data-sidebar-link>
          <h6>Services</h6>
        </div>

        <ul className="list-unstyled" data-sidebar-tree>
          <SidebarLink to="/services/devservices/">
            Service Manager (devservices)
          </SidebarLink>
          <SidebarLink to="/services/ports/">Assigned ports</SidebarLink>
          <SidebarLink to="/services/queue/">Asynchronous Workers (celery)</SidebarLink>
          <SidebarLink to="/services/email/">Email</SidebarLink>
          <SidebarLink to="/services/nodestore/">Node Storage</SidebarLink>
          <SidebarLink to="/services/filestore/">File Storage</SidebarLink>
          <SidebarLink to="/services/tsdb/">Time Series Storage (tsdb)</SidebarLink>
          <SidebarLink to="/services/buffers/">Write Buffers</SidebarLink>
          <SidebarLink to="/services/metrics/">Internal Metrics</SidebarLink>
          <SidebarLink to="/services/quotas/">Quotas & Rate Limiter</SidebarLink>
          <SidebarLink to="/services/digests/">Notification Digests</SidebarLink>
          <SidebarLink to="/services/relay/">Relay</SidebarLink>
          <SidebarLink to="https://github.com/getsentry/snuba">Snuba</SidebarLink>
          <SidebarLink to="/services/chartcuterie/">
            Chart Rendering (Chartcuterie)
          </SidebarLink>
        </ul>
      </li>

      <li className="mb-3" data-sidebar-branch>
        <div className="sidebar-title d-flex align-items-center mb-0" data-sidebar-link>
          <h6>SDK Development</h6>
        </div>

        <ul className="list-unstyled" data-sidebar-tree>
          <SidebarLink to="/sdk/">Overview</SidebarLink>
          <SidebarLink to="/sdk/features/">Expected Features</SidebarLink>

          <SidebarLink to="/sdk/fundamentals/" title="Fundamentals">
            <SidebarLink to="/sdk/fundamentals/philosophy/">Philosophy</SidebarLink>
            <SidebarLink to="/sdk/fundamentals/unified-api/">Unified API</SidebarLink>
            <SidebarLink to="/sdk/fundamentals/data-handling/" title="Data Handling">
              <SidebarLink to="/sdk/fundamentals/data-handling/context-management/" title="Context Management">
                <SidebarLink to="/sdk/fundamentals/data-handling/context-management/hub_and_scope_refactoring/">Hub & Scope Refactoring</SidebarLink>
              </SidebarLink>
            </SidebarLink>
            <SidebarLink to="/sdk/fundamentals/reliability/" title="Reliability">
              <SidebarLink to="/sdk/fundamentals/reliability/resiliency/" title="Resiliency">
                <SidebarLink to="/sdk/fundamentals/reliability/resiliency/signal-handlers/">Signal Handlers</SidebarLink>
              </SidebarLink>
            </SidebarLink>
          </SidebarLink>


          <SidebarLink to="/sdk/telemetry/" title="Telemetry">
            <SidebarLink to="/sdk/telemetry/tracing/" title="Tracing">
              <SidebarLink to="/sdk/telemetry/tracing/trace-propagation/">Trace Propagation</SidebarLink>
              <SidebarLink to="/sdk/telemetry/tracing/span-operations/">Span Operations</SidebarLink>
              <SidebarLink to="/sdk/telemetry/tracing/span-data-conventions/">Span Data Conventions</SidebarLink>
              <SidebarLink to="/sdk/telemetry/tracing/trace-origin/">Trace Origin</SidebarLink>
              <SidebarLink to="/sdk/telemetry/tracing/ui-event-transactions/">UI Event Transactions</SidebarLink>
              <SidebarLink to="/sdk/telemetry/tracing/time-to-initial-full-display/">
                Time to Initial/Full Display
              </SidebarLink>
              <SidebarLink to="/sdk/telemetry/tracing/frames-delay/">Frames Delay</SidebarLink>
              <SidebarLink to="/sdk/telemetry/tracing/dynamic-sampling-context/">Dynamic Sampling Context</SidebarLink>
              <SidebarLink to="/sdk/telemetry/tracing/opentelemetry/">OpenTelemetry Support</SidebarLink>
              <SidebarLink to="/sdk/telemetry/tracing/modules/">Modules</SidebarLink>
              <SidebarLink to="/sdk/telemetry/tracing/backpressure/">Backpressure Management</SidebarLink>
              <SidebarLink to="/sdk/telemetry/tracing/research-performance-api/">Research: Performance Monitoring API</SidebarLink>
            </SidebarLink>
            <SidebarLink to="/sdk/telemetry/profiles/">Profiles</SidebarLink>
            <SidebarLink to="/sdk/telemetry/metrics/">Metrics</SidebarLink>
            <SidebarLink to="/sdk/telemetry/check-ins/">Check-Ins</SidebarLink>
          </SidebarLink>

          <SidebarLink to="/sdk/protocol/" title="Protocol">
            <SidebarLink to="/sdk/protocol/envelopes/">Envelopes</SidebarLink>
            <SidebarLink to="/sdk/protocol/event-payloads/" title="Event Payloads">
              <SidebarLink to="/sdk/protocol/event-payloads/transaction/">Transaction Type</SidebarLink>
              <SidebarLink to="/sdk/protocol/event-payloads/span/">Span Interface</SidebarLink>
              <SidebarLink to="/sdk/protocol/event-payloads/breadcrumbs/">Breadcrumbs Interface</SidebarLink>
              <SidebarLink to="/sdk/protocol/event-payloads/contexts/">Contexts Interface</SidebarLink>
              <SidebarLink to="/sdk/protocol/event-payloads/debugmeta">Debug Meta Interface</SidebarLink>
              <SidebarLink to="/sdk/protocol/event-payloads/exception/">Exception Interface</SidebarLink>
              <SidebarLink to="/sdk/protocol/event-payloads/message/">Message Interface</SidebarLink>
              <SidebarLink to="/sdk/protocol/event-payloads/request/">Request Interface</SidebarLink>
              <SidebarLink to="/sdk/protocol/event-payloads/sdk/">SDK Interface</SidebarLink>
              <SidebarLink to="/sdk/protocol/event-payloads/stacktrace/">Stack Trace Interface</SidebarLink>
              <SidebarLink to="/sdk/protocol/event-payloads/template/">Template Interface</SidebarLink>
              <SidebarLink to="/sdk/protocol/event-payloads/threads/">Threads Interface</SidebarLink>
              <SidebarLink to="/sdk/protocol/event-payloads/user/">User Interface</SidebarLink>
            </SidebarLink>
            <SidebarLink to="/sdk/protocol/client-reports/">Client Reports</SidebarLink>
            <SidebarLink to="/sdk/protocol/sessions/">Sessions</SidebarLink>
          </SidebarLink>

          <SidebarLink to="/sdk/endpoints/" title="Endpoints">
            <SidebarLink to="/sdk/endpoints/rate-limiting/">Rate Limiting</SidebarLink>
            <SidebarLink to="/sdk/endpoints/envelope/">Envelope Endpoint</SidebarLink>
            <SidebarLink to="/sdk/endpoints/store/">Store Endpoint</SidebarLink>
          </SidebarLink>

          <SidebarLink to="/sdk/tooling/" title="Tooling">
            <SidebarLink to="/sdk/tooling/setup-wizards/">Setup Wizards</SidebarLink>
            <SidebarLink to="/sdk/tooling/spotlight/">Spotlight</SidebarLink>
          </SidebarLink>

          <SidebarLink to="/sdk/processes/" title="Processes">
            <SidebarLink to="/sdk/processes/onboarding/">Onboarding</SidebarLink>
            <SidebarLink to="/sdk/processes/development/" title="Development">
              <SidebarLink to="/sdk/processes/development/overview/">Overview</SidebarLink>
              <SidebarLink to="/sdk/processes/development/serverless/" title="Serverless SDKs">
                <SidebarLink to="/sdk/processes/development/serverless/aws-lambda/">AWS Lambda</SidebarLink>
              </SidebarLink>
            </SidebarLink>
            <SidebarLink to="/sdk/processes/testing/">Testing</SidebarLink>
            <SidebarLink to="/sdk/processes/releasing/">Releasing</SidebarLink>
          </SidebarLink>
        </ul>
      </li>
      <li className="mb-3" data-sidebar-branch>
        <div className="sidebar-title d-flex align-items-center mb-0" data-sidebar-link>
          <h6>Integrations</h6>
        </div>

        <ul className="list-unstyled" data-sidebar-tree>
          {/* this list is alphabetized */}
          <SidebarLink to="/integrations/">Overview</SidebarLink>
          <SidebarLink to="/integrations/azuredevops/">Azure DevOps</SidebarLink>
          <SidebarLink to="/integrations/bitbucket/">Bitbucket</SidebarLink>
          <SidebarLink to="/integrations/discord/">Discord</SidebarLink>
          <SidebarLink to="/integrations/github/">GitHub</SidebarLink>
          <SidebarLink to="/integrations/gitlab/">GitLab</SidebarLink>
          <SidebarLink to="/integrations/heroku/">Heroku</SidebarLink>
          <SidebarLink to="/integrations/jira/">Jira</SidebarLink>
          <SidebarLink to="/integrations/jira-server/">Jira Server</SidebarLink>
          <SidebarLink to="/integrations/msteams/">Microsoft Teams</SidebarLink>
          <SidebarLink to="/integrations/pagerduty/">PagerDuty</SidebarLink>
          <SidebarLink to="/integrations/slack/">Slack</SidebarLink>
          <SidebarLink to="/integrations/vercel/">Vercel</SidebarLink>
        </ul>
      </li>
      <li className="mb-3" data-sidebar-branch>
        <div className="sidebar-title d-flex align-items-center mb-0" data-sidebar-link>
          <h6>Resources</h6>
        </div>

        <ul className="list-unstyled" data-sidebar-tree>
          <SidebarLink to="https://docs.sentry.io">User Documentation</SidebarLink>
        </ul>
      </li>
      <li className="mb-3" data-sidebar-branch>
        <div className="sidebar-title d-flex align-items-center mb-0" data-sidebar-link>
          <h6>Meta Documentation</h6>
        </div>

        <ul className="list-unstyled" data-sidebar-tree>
          <SidebarLink to="/docs-components/">Documentation Components</SidebarLink>
        </ul>
      </li>
    </ul>
  );
};
