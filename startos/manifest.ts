import { setupManifest } from '@start9labs/start-sdk'

export const manifest = setupManifest({
  id: 'thunderhub',
  title: 'ThunderHub',
  license: 'MIT',
  wrapperRepo: 'https://github.com/Start9Labs/thunderhub-startos',
  upstreamRepo: 'https://github.com/apotdevin/thunderhub',
  supportSite: 'https://github.com/apotdevin/thunderhub/issues',
  marketingSite: 'https://www.thunderhub.io/',
  donationUrl: null,
  docsUrl:
   'https://github.com/Start9Labs/thunderhub-startos/blob/update/040/docs/README.md',
  description: {
    short: 'LND Lightning Node Manager in your Browser',
    long: 'ThunderHub is an open-source LND node manager where you can manage and monitor your node on any device or browser. It allows you to take control of the lightning network with a simple and intuitive UX and the most up-to-date tech stack.',
  },
  volumes: ['main'],
  images: {
    thunderhub: {
      source: { dockerTag: 'apotdevin/thunderhub:v0.15.4' },
    },
  },
  dependencies: {
    lnd: {
      description: 'ThunderHub is an LND Manager',
      optional: true,
      metadata: {
        title: 'Lightning Network Daemon',
        icon: 'https://raw.githubusercontent.com/Start9Labs/lnd-startos/refs/heads/master/icon.png',
      },
    },
  },
})
