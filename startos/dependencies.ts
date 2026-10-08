import { depLndDescription } from './manifest/i18n'
import { sdk } from './sdk'

const lnd = sdk.Dependency.required('lnd', {
  description: depLndDescription,
  metadata: {
    title: 'LND',
    icon: 'https://raw.githubusercontent.com/Start9Labs/lnd-startos/refs/heads/master/icon.svg',
  },
  versionRange: '>=0.21.1-beta:4',
  kind: 'running',
  healthChecks: ['lnd'],
})

export const dependencies = sdk.Dependencies.of().addDependency(lnd)
