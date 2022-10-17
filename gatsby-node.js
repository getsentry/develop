const Sentry = require("@sentry/node");
require("@sentry/tracing");
const Profiling = require("@sentry/profiling-node");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  debug: true,
  tracesSampleRate: 1,
  profilesSampleRate: 1, // Set profiling sampling rate.
  integrations: [new Profiling.ProfilingIntegration()],
});

exports.onCreateNode = require("./src/gatsby/onCreateNode").default;
exports.onCreateWebpackConfig = require("./src/gatsby/onCreateWebpackConfig").default;
exports.createPages = require("./src/gatsby/createPages").default;
exports.createSchemaCustomization = require("./src/gatsby/createSchemaCustomization").default;

exports.onPreInit = () => {
  // store job creation action to use it later
  const transaction = Sentry.startTransaction({
    op: "build",
    name: "Build Develop Site",
  });
  Sentry.configureScope(scope => scope.setSpan(transaction));
};

exports.onPostBootstrap = () => {
  const transaction = Sentry.getCurrentHub()
    ?.getScope()
    ?.getTransaction();
  if (transaction) {
    transaction.finish();
  }
  Sentry.flush();
};
