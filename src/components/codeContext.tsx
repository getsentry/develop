import React, {useState} from 'react';

type ProjectCodeKeywords = {
  DSN: string;
  PUBLIC_DSN: string;
  PUBLIC_KEY: string;
  SECRET_KEY: string;
  API_URL: string;
  PROJECT_ID: number;
  PROJECT_SLUG: string;
  ORG_ID: number;
  ORG_SLUG: string;
  ORG_INGEST_DOMAIN: string;
  MINIDUMP_URL: string;
  UNREAL_URL: string;
  title: string;
};

type CodeKeywords = {
  PROJECT: ProjectCodeKeywords[];
};

const DEFAULTS: CodeKeywords = {
  PROJECT: [
    {
      DSN: 'https://examplePublicKey@o0.ingest.sentry.io/0',
      PUBLIC_DSN: 'https://examplePublicKey@o0.ingest.sentry.io/0',
      PUBLIC_KEY: 'examplePublicKey',
      SECRET_KEY: 'exampleSecretKey',
      API_URL: 'https://sentry.io/api',
      PROJECT_ID: 0,
      PROJECT_SLUG: 'example-project',
      ORG_ID: 0,
      ORG_SLUG: 'exmaple-org',
      ORG_INGEST_DOMAIN: 'o0.ingest.sentry.io',
      MINIDUMP_URL: 'https://examplePublicKey@o0.ingest.sentry.io/0',
      UNREAL_URL: 'https://examplePublicKey@o0.ingest.sentry.io/0',
      title: `example-org / example-project`,
    },
  ],
};

type CodeContextType = {
  codeKeywords: CodeKeywords;
  sharedCodeSelection: any;
  sharedKeywordSelection: any;
};

const CodeContext = React.createContext<CodeContextType | null>(null);

export default CodeContext;

export function useCodeContextState() {
  return {
    codeKeywords: DEFAULTS,
    sharedCodeSelection: useState(null),
    sharedKeywordSelection: useState({}),
  };
}
