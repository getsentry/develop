exports.onClientEntry = function (_, pluginParams) {
  require.ensure(["@sentry/browser", "@sentry/apm"], function (require) {
    const Sentry = require("@sentry/browser");
    const TracingIntegration = require("@sentry/apm").Integrations.Tracing;
    Sentry.init({
      environment: process.env.NODE_ENV || "development",
      tracesSampleRate: 1,
      ...pluginParams,
      integrations: [new TracingIntegration()],
    });
    window.Sentry = Sentry;
  });
};
