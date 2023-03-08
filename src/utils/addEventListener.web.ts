import {
  ModifiersType,
} from '../types'
import mapWebKeyCode from './mapWebKeyCode'

import type {
  ReactNativeKeysEvent,
  EventTypes,
  CommandCallback,
  CallbackFn,
} from '../types'
import type { Subscription } from 'expo-modules-core'
import type { Key } from 'ts-key-enum'

export * from '../types'

function addEventListener<TEventType extends EventTypes>(
  eventType: TEventType,
  callback: TEventType extends 'command' ? CommandCallback : CallbackFn,
  opts?: {
    /** Web Only */
    readonly passive?: boolean;
    readonly once?: boolean;
    /** Web Only */
    readonly capture?: boolean;
  },
): Subscription {
  if (eventType === 'command') {
    return addEventListener('keydown', (event) => {
      const cb = callback as CommandCallback
      if (event.key) {
        cb({
          input: event.key,
          modifierFlags: {
            alphaShift: event.shiftKey,
            alternate: event.altKey,
            command: event.metaKey,
            control: event.ctrlKey,
            numericPad: false,
            shift: event.shiftKey,
          },
        })
      }
    }, opts)
  }
  const internalCallback = (nativeEvent: KeyboardEvent) => {
    const event: ReactNativeKeysEvent = {
      altKey: nativeEvent.altKey,
      nativeEvent,
      ctrlKey: nativeEvent.ctrlKey,
      key: nativeEvent.key,
      keyCode: mapWebKeyCode(nativeEvent.key as Key),
      metaKey: nativeEvent.metaKey,
      shiftKey: nativeEvent.shiftKey,
      getModifierState: (keyArg) => {
        switch (keyArg) {
          case ModifiersType.Alt:
            return nativeEvent.altKey
          case ModifiersType.Shift:
            return nativeEvent.shiftKey
          case ModifiersType.Control:
            return nativeEvent.ctrlKey
          case ModifiersType.Meta:
            return nativeEvent.metaKey
          default:
            return nativeEvent.getModifierState(keyArg)
        }
      },
    }
    const cb = callback as CallbackFn
    cb(event)
  }

  const options = {
    once: opts?.once,
    passive: opts?.passive,
    capture: opts?.capture,
  }

  document.body.addEventListener(eventType as 'keydown' | 'keyup', internalCallback, options)

  return {
    remove: () => {
      document.body.removeEventListener(eventType as 'keydown' | 'keyup', internalCallback, options)
    },
  }
}

export default addEventListener
