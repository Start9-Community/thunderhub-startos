import { FileHelper } from '@start9labs/start-sdk'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { accountsPath, dataDir, lndMount, uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  /**
   * ======================== Setup (optional) ========================
   *
   * In this section, we fetch any resources or run any desired preliminary commands.
   */
  console.info(i18n('Starting ThunderHub...'))

  const mounts = sdk.Mounts.of()
    .mountVolume({
      volumeId: 'main',
      subpath: null,
      mountpoint: dataDir,
      readonly: false,
    })
    .mountDependency({
      dependencyId: 'lnd',
      volumeId: 'main',
      subpath: null,
      mountpoint: lndMount,
      readonly: true,
    })

  const thSub = await sdk.SubContainer.of(
    effects,
    { imageId: 'thunderhub' },
    mounts,
    'thunderhub-sub',
  )

  // LND writes the admin macaroon only after wallet unlock. Register a reactive
  // watch so main re-runs (and the daemon restarts with a valid account) when
  // LND writes the file. Mirrors LND's own bitcoin rpccookie watch in main.ts.
  await FileHelper.string(
    `${thSub.rootfs}${lndMount}/data/chain/bitcoin/mainnet/admin.macaroon`,
  )
    .read()
    .const(effects)

  /**
   * ======================== Daemons ========================
   *
   * In this section, we create one or more daemons that define the service runtime.
   *
   * Each daemon defines its own health check, which can optionally be exposed to the user.
   */
  return sdk.Daemons.of(effects).addDaemon('primary', {
    subcontainer: thSub,
    exec: {
      command: sdk.useEntrypoint(),
      // Upstream image runs as node (uid 1000). It must write /data/accounts.yaml
      // (to persist hashed passwords) and read LND's root-owned admin.macaroon,
      // so we override to root.
      user: 'root',
      env: {
        ACCOUNT_CONFIG_PATH: accountsPath,
        PORT: uiPort.toString(),
        NO_VERSION_CHECK: 'true',
      },
    },
    ready: {
      display: i18n('Web Interface'),
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, uiPort, {
          successMessage: i18n('The web interface is ready'),
          errorMessage: i18n('The web interface is not ready'),
        }),
    },
    requires: [],
  })
})
