import { accountsYaml } from '../fileModels/accounts.yaml'
import { sdk } from '../sdk'

export const seedFiles = sdk.setupOnInit(async (effects, kind) => {
  if (kind !== 'install') return

  await accountsYaml.merge(effects, {})
})
