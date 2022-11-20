import KeysContext, { KeysProvider } from './contexts/KeysContext'
import useGlobalKeyHandler from './hooks/useGlobalKeyHandler'
import { ModifiersType, ReactNativeKeysKeyCode, CommandKeyModifiers } from './types'
import addEventListener from './utils/addEventListener'

import type { CommandKeyArgs } from './types'

export type { CommandKeyArgs }
export {
  addEventListener,
  useGlobalKeyHandler,
  KeysContext,
  KeysProvider,
  CommandKeyModifiers as KeyModifiers,
  ReactNativeKeysKeyCode,
  ModifiersType,
}
