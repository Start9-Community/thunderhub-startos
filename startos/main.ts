import { gRPCHostId, gRPCPort } from 'lnd-startos/startos/interfaces'
import { manifest as lndManifest } from 'lnd-startos/startos/manifest'
import { accountsYaml, defaultAccount } from './fileModels/accounts.yaml'
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
    .mountDependency<typeof lndManifest>({
      dependencyId: 'lnd',
      volumeId: 'main',
      subpath: null,
      mountpoint: lndMount,
      readonly: true,
    })

  const thSub = sdk.SubContainer.of(
    effects,
    { imageId: 'thunderhub' },
    mounts,
    'thunderhub-sub',
  )

  // Resolve LND's gRPC endpoint on the LXC bridge and write it into
  // accounts.yaml so ThunderHub connects to the node. LND terminates its own
  // TLS on this port. LND binds gRPC only after wallet unlock (the admin
  // macaroon appears), so this stays null until then: serverUrl is left absent
  // and heals with one restart when the binding lands — no separate macaroon
  // watch needed. null also propagates on LND uninstall, dropping serverUrl so
  // ThunderHub reconfigures instead of dialing a stale port.
  const grpcHost = await sdk.host
    .getBridgeAddress(effects, {
      packageId: 'lnd',
      hostId: gRPCHostId,
      internalPort: gRPCPort,
    })
    .const()

  await accountsYaml.merge(effects, {
    accounts: [{ ...defaultAccount, serverUrl: grpcHost ?? undefined }],
  })

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
