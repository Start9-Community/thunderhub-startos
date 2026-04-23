import { getMasterPassword } from '../actions/getMasterPassword'
import { accountsYaml } from '../fileModels/accounts.yaml'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const taskGetPassword = sdk.setupOnInit(async (effects) => {
  const masterPassword = await accountsYaml
    .read((a) => a.masterPassword)
    .const(effects)

  if (!masterPassword) {
    await sdk.action.createOwnTask(effects, getMasterPassword, 'critical', {
      reason: i18n('Create your ThunderHub master password'),
    })
  }
})
