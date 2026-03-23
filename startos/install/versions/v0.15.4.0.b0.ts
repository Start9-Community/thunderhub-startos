import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const v_0_15_4_0_b0 = VersionInfo.of({
  version: '0.15.4:0-beta.0',
  releaseNotes: {
    en_US: 'Update ThunderHub to v0.15.4',
    es_ES: 'Actualización de ThunderHub a v0.15.4',
    de_DE: 'Update von ThunderHub auf v0.15.4',
    pl_PL: 'Aktualizacja ThunderHub do v0.15.4',
    fr_FR: 'Mise à jour de ThunderHub vers v0.15.4',
  },
  migrations: {
    up: async ({ effects }) => {
      // delete old start9 dir from 0.3.5.1
      rm('/media/startos/volumes/main/start9', { recursive: true }).catch(
        console.error,
      )
    },
    down: IMPOSSIBLE,
  },
})
