import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const v_0_18_3 = VersionInfo.of({
  version: '0.18.3:0',
  releaseNotes: {
    en_US: `- ThunderHub -> 0.18.3 (Taproot Assets, multi-hop swaps with circular rebalancing, per-channel notes, in-app Magma payments, and more)
- Internal updates (start-sdk 1.5.2)`,
    es_ES: `- ThunderHub -> 0.18.3 (Taproot Assets, swaps multi-hop con reequilibrio circular, notas por canal, pagos Magma en la app y más)
- Actualizaciones internas (start-sdk 1.5.2)`,
    de_DE: `- ThunderHub -> 0.18.3 (Taproot Assets, Multi-Hop-Swaps mit zirkulärem Rebalancing, Notizen pro Kanal, In-App-Magma-Zahlungen und mehr)
- Interne Aktualisierungen (start-sdk 1.5.2)`,
    pl_PL: `- ThunderHub -> 0.18.3 (Taproot Assets, swapy multi-hop z rebalansowaniem cyklicznym, notatki na kanał, płatności Magma w aplikacji i więcej)
- Aktualizacje wewnętrzne (start-sdk 1.5.2)`,
    fr_FR: `- ThunderHub -> 0.18.3 (Taproot Assets, swaps multi-sauts avec rééquilibrage circulaire, notes par canal, paiements Magma dans l'application et plus)
- Mises à jour internes (start-sdk 1.5.2)`,
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
