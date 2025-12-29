import { sdk } from './sdk'
import { uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  /**
   * ======================== Setup (optional) ========================
   *
   * In this section, we fetch any resources or run any desired preliminary commands.
   */
  console.info('[i] Starting ThunderHub!')

  // Build mounts for the subcontainer
  let mounts = sdk.Mounts.of().mountVolume({
    volumeId: 'main',
    subpath: null,
    mountpoint: '/data',
    readonly: false,
  })

  // Mount LND dependency (ThunderHub only supports LND)
  mounts = mounts.mountDependency({
    dependencyId: 'lnd',
    volumeId: 'main',
    subpath: null,
    mountpoint: '/mnt/lnd',
    readonly: true,
  })

  // Set environment variables for ThunderHub
  const env: Record<string, string> = {
    ACCOUNT_CONFIG_PATH: '/data/accounts.yaml',
    PORT: uiPort.toString(),
    NO_VERSION_CHECK: 'true',
  }

  /**
   * ======================== Daemons ========================
   *
   * In this section, we create one or more daemons that define the service runtime.
   *
   * Each daemon defines its own health check, which can optionally be exposed to the user.
   */
  return sdk.Daemons.of(effects).addDaemon('primary', {
    subcontainer: await sdk.SubContainer.of(
      effects,
      { imageId: 'thunderhub' },
      mounts,
      'thunderhub-sub',
    ),
    exec: {
      command: sdk.useEntrypoint(),
      env,
    },
    ready: {
      display: 'Web Interface',
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, uiPort, {
          successMessage: 'The web interface is ready',
          errorMessage: 'The web interface is not ready',
        }),
    },
    requires: [],
  })
})
