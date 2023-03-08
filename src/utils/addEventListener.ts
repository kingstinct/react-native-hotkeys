// eslint-disable-next-line import/no-extraneous-dependencies
import { EventEmitter, NativeModulesProxy } from 'expo-modules-core'

import mapIosKeyCode from './mapIosKeyCode'
import ReactNativeKeysModule from '../ReactNativeKeysModule'
import { ModifiersType } from '../types'

import type {
  CallbackFn, CommandCallback, CommandPayload, EventTypes, IOSKeyboardEvent, ReactNativeKeysEvent,
} from '../types'

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const emitter = new EventEmitter(ReactNativeKeysModule ?? NativeModulesProxy.ReactNativeKeys)

const transformEvent = (nativeEvent: IOSKeyboardEvent) => {
  const { modifierFlags, characters, keyCode } = nativeEvent.presses[0] || {}

  const getModifierState: ReactNativeKeysEvent['getModifierState'] = (
    key,
  ) => {
    switch (key) {
      case ModifiersType.Hyper:
        return modifierFlags.command
      case ModifiersType.Alt:
        return modifierFlags.alternate
      case ModifiersType.Meta:
        return modifierFlags.command
      case ModifiersType.Control:
        return modifierFlags.control
      case ModifiersType.Shift:
        return modifierFlags.shift
      case ModifiersType.CapsLock:
        return modifierFlags.alphaShift
      default:
        return false
    }
  }

  return {
    altKey: modifierFlags.alternate,
    ctrlKey: modifierFlags.control,
    metaKey: modifierFlags.command,
    shiftKey: modifierFlags.shift,
    getModifierState,
    key: characters,
    nativeEvent,
    keyCode: mapIosKeyCode(keyCode),
  }
}

function addEventListener<TEventName extends EventTypes>(
  eventName: TEventName,
  callback: TEventName extends 'command' ? CommandCallback : CallbackFn,
  options?: {
    /** Web Only */
    readonly passive?: boolean;
    readonly once?: boolean;
    /** Web Only */
    readonly capture?: boolean;
  },
) {
  if (eventName === 'command') {
    const subscription = emitter.addListener('command', (event) => {
      if (options?.once) {
        subscription.remove()
      }
      const cb = callback as CommandCallback
      return cb(event as CommandPayload)
    })

    return subscription
  }

  const cb = callback as CallbackFn

  const subscription = emitter.addListener(eventName, (event: IOSKeyboardEvent) => {
    if (options?.once) {
      subscription.remove()
    }
    return cb(transformEvent(event))
  })

  return subscription
}

export const removeAllListeners = emitter.removeAllListeners.bind(emitter)

export default addEventListener
