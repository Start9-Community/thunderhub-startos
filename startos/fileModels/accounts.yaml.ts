import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { lndMount } from '../utils'

const serverUrl = 'lnd.startos:10009' as const
const macaroonPath =
  `${lndMount}/data/chain/bitcoin/mainnet/admin.macaroon` as const
const certificatePath = `${lndMount}/tls.cert` as const

const defaultAccount = {
  name: 'LND Node',
  serverUrl,
  macaroonPath,
  certificatePath,
} as const

const accountShape = z.object({
  name: z.string().catch(defaultAccount.name),
  serverUrl: z.literal(serverUrl).catch(serverUrl),
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
