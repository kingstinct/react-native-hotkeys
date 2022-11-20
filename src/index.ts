import KeysContext, { KeysProvider } from './contexts/KeysContext'
import useHotkey from './hooks/useHotkey'
import { ModifiersType, KeyCode, CommandKeyModifiers } from './types'
import addEventListener from './utils/addEventListener'

import type { CommandModifiers } from './types'

export type { CommandModifiers as CommandKeyArgs }
export {
  addEventListener,
  useHotkey,
  KeysContext,
  KeysProvider,
  CommandKeyModifiers as KeyModifiers,
  KeyCode as ReactNativeKeysKeyCode,
  ModifiersType,
}
