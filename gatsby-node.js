const Sentry = require("@sentry/node");
require("@sentry/tracing");
const Profiling = require("@sentry/profiling-node");

const activeEnv =
  process.env.GATSBY_ENV || process.env.NODE_ENV || "development";

Sentry.init({
  dsn:
    process.env.SENTRY_DSN ||
    "https://f107f3f0deb544289e4e056922e5e5a4@o1.ingest.sentry.io/5266138",
  debug: true,
  environment: activeEnv,
  tracesSampleRate: activeEnv === "development" ? 0 : 1,
  profilesSampleRate: activeEnv === "development" ? 0 : 1, // Set profiling sampling rate.
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
    name: "Init",
  });
  Sentry.configureScope(scope => scope.setSpan(transaction));
};

exports.onPreBootstrap = () => {
  const oldTransaction = Sentry.getCurrentHub()
    ?.getScope()
    ?.getTransaction();

  let oldTransactionTraceParent;
  if (oldTransaction) {
    oldTransactionTraceParent = {
      traceId: oldTransaction.traceId,
      parentSpanId: oldTransaction.spanId,
      sampled: oldTransaction.sampled,
    };
    oldTransaction.finish();
  }

  const transaction = Sentry.startTransaction({
    op: "build",
    name: "Bootstrap",
    ...oldTransactionTraceParent,
  });
  Sentry.configureScope(scope => scope.setSpan(transaction));
};

exports.onPreBuild = () => {
  const oldTransaction = Sentry.getCurrentHub()
    ?.getScope()
    ?.getTransaction();

  let oldTransactionTraceParent;
  if (oldTransaction) {
    oldTransactionTraceParent = {
      traceId: oldTransaction.traceId,
      parentSpanId: oldTransaction.spanId,
      sampled: oldTransaction.sampled,
    };
    oldTransaction.finish();
  }

  const transaction = Sentry.startTransaction({
    op: "build",
    name: "Build",
    ...oldTransactionTraceParent,
  });
  Sentry.configureScope(scope => scope.setSpan(transaction));
};

exports.onPostBuild = () => {
  const transaction = Sentry.getCurrentHub()
    ?.getScope()
    ?.getTransaction();
  if (transaction) {
    transaction.finish();
  }
  Sentry.flush(2000);
};
