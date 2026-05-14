import { setupManifest } from '@start9labs/start-sdk'
import { depLndDescription, long, short } from './i18n'

export const manifest = setupManifest({
  id: 'thunderhub',
  title: 'ThunderHub',
  license: 'MIT',
  packageRepo: 'https://github.com/Start9Labs/thunderhub-startos',
  upstreamRepo: 'https://github.com/apotdevin/thunderhub',
  marketingUrl: 'https://www.thunderhub.io/',
  donationUrl: null,
  description: { short, long },
  volumes: ['main'],
  images: {
    thunderhub: {
      source: { dockerTag: 'apotdevin/thunderhub:0.15.4' },
      arch: ['x86_64', 'aarch64'],
    },
  },
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {
    lnd: {
      description: depLndDescription,
      optional: false,
      metadata: {
        title: 'LND',
        icon: 'https://raw.githubusercontent.com/Start9Labs/lnd-startos/refs/heads/master/icon.svg',
      },
    },
  },
})
