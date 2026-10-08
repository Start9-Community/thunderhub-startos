import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

export const v_0_18_4_5 = VersionInfo.of({
  version: '0.18.4:5',
  releaseNotes: {
    en_US: `- The unused network interface left behind by the StartOS 0.3.5 version of ThunderHub is removed and its port freed. The Web UI interface and its addresses are unchanged.
- Reset Master Password asks for confirmation before it replaces the existing password.
- Reset Master Password restarts ThunderHub, so the new password works right away.
- Two-factor authentication set up in ThunderHub stays on across restarts.`,
    es_ES: `- Se elimina la interfaz de red sin uso que dejó la versión de ThunderHub para StartOS 0.3.5 y se libera su puerto. La interfaz web y sus direcciones no cambian.
- «Restablecer contraseña maestra» pide confirmación antes de reemplazar la contraseña existente.
- «Restablecer contraseña maestra» reinicia ThunderHub, así que la nueva contraseña funciona de inmediato.
- La autenticación de dos factores configurada en ThunderHub permanece activa tras los reinicios.`,
    de_DE: `- Die ungenutzte Netzwerkschnittstelle, die die StartOS-0.3.5-Version von ThunderHub hinterlassen hatte, wird entfernt und ihr Port freigegeben. Die Weboberfläche und ihre Adressen bleiben unverändert.
- „Master-Passwort zurücksetzen“ fragt nach einer Bestätigung, bevor es das bestehende Passwort ersetzt.
- „Master-Passwort zurücksetzen“ startet ThunderHub neu, sodass das neue Passwort sofort gilt.
- In ThunderHub eingerichtete Zwei-Faktor-Authentifizierung bleibt über Neustarts hinweg aktiv.`,
    pl_PL: `- Usunięto nieużywany interfejs sieciowy pozostawiony przez wersję ThunderHub dla StartOS 0.3.5 i zwolniono jego port. Interfejs webowy i jego adresy pozostają bez zmian.
- „Zresetuj główne hasło” prosi o potwierdzenie, zanim zastąpi istniejące hasło.
- „Zresetuj główne hasło” uruchamia ThunderHub ponownie, więc nowe hasło działa od razu.
- Uwierzytelnianie dwuskładnikowe skonfigurowane w ThunderHub pozostaje włączone po ponownych uruchomieniach.`,
    fr_FR: `- L'interface réseau inutilisée laissée par la version de ThunderHub pour StartOS 0.3.5 est supprimée et son port libéré. L'interface web et ses adresses ne changent pas.
- « Réinitialiser le mot de passe maître » demande une confirmation avant de remplacer le mot de passe existant.
- « Réinitialiser le mot de passe maître » redémarre ThunderHub, le nouveau mot de passe fonctionne donc immédiatement.
- L'authentification à deux facteurs configurée dans ThunderHub reste active après les redémarrages.`,
  },
  migrations: {
    up: async ({ effects }) => {
      await sdk.MultiHost.of(effects, 'main').retire()
    },
    down: IMPOSSIBLE,
  },
})
