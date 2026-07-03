import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => ({
  lnd: {
    kind: 'running',
    versionRange: '>=0.21.1-beta:0',
    healthChecks: ['lnd'],
  },
}))
