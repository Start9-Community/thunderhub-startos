import { sdk } from '../sdk'
import { getMasterPassword } from './getMasterPassword'

export const actions = sdk.Actions.of().addAction(getMasterPassword)
