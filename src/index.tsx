import { useEffect } from 'react';
import { addEventListener } from './platform-specific';

import type {
  KeyArg,
  ReactNativeKeysEvent,
  ReactNativeKeysKeyCode,
} from './types';

export * from './platform-specific';

export const usePressedKeyCode = (
  keyCode: ReactNativeKeysKeyCode,
  action?: () => unknown,
  isEnabled = true
) => {
  useEffect(() => {
    if (isEnabled && action) {
      const subscription = addEventListener(
        'keydown',
        (event) => {
          if (keyCode === event.keyCode) {
            action();
          }
        },
        { capture: true }
      );
      return () => subscription.remove();
    }
    return () => {};
  }, [isEnabled, action, keyCode]);
};

function dealWithEvent(
  event: ReactNativeKeysEvent,
  keyArgs: KeyArg[],
  keyToMatch: string,
  action: () => unknown
) {
  const key =
    'presses' in event.nativeEvent &&
    event.nativeEvent.presses[0]?.charactersIgnoringModifiers
      ? event.nativeEvent.presses[0]?.charactersIgnoringModifiers
      : event.key;

  if (
    keyArgs.every((k) => event.getModifierState(k)) &&
    key.toLowerCase() === keyToMatch.toLowerCase()
  ) {
    action();
  }
}

export const usePressedCombo = (
  keyToMatch: string,
  keyArg: KeyArg,
  action?: () => unknown,
  isEnabled = true
) => {
  useEffect(() => {
    if (isEnabled && action) {
      const keyArgs = [keyArg];

      const subscription = addEventListener(
        'keydown',
        (event) => {
          dealWithEvent(event, keyArgs, keyToMatch, action);
        },
        { capture: true }
      );
      return () => subscription.remove();
    }
    return () => {};
  }, [isEnabled, action, keyToMatch, keyArg]);
};

export const usePressedComboMulti = (
  keyToMatch: string,
  keyArgs: KeyArg[],
  action?: () => unknown,
  isEnabled = true
) => {
  useEffect(() => {
    if (isEnabled && action) {
      const subscription = addEventListener(
        'keydown',
        (event) => {
          dealWithEvent(event, keyArgs, keyToMatch, action);
        },
        { capture: true }
      );
      return () => subscription.remove();
    }
    return () => {};
  }, [isEnabled, action, keyToMatch, keyArgs]);
};
