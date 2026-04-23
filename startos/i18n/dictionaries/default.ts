export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting ThunderHub...': 0,
  'Web Interface': 1,
  'The web interface is ready': 2,
  'The web interface is not ready': 3,

  // interfaces.ts
  'Web UI': 4,
  'The web interface of ThunderHub': 5,

  // init + actions
  'Create your ThunderHub master password': 6,
  'Create Master Password': 7,
  'Create the master password used to log into ThunderHub': 8,
  'Reset Master Password': 9,
  'Reset the master password used to log into ThunderHub': 10,
  'Your ThunderHub master password is below': 11,
  Success: 12,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
