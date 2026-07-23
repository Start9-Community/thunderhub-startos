import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const v_0_18_4_0 = VersionInfo.of({
  version: '0.18.4:0',
  releaseNotes: {
    en_US:
      'Updated ThunderHub to 0.18.4. Fixes native display formatting in the trading distribution view and corrects the buy execution path so it no longer builds a route with too little final CLTV headroom. Also includes internal updates for start-sdk 2.0. Full notes: https://github.com/apotdevin/thunderhub/releases/tag/v0.18.4',
    es_ES:
      'Se actualizó ThunderHub a 0.18.4. Corrige el formato de visualización nativo en la vista de distribución de operaciones y ajusta la ruta de ejecución de compra para que ya no construya una ruta con muy poco margen de CLTV final. También incluye actualizaciones internas para start-sdk 2.0. Notas completas: https://github.com/apotdevin/thunderhub/releases/tag/v0.18.4',
    de_DE:
      'ThunderHub auf 0.18.4 aktualisiert. Behebt die native Anzeigeformatierung in der Handelsverteilungsansicht und korrigiert den Kauf-Ausführungspfad, sodass keine Route mehr mit zu geringem finalen CLTV-Spielraum aufgebaut wird. Enthält außerdem interne Aktualisierungen für start-sdk 2.0. Vollständige Hinweise: https://github.com/apotdevin/thunderhub/releases/tag/v0.18.4',
    pl_PL:
      'Zaktualizowano ThunderHub do 0.18.4. Naprawia natywne formatowanie wyświetlania w widoku rozkładu transakcji i poprawia ścieżkę realizacji zakupu, aby nie budowała trasy ze zbyt małym końcowym zapasem CLTV. Zawiera również wewnętrzne aktualizacje dla start-sdk 2.0. Pełne informacje: https://github.com/apotdevin/thunderhub/releases/tag/v0.18.4',
    fr_FR:
      'ThunderHub mis à jour vers 0.18.4. Corrige le formatage d’affichage natif dans la vue de distribution des échanges et rectifie le chemin d’exécution d’achat afin qu’il ne construise plus de route avec une marge CLTV finale trop faible. Inclut également des mises à jour internes pour start-sdk 2.0. Notes complètes : https://github.com/apotdevin/thunderhub/releases/tag/v0.18.4',
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
