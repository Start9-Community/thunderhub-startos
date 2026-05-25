import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const v_0_18_3 = VersionInfo.of({
  version: '0.18.3:1',
  releaseNotes: {
    en_US: `- Internal updates (start-sdk 1.5.3)`,
    es_ES: `- Actualizaciones internas (start-sdk 1.5.3)`,
    de_DE: `- Interne Aktualisierungen (start-sdk 1.5.3)`,
    pl_PL: `- Aktualizacje wewnętrzne (start-sdk 1.5.3)`,
    fr_FR: `- Mises à jour internes (start-sdk 1.5.3)`,
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
