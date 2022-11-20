import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react'
import { StyleSheet } from 'react-native'

import ReactNativeKeysView from '../ReactNativeKeysView'
import { MapKeyArgToIos } from '../types'
import addEventListener from '../utils/addEventListener'
import { keyMap } from '../utils/mapWebKeyCode'

import type {
  CommandKeyArgs, ReactNativeKeysEvent, ReactNativeKeysKeyCode, Command,
} from '../types'
import type { Subscription } from 'expo-modules-core'
import type { PropsWithChildren } from 'react'

export type GlobalCallback = (event: ReactNativeKeysEvent) => PromiseLike<boolean | void> | boolean | void;

type RegisterCallback = (key: ReactNativeKeysKeyCode, modifiers: readonly CommandKeyArgs[], callback: GlobalCallback, priority: number, id: string, title?: string) => Subscription

type KeyHandlerCallback = {
  readonly keyCode: ReactNativeKeysKeyCode,
  readonly modifiers: readonly CommandKeyArgs[],
  readonly callback: GlobalCallback,
  readonly priority: number,
  readonly title?: string
  readonly id: string
}

type GlobalKeyHandlerProviderProps = PropsWithChildren<{ readonly defaultHandler?: (event: ReactNativeKeysEvent) => void }>

export const KeysContext = React.createContext({
  setCommands: (() => {}) as (React.Dispatch<React.SetStateAction<readonly Command[]>>),
  addCallback: (() => ({ remove: () => {} })) as RegisterCallback,
})

export const KeysProvider: React.FC<GlobalKeyHandlerProviderProps> = ({ children, defaultHandler }) => {
  const [commands, setCommands] = useState<readonly Command[]>([])
  // eslint-disable-next-line functional/prefer-readonly-type
  const callbacks = useRef<KeyHandlerCallback[]>([])
  const addCallback = useCallback<RegisterCallback>((keyCode, modifiers, callback, priority, id, title) => {
    callbacks.current.push({
      callback, keyCode, priority, modifiers, id, title,
    })
    const mappedModifiers = modifiers.map((m) => MapKeyArgToIos[m])
    setCommands((c) => [
      ...c, {
        input: keyMap[keyCode] as string, modifiers: mappedModifiers, id, title,
      },
    ])
    return ({
      remove: () => {
        setCommands((c) => c.filter((a) => a.id !== id))
        callbacks.current = callbacks.current.filter((c) => id !== c.id)
      },
    })
  }, [])

  const onPress = useCallback(async (event: ReactNativeKeysEvent) => {
    const sortedCallbacks = callbacks.current.filter((c) => c.keyCode === event.keyCode).sort((a, b) => b.priority - a.priority)

    const wasHandled = await sortedCallbacks.reduce(async (prev, { callback }) => {
      if (await prev) {
        return true
      }
      const value = await callback(event)
      return value !== false
    }, Promise.resolve(false))

    if (!wasHandled) {
      defaultHandler?.(event)
    }
  }, [defaultHandler])

  useEffect(() => {
    const subscription = addEventListener('keydown', (event) => {
      void onPress(event)
    }, {
      capture: true,
      passive: true,
    })
    return () => {
      subscription.remove()
    }
  }, [onPress])

  return (
    <KeysContext.Provider value={useMemo(() => ({ setCommands, addCallback }), [addCallback])}>
      <ReactNativeKeysView commands={commands} style={styles.keysView}>
        {children}
      </ReactNativeKeysView>
    </KeysContext.Provider>
  )
}

const styles = StyleSheet.create({
  keysView: { flex: 1 },
})

export default KeysContext
