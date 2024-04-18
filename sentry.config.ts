import * as Sentry from '@sentry/gatsby';

const activeEnv = process.env.GATSBY_ENV || process.env.NODE_ENV || 'development';

function isNodeEnv(): boolean {
  return (
    Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) ===
    '[object process]'
  );
}

if (!isNodeEnv()) {
  Sentry.init({
    dsn:
      activeEnv === 'development'
        ? undefined
        : 'https://f107f3f0deb544289e4e056922e5e5a4@o1.ingest.sentry.io/5266138',
    release: process.env.GATSBY_SENTRY_RELEASE,
    integrations: [
      new Sentry.BrowserTracing({
        _experiments: {
          enableInteractions: true,
          // If you want automatic route transactions in react or similar
          onStartRouteTransaction: Sentry.onProfilingStartRouteTransaction,
        },
      }),
      new Sentry.BrowserProfilingIntegration(),
      new Sentry.Replay({
        // No PII here so lets get the texts
        maskAllText: false,
        blockAllMedia: false,
        networkDetailAllowUrls: [window.location.origin],
        networkRequestHeaders: ["referrer", "sentry-trace", "baggage"],
        networkResponseHeaders: ["Server"],
      }),
    ],

    // @ts-expect-error this is not part of the browser SDK options yet
    profilesSampleRate: 1.0,

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,

    // Capture Replay for 10% of all sessions,
    // plus for 100% of sessions with an error
    replaysSessionSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,
  });
}
