import {
  ReactNativeKeysEventListener,
  KeyArg,
  ReactNativeKeysEvent,
  ReactNativeKeysKeyCode,
} from './types';
import { Key } from 'ts-key-enum';

export * from './types';

const keyMap: Record<ReactNativeKeysKeyCode, Key | Key[]> = {
  [ReactNativeKeysKeyCode.Alt]: Key.Alt,
  [ReactNativeKeysKeyCode.AltGraph]: Key.AltGraph,
  [ReactNativeKeysKeyCode.ArrowDown]: Key.ArrowDown,
  [ReactNativeKeysKeyCode.ArrowLeft]: Key.ArrowLeft,
  [ReactNativeKeysKeyCode.ArrowRight]: Key.ArrowRight,
  [ReactNativeKeysKeyCode.ArrowUp]: Key.ArrowUp,
  [ReactNativeKeysKeyCode.Backspace]: Key.Backspace,
  [ReactNativeKeysKeyCode.CapsLock]: Key.CapsLock,
  [ReactNativeKeysKeyCode.Control]: Key.Control,
  [ReactNativeKeysKeyCode.Delete]: Key.Delete,
  [ReactNativeKeysKeyCode.End]: Key.End,
  [ReactNativeKeysKeyCode.Enter]: Key.Enter,
  [ReactNativeKeysKeyCode.Escape]: Key.Escape,
  [ReactNativeKeysKeyCode.F1]: Key.F1,
  [ReactNativeKeysKeyCode.F10]: Key.F10,
  [ReactNativeKeysKeyCode.F11]: Key.F11,
  [ReactNativeKeysKeyCode.F12]: Key.F12,
  [ReactNativeKeysKeyCode.F13]: Key.F13,
  [ReactNativeKeysKeyCode.F14]: Key.F14,
  [ReactNativeKeysKeyCode.F15]: Key.F15,
  [ReactNativeKeysKeyCode.F16]: Key.F16,
  [ReactNativeKeysKeyCode.F17]: Key.F17,
  [ReactNativeKeysKeyCode.F18]: Key.F18,
  [ReactNativeKeysKeyCode.F19]: Key.F19,
  [ReactNativeKeysKeyCode.F2]: Key.F2,
  [ReactNativeKeysKeyCode.F20]: Key.F20,
  [ReactNativeKeysKeyCode.F3]: Key.F3,
  [ReactNativeKeysKeyCode.F4]: Key.F4,
  [ReactNativeKeysKeyCode.F5]: Key.F5,
  [ReactNativeKeysKeyCode.F6]: Key.F6,
  [ReactNativeKeysKeyCode.F7]: Key.F7,
  [ReactNativeKeysKeyCode.F8]: Key.F8,
  [ReactNativeKeysKeyCode.F9]: Key.F9,
  [ReactNativeKeysKeyCode.Undo]: Key.Undo,
  [ReactNativeKeysKeyCode.Cut]: Key.Cut,
  [ReactNativeKeysKeyCode.Paste]: Key.Paste,
  [ReactNativeKeysKeyCode.Copy]: Key.Copy,
  [ReactNativeKeysKeyCode.Find]: Key.Find,
  [ReactNativeKeysKeyCode.Stop]: Key.MediaStop,
  [ReactNativeKeysKeyCode.Redo]: [Key.Again, Key.Redo],
  [ReactNativeKeysKeyCode.Help]: Key.Help,
  [ReactNativeKeysKeyCode.Home]: Key.Home,
  [ReactNativeKeysKeyCode.Insert]: Key.Insert,
  [ReactNativeKeysKeyCode.Meta]: Key.Meta,
  [ReactNativeKeysKeyCode.Mute]: Key.AudioVolumeMute,
  [ReactNativeKeysKeyCode.NumberPadPlus]: Key.Add,
  [ReactNativeKeysKeyCode.NumLock]: Key.NumLock,
  [ReactNativeKeysKeyCode.PageDown]: Key.PageDown,
  [ReactNativeKeysKeyCode.PageUp]: Key.PageUp,
  [ReactNativeKeysKeyCode.Pause]: Key.Pause,
  [ReactNativeKeysKeyCode.PrintScreen]: Key.PrintScreen,
  [ReactNativeKeysKeyCode.ScrollLock]: Key.ScrollLock,
  [ReactNativeKeysKeyCode.Shift]: Key.Shift,
  // [UnifiedKeyCode.Space]: ExtendedKeySpace.Space,
  [ReactNativeKeysKeyCode.Tab]: Key.Tab,
  [ReactNativeKeysKeyCode.VolumeDown]: Key.AudioVolumeDown,
  [ReactNativeKeysKeyCode.VolumeUp]: Key.AudioVolumeUp,
};

const mapKeyCode = (key: Key): ReactNativeKeysKeyCode | null => {
  return (
    (Object.keys(keyMap).find((k) => {
      const val = keyMap[k as unknown as ReactNativeKeysKeyCode] as Key | Key[];
      return Array.isArray(val) ? val.includes(key) : val === key;
    }) as unknown as ReactNativeKeysKeyCode) || null
  );
};

export const addEventListener: ReactNativeKeysEventListener = (
  eventType,
  callback,
  opts
) => {
  const internalCallback = (nativeEvent: KeyboardEvent) => {
    callback({
      altKey: nativeEvent.altKey,
      nativeEvent: nativeEvent,
      ctrlKey: nativeEvent.ctrlKey,
      key: nativeEvent.key,
      keyCode: mapKeyCode(nativeEvent.code as Key),
      metaKey: nativeEvent.metaKey,
      shiftKey: nativeEvent.shiftKey,
      getModifierState: (keyArg) => {
        switch (keyArg) {
          case KeyArg.Alt:
            return nativeEvent.altKey;
          case KeyArg.Shift:
            return nativeEvent.shiftKey;
          case KeyArg.Control:
            return nativeEvent.ctrlKey;
          case KeyArg.Meta:
            return nativeEvent.metaKey;
          default:
            return nativeEvent.getModifierState(keyArg);
        }
      },
    } as ReactNativeKeysEvent);
  };

  document.body.addEventListener(eventType, internalCallback, {
    once: opts?.once,
    passive: opts?.passive,
  });

  return {
    remove: () => {
      document.body.removeEventListener(eventType, internalCallback);
    },
  };
};
