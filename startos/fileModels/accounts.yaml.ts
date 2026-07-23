import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { lndMount } from '../utils'

const macaroonPath =
  `${lndMount}/data/chain/bitcoin/mainnet/admin.macaroon` as const
const certificatePath = `${lndMount}/tls.cert` as const

// serverUrl is LND's gRPC endpoint on the LXC bridge, resolved and written by
// main.ts when LND's binding is available. It stays absent until then rather
// than holding a fabricated address, so ThunderHub never dials a dead port.
export const defaultAccount = {
  name: 'LND Node',
  macaroonPath,
  certificatePath,
} as const

const accountShape = z.object({
  name: z.string().catch(defaultAccount.name),
  serverUrl: z.string().optional().catch(undefined),
  macaroonPath: z.literal(macaroonPath).catch(macaroonPath),
  certificatePath: z.literal(certificatePath).catch(certificatePath),
})

const shape = z.object({
  masterPassword: z.string().catch(''),
  accounts: z.array(accountShape).catch([defaultAccount]),
})

export const accountsYaml = FileHelper.yaml(
  { base: sdk.volumes.main, subpath: '/accounts.yaml' },
  shape,
)
