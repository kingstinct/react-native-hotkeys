import {
  useCallback, useContext, useEffect, useId, useRef, useState,
} from 'react'

import KeysContext from '../contexts/KeysContext'
import dealWithEvent from '../utils/dealWithEvent'

import type { GlobalCallback } from '../contexts/KeysContext'
import type { CommandKeyArgs, ReactNativeKeysKeyCode } from '../types'

const modifiersAsArray = (modifiers: CommandKeyArgs | readonly CommandKeyArgs[]): readonly CommandKeyArgs[] => (Array.isArray(modifiers) ? modifiers : [modifiers])

const useGlobalKeyHandler = (
  key: ReactNativeKeysKeyCode,
  onPress: GlobalCallback,
  modifiers: CommandKeyArgs | readonly CommandKeyArgs[] = [],
  opts: { readonly priority?: number, readonly title?: string, readonly isEnabled?: boolean } = {},
) => {
  const { addCallback } = useContext(KeysContext)
  const [modifiersSafe, setModifiersSafe] = useState(modifiersAsArray(modifiers))

  useEffect(() => {
    const mods = modifiersAsArray(modifiers)
    if (mods.some((m, i) => m !== modifiersSafe[i])) {
      setModifiersSafe(modifiersAsArray(modifiers))
    }
  }, [modifiers, modifiersSafe])

  const callbackRef = useRef(onPress)

  useEffect(() => {
    callbackRef.current = onPress
  }, [onPress])

  const safeCallback = useCallback<GlobalCallback>((event) => dealWithEvent(event, modifiersSafe, key, callbackRef.current), [key, modifiersSafe])

  const isEnabled = opts?.isEnabled ?? true
  const priority = opts?.priority ?? 0

  const id = useId()

  useEffect(() => {
    if (isEnabled) {
      const listener = addCallback(key, modifiersSafe, safeCallback, priority, id)
      return () => listener.remove()
    }
    return () => {}
  }, [
    addCallback, safeCallback, priority, isEnabled, key, modifiersSafe, id,
  ])
}

export default useGlobalKeyHandler
