import { VersionGraph } from '@start9labs/start-sdk'
import { current, other } from './versions'
import { accountsYaml } from '../fileModels/accounts.yaml'

export const versionGraph = VersionGraph.of({
  current,
  other,
  preInstall: async (effects) => {
    // Initialize accounts.yaml with default master password and LND account
    // The LND account uses the mounted dependency volume at /mnt/lnd
    await accountsYaml.write(effects, {
      masterPassword: 'thunderhub',
      accounts: [
        {
          name: 'LND Node',
          serverUrl: 'lnd.startos:10009',
          macaroonPath: '/mnt/lnd/data/chain/bitcoin/mainnet/admin.macaroon',
          certificatePath: '/mnt/lnd/tls.cert',
        },
      ],
    })
  },
})
