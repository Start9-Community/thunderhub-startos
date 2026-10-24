import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.19.1:0',
  releaseNotes: {
    en_US: `- Updates ThunderHub to 0.19.1. Full notes: https://github.com/apotdevin/thunderhub/releases/tag/v0.19.1
- Stops trusting certificates from a compromised certificate authority (eMudhra).`,
    es_ES: `- Actualiza ThunderHub a 0.19.1. Notas completas: https://github.com/apotdevin/thunderhub/releases/tag/v0.19.1
- Deja de confiar en los certificados de una autoridad de certificación comprometida (eMudhra).`,
    de_DE: `- Aktualisiert ThunderHub auf 0.19.1. Vollständige Hinweise: https://github.com/apotdevin/thunderhub/releases/tag/v0.19.1
- Vertraut Zertifikaten einer kompromittierten Zertifizierungsstelle (eMudhra) nicht mehr.`,
    pl_PL: `- Aktualizuje ThunderHub do 0.19.1. Pełne informacje: https://github.com/apotdevin/thunderhub/releases/tag/v0.19.1
- Przestaje ufać certyfikatom przejętego urzędu certyfikacji (eMudhra).`,
    fr_FR: `- Met à jour ThunderHub vers 0.19.1. Notes complètes : https://github.com/apotdevin/thunderhub/releases/tag/v0.19.1
- Ne fait plus confiance aux certificats d'une autorité de certification compromise (eMudhra).`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
