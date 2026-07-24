import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.18.4:3',
  releaseNotes: {
    en_US: `Keeps the LND connection working when LND changes how it serves TLS.

Thunderhub resolved LND's address from a field that is only populated for one of the two ways a service can publish a port. It now reads the address itself, which is correct either way — so the connection survives LND's next update instead of going unreachable.`,
    es_ES: `Mantiene la conexión con LND cuando LND cambia su forma de servir TLS.

Thunderhub resolvía la dirección de LND a partir de un campo que solo se rellena en una de las dos formas en que un servicio puede publicar un puerto. Ahora lee la dirección en sí, que es correcta en ambos casos, así que la conexión sobrevive a la próxima actualización de LND en lugar de quedar inaccesible.`,
    de_DE: `Hält die LND-Verbindung aufrecht, wenn LND die Art der TLS-Bereitstellung ändert.

Thunderhub ermittelte die Adresse von LND aus einem Feld, das nur bei einer der beiden Arten gefüllt ist, auf die ein Dienst einen Port veröffentlichen kann. Jetzt wird die Adresse selbst gelesen, die in beiden Fällen stimmt — die Verbindung übersteht damit das nächste LND-Update, statt unerreichbar zu werden.`,
    pl_PL: `Utrzymuje połączenie z LND, gdy LND zmienia sposób udostępniania TLS.

Thunderhub ustalał adres LND na podstawie pola wypełnianego tylko przy jednym z dwóch sposobów publikowania portu przez usługę. Teraz odczytuje sam adres, poprawny w obu przypadkach — dzięki temu połączenie przetrwa kolejną aktualizację LND, zamiast stać się nieosiągalne.`,
    fr_FR: `Maintient la connexion à LND lorsque LND change sa façon de servir TLS.

Thunderhub déterminait l'adresse de LND à partir d'un champ renseigné dans un seul des deux modes de publication d'un port par un service. Il lit désormais l'adresse elle-même, correcte dans les deux cas — la connexion survit donc à la prochaine mise à jour de LND au lieu de devenir injoignable.`,
  },
  migrations: {},
})
