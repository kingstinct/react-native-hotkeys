import {
  useCallback, useContext, useEffect, useId, useMemo, useRef, useState,
} from 'react'

import KeysContext from '../contexts/KeysContext'
import dealWithEvent from '../utils/dealWithEvent'

import type { OnPressCallback } from '../contexts/KeysContext'
import type { CommandModifiers, KeyCode } from '../types'

const modifiersAsArray = (
  modifiers: CommandModifiers | readonly CommandModifiers[],
): readonly CommandModifiers[] => (
  Array.isArray(modifiers) ? modifiers : [modifiers]
)

const useHotkey = (
  key: KeyCode,
  onPress: OnPressCallback,
  opts: { readonly priority?: number, readonly title?: string, readonly isEnabled?: boolean, readonly modifiers?: CommandModifiers | readonly CommandModifiers[] } = {},
) => {
  const modifiers = useMemo(() => opts?.modifiers || [], [opts?.modifiers]),
        { addCallback } = useContext(KeysContext),
        [modifiersSafe, setModifiersSafe] = useState(modifiersAsArray(modifiers))

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

  const safeCallback = useCallback<OnPressCallback>((event) => dealWithEvent(event, modifiersSafe, key, callbackRef.current), [key, modifiersSafe])

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

export default useHotkey
