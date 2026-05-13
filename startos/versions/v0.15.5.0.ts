import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const v_0_15_5_0 = VersionInfo.of({
  version: '0.15.5:0',
  releaseNotes: {
    en_US: `**Bumps**

- ThunderHub → 0.15.5`,
    es_ES: `**Cambios de versión**

- ThunderHub → 0.15.5`,
    de_DE: `**Versionssprünge**

- ThunderHub → 0.15.5`,
    pl_PL: `**Aktualizacje wersji**

- ThunderHub → 0.15.5`,
    fr_FR: `**Mises à jour de version**

- ThunderHub → 0.15.5`,
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
