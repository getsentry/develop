exports.onClientEntry = function(_, pluginParams) {
  // eslint-disable-next-line no-restricted-properties
  require.ensure(["@sentry/browser", "@sentry/apm"], function(require) {
    const Sentry = require("@sentry/browser");
    const TracingIntegration = require("@sentry/apm").Integrations.Tracing;
    Sentry.init({
      environment: process.env.NODE_ENV || "development",
      release: process.env.GITHUB_SHA || process.env.VERCEL_GITHUB_COMMIT_SHA,
      tracesSampleRate: 1,
      ...pluginParams,
      integrations: [
        new TracingIntegration(),
        ...(pluginParams.integrations || []),
      ],
    });
    window.Sentry = Sentry;
  });
};
