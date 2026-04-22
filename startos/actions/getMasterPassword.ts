import { utils } from '@start9labs/start-sdk'
import { accountsYaml } from '../fileModels/accounts.yaml'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const getMasterPassword = sdk.Action.withoutInput(
  // id
  'master-password',

  // metadata
  async ({ effects }) => {
    const hasPass =
      ((await accountsYaml.read((a) => a.masterPassword).const(effects)) ??
        '') !== ''

    return {
      name: hasPass ? i18n('Reset Master Password') : i18n('Create Master Password'),
      description: hasPass
        ? i18n('Reset the master password used to log into ThunderHub')
        : i18n('Create the master password used to log into ThunderHub'),
      warning: null,
      allowedStatuses: 'any',
      group: null,
      visibility: 'enabled',
    }
  },

  // the execution function
  async ({ effects }) => {
    const masterPassword = utils.getDefaultString({
      charset: 'a-z,A-Z,1-9,!,@,$,%,&,*',
      len: 22,
    })

    await accountsYaml.merge(effects, { masterPassword })

    return {
      version: '1',
      title: i18n('Success'),
      message: i18n('Your ThunderHub master password is below'),
      result: {
        type: 'single',
        value: masterPassword,
        masked: true,
        copyable: true,
        qr: false,
      },
    }
  },
)
