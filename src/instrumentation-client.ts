// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://c3d21251fe4dbcd80bd5946237756abd@o4512263405961216.ingest.de.sentry.io/4512263414874192',

  // Add optional integrations for additional features
  integrations: [Sentry.replayIntegration()],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 0.1,

  // Turns off collection of data that could identify users. Adjust per category:
  // https://docs.sentry.io/platforms/javascript/configuration/options/#dataCollection
  dataCollection: {
    userInfo: false,
    graphQL: { document: false, variables: false },
    genAI: { inputs: false, outputs: false },
    databaseQueryData: false,
    queues: false,
    httpBodies: [],
    httpHeaders: { deny: ['forwarded', '-ip', 'remote-', 'via', '-user'] },
    cookies: { deny: ['forwarded', '-ip', 'remote-', 'via', '-user'] },
    urlQueryParams: { deny: ['forwarded', '-ip', 'remote-', 'via', '-user'] },
  },
  environment: process.env.NEXT_PUBLIC_SENTRY_ENV ?? 'development',
  normalizeDepth: 6,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
