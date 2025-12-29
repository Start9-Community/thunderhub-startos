import { matches, FileHelper } from '@start9labs/start-sdk'

const { object, string, array } = matches

const accountShape = object({
  name: string,
  serverUrl: string,
  macaroonPath: string.optional(),
  certificatePath: string.optional(),
  macaroon: string.optional(),
  certificate: string.optional(),
  password: string.optional(),
})

const shape = object({
  masterPassword: string,
  accounts: array(accountShape),
})

export const accountsYaml = FileHelper.yaml(
  {
    volumeId: 'main',
    subpath: '/accounts.yaml',
  },
  shape,
)

