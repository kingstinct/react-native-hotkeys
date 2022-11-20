import type { GlobalCallback } from '../contexts/KeysContext'
import type { Modifiers, ReactNativeKeysEvent, ReactNativeKeysKeyCode } from '../types'

function dealWithEvent(
  event: ReactNativeKeysEvent,
  modifiers: readonly Modifiers[],
  keyToMatch: ReactNativeKeysKeyCode,
  action: GlobalCallback,
) {
  const keyCodeMatch = keyToMatch === event.keyCode
  const modifiersMatch = modifiers.length === 0 || modifiers.every((k) => event.getModifierState(k))

  if (keyCodeMatch && modifiersMatch) {
    return action(event)
  }
  return false
}

export default dealWithEvent
