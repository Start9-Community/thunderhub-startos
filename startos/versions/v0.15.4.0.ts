import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const v_0_15_4_0 = VersionInfo.of({
  version: '0.15.4:0',
  releaseNotes: {
    en_US: 'Update ThunderHub to v0.15.4 for StartOS 0.4.0',
    es_ES: 'Actualización de ThunderHub a v0.15.4 para StartOS 0.4.0',
    de_DE: 'Update von ThunderHub auf v0.15.4 für StartOS 0.4.0',
    pl_PL: 'Aktualizacja ThunderHub do v0.15.4 dla StartOS 0.4.0',
    fr_FR: 'Mise à jour de ThunderHub vers v0.15.4 pour StartOS 0.4.0',
  },
  migrations: {
    up: async ({ effects }) => {
      // delete legacy start9 dir from 0.3.5.1
      await rm('/media/startos/volumes/main/start9', {
        recursive: true,
      }).catch(() => {})
    },
    down: IMPOSSIBLE,
  },
})
