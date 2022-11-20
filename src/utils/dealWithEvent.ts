import type { OnPressCallback } from '../contexts/KeysContext'
import type { Modifiers, ReactNativeKeysEvent, KeyCode } from '../types'

function dealWithEvent(
  event: ReactNativeKeysEvent,
  modifiers: readonly Modifiers[],
  keyToMatch: KeyCode,
  action: OnPressCallback,
) {
  const keyCodeMatch = keyToMatch === event.keyCode
  const modifiersMatch = modifiers.length === 0 || modifiers.every((k) => event.getModifierState(k))

  if (keyCodeMatch && modifiersMatch) {
    return action(event)
  }
  return false
}

export default dealWithEvent
