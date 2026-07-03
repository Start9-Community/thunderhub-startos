import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { lndMount } from '../utils'

const macaroonPath =
  `${lndMount}/data/chain/bitcoin/mainnet/admin.macaroon` as const
const certificatePath = `${lndMount}/tls.cert` as const

// serverUrl is LND's gRPC endpoint on the LXC bridge, resolved and written by
// main.ts (replaces the deprecated `lnd.startos:10009` DNS name).
export const defaultAccount = {
  name: 'LND Node',
  serverUrl: '',
  macaroonPath,
  certificatePath,
} as const

const accountShape = z.object({
  name: z.string().catch(defaultAccount.name),
  serverUrl: z.string().catch(''),
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
