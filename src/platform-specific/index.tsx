import {
  EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
  Platform,
} from 'react-native';
import {
  ReactNativeKeysEventListener,
  EventType,
  IOSKeyboardEvent,
  KeyArg,
  UIKeyboardHIDUsage,
  ReactNativeKeysEvent,
  ReactNativeKeysKeyCode,
} from '../types';

export * from '../types';

const LINKING_ERROR =
  `The package '@kingstinct/react-native-keys' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const Keys = NativeModules.Keys
  ? NativeModules.Keys
  : new Proxy(
      {},
      {
        get() {
          console.warn(LINKING_ERROR);
        },
      }
    );

type IOSCallbackFn = (event: IOSKeyboardEvent) => void;

interface IOSEventEmitter extends NativeEventEmitter {
  addListener: (
    eventType: EventType,
    callback: IOSCallbackFn
  ) => EmitterSubscription;
}

export const EventEmitter = new NativeEventEmitter(Keys) as IOSEventEmitter;

const keyMap: Record<
  ReactNativeKeysKeyCode,
  UIKeyboardHIDUsage | UIKeyboardHIDUsage[]
> = {
  [ReactNativeKeysKeyCode.Alt]: [
    UIKeyboardHIDUsage.keyboardLeftAlt,
    UIKeyboardHIDUsage.keyboardRightAlt,
  ],
  [ReactNativeKeysKeyCode.ScrollLock]: UIKeyboardHIDUsage.keyboardScrollLock,
  [ReactNativeKeysKeyCode.Control]: [
    UIKeyboardHIDUsage.keyboardLeftControl,
    UIKeyboardHIDUsage.keyboardRightControl,
  ],
  [ReactNativeKeysKeyCode.AltGraph]: [],
  [ReactNativeKeysKeyCode.NumLock]: UIKeyboardHIDUsage.keypadNumLock,
  [ReactNativeKeysKeyCode.CapsLock]: UIKeyboardHIDUsage.keyboardCapsLock,
  [ReactNativeKeysKeyCode.Shift]: [
    UIKeyboardHIDUsage.keyboardLeftShift,
    UIKeyboardHIDUsage.keyboardRightShift,
  ],
  Meta: [],
  PrintScreen: UIKeyboardHIDUsage.keyboardPrintScreen,
  [ReactNativeKeysKeyCode.NumberPadPlus]: UIKeyboardHIDUsage.keypadPlus,
  [ReactNativeKeysKeyCode.CapsLock]: UIKeyboardHIDUsage.keyboardCapsLock,
  [ReactNativeKeysKeyCode.Escape]: UIKeyboardHIDUsage.keyboardEscape,
  // [UnifiedKeyCode.Space]: UIKeyboardHIDUsage.keyboardSpacebar,
  [ReactNativeKeysKeyCode.Delete]: UIKeyboardHIDUsage.keyboardDeleteForward,
  [ReactNativeKeysKeyCode.Backspace]:
    UIKeyboardHIDUsage.keyboardDeleteOrBackspace,
  [ReactNativeKeysKeyCode.Enter]: UIKeyboardHIDUsage.keyboardReturnOrEnter,
  [ReactNativeKeysKeyCode.Tab]: UIKeyboardHIDUsage.keyboardTab,
  [ReactNativeKeysKeyCode.PageUp]: UIKeyboardHIDUsage.keyboardPageUp,
  [ReactNativeKeysKeyCode.PageDown]: UIKeyboardHIDUsage.keyboardPageDown,
  [ReactNativeKeysKeyCode.End]: UIKeyboardHIDUsage.keyboardEnd,
  [ReactNativeKeysKeyCode.Home]: UIKeyboardHIDUsage.keyboardHome,
  [ReactNativeKeysKeyCode.ArrowLeft]: UIKeyboardHIDUsage.keyboardLeftArrow,
  [ReactNativeKeysKeyCode.ArrowUp]: UIKeyboardHIDUsage.keyboardUpArrow,
  [ReactNativeKeysKeyCode.ArrowRight]: UIKeyboardHIDUsage.keyboardRightArrow,
  [ReactNativeKeysKeyCode.ArrowDown]: UIKeyboardHIDUsage.keyboardDownArrow,
  [ReactNativeKeysKeyCode.Insert]: UIKeyboardHIDUsage.keyboardInsert,
  [ReactNativeKeysKeyCode.Help]: UIKeyboardHIDUsage.keyboardHelp,
  [ReactNativeKeysKeyCode.Mute]: UIKeyboardHIDUsage.keyboardMute,
  [ReactNativeKeysKeyCode.VolumeDown]: UIKeyboardHIDUsage.keyboardVolumeDown,
  [ReactNativeKeysKeyCode.VolumeUp]: UIKeyboardHIDUsage.keyboardVolumeUp,
  /*[UnifiedKeyCode.Comma]: UIKeyboardHIDUsage.keyboardComma,
  [UnifiedKeyCode.Period]: UIKeyboardHIDUsage.keyboardPeriod,
  [UnifiedKeyCode.Key0]: UIKeyboardHIDUsage.keyboard0,
  [UnifiedKeyCode.Key1]: UIKeyboardHIDUsage.keyboard1,
  [UnifiedKeyCode.Key2]: UIKeyboardHIDUsage.keyboard2,
  [UnifiedKeyCode.Key3]: UIKeyboardHIDUsage.keyboard3,
  [UnifiedKeyCode.Key4]: UIKeyboardHIDUsage.keyboard4,
  [UnifiedKeyCode.Key5]: UIKeyboardHIDUsage.keyboard5,
  [UnifiedKeyCode.Key6]: UIKeyboardHIDUsage.keyboard6,
  [UnifiedKeyCode.Key7]: UIKeyboardHIDUsage.keyboard7,
  [UnifiedKeyCode.Key8]: UIKeyboardHIDUsage.keyboard8,
  [UnifiedKeyCode.Key9]: UIKeyboardHIDUsage.keyboard9,
  [UnifiedKeyCode.KeyA]: UIKeyboardHIDUsage.keyboardA,
  [UnifiedKeyCode.KeyB]: UIKeyboardHIDUsage.keyboardB,
  [UnifiedKeyCode.KeyC]: UIKeyboardHIDUsage.keyboardC,
  [UnifiedKeyCode.KeyD]: UIKeyboardHIDUsage.keyboardD,
  [UnifiedKeyCode.KeyE]: UIKeyboardHIDUsage.keyboardE,
  [UnifiedKeyCode.KeyF]: UIKeyboardHIDUsage.keyboardF,
  [UnifiedKeyCode.KeyG]: UIKeyboardHIDUsage.keyboardG,
  [UnifiedKeyCode.KeyH]: UIKeyboardHIDUsage.keyboardH,
  [UnifiedKeyCode.KeyI]: UIKeyboardHIDUsage.keyboardI,
  [UnifiedKeyCode.KeyJ]: UIKeyboardHIDUsage.keyboardJ,
  [UnifiedKeyCode.KeyK]: UIKeyboardHIDUsage.keyboardK,
  [UnifiedKeyCode.KeyL]: UIKeyboardHIDUsage.keyboardL,
  [UnifiedKeyCode.KeyM]: UIKeyboardHIDUsage.keyboardM,
  [UnifiedKeyCode.KeyN]: UIKeyboardHIDUsage.keyboardN,
  [UnifiedKeyCode.KeyO]: UIKeyboardHIDUsage.keyboardO,
  [UnifiedKeyCode.KeyP]: UIKeyboardHIDUsage.keyboardP,
  [UnifiedKeyCode.KeyQ]: UIKeyboardHIDUsage.keyboardQ,
  [UnifiedKeyCode.KeyR]: UIKeyboardHIDUsage.keyboardR,
  [UnifiedKeyCode.KeyS]: UIKeyboardHIDUsage.keyboardS,
  [UnifiedKeyCode.KeyT]: UIKeyboardHIDUsage.keyboardT,
  [UnifiedKeyCode.KeyU]: UIKeyboardHIDUsage.keyboardU,
  [UnifiedKeyCode.KeyV]: UIKeyboardHIDUsage.keyboardV,
  [UnifiedKeyCode.KeyW]: UIKeyboardHIDUsage.keyboardW,
  [UnifiedKeyCode.KeyX]: UIKeyboardHIDUsage.keyboardX,
  [UnifiedKeyCode.KeyY]: UIKeyboardHIDUsage.keyboardY,
  [UnifiedKeyCode.KeyZ]: UIKeyboardHIDUsage.keyboardZ,*/
  [ReactNativeKeysKeyCode.Pause]: UIKeyboardHIDUsage.keyboardPause,
  [ReactNativeKeysKeyCode.F1]: UIKeyboardHIDUsage.keyboardF1,
  [ReactNativeKeysKeyCode.F2]: UIKeyboardHIDUsage.keyboardF2,
  [ReactNativeKeysKeyCode.F3]: UIKeyboardHIDUsage.keyboardF3,
  [ReactNativeKeysKeyCode.F4]: UIKeyboardHIDUsage.keyboardF4,
  [ReactNativeKeysKeyCode.F5]: UIKeyboardHIDUsage.keyboardF5,
  [ReactNativeKeysKeyCode.F6]: UIKeyboardHIDUsage.keyboardF6,
  [ReactNativeKeysKeyCode.F7]: UIKeyboardHIDUsage.keyboardF7,
  [ReactNativeKeysKeyCode.F8]: UIKeyboardHIDUsage.keyboardF8,
  [ReactNativeKeysKeyCode.F9]: UIKeyboardHIDUsage.keyboardF9,
  [ReactNativeKeysKeyCode.F10]: UIKeyboardHIDUsage.keyboardF10,
  [ReactNativeKeysKeyCode.F11]: UIKeyboardHIDUsage.keyboardF11,
  [ReactNativeKeysKeyCode.F12]: UIKeyboardHIDUsage.keyboardF12,
  [ReactNativeKeysKeyCode.F13]: UIKeyboardHIDUsage.keyboardF13,
  [ReactNativeKeysKeyCode.F14]: UIKeyboardHIDUsage.keyboardF14,
  [ReactNativeKeysKeyCode.F15]: UIKeyboardHIDUsage.keyboardF15,
  [ReactNativeKeysKeyCode.F16]: UIKeyboardHIDUsage.keyboardF16,
  [ReactNativeKeysKeyCode.F17]: UIKeyboardHIDUsage.keyboardF17,
  [ReactNativeKeysKeyCode.F18]: UIKeyboardHIDUsage.keyboardF18,
  [ReactNativeKeysKeyCode.F19]: UIKeyboardHIDUsage.keyboardF19,
  [ReactNativeKeysKeyCode.F20]: UIKeyboardHIDUsage.keyboardF20,
  [ReactNativeKeysKeyCode.Find]: UIKeyboardHIDUsage.keyboardFind,
  [ReactNativeKeysKeyCode.Redo]: UIKeyboardHIDUsage.keyboardAgain,
  [ReactNativeKeysKeyCode.Stop]: UIKeyboardHIDUsage.keyboardStop,
  [ReactNativeKeysKeyCode.Cut]: UIKeyboardHIDUsage.keyboardCut,
  [ReactNativeKeysKeyCode.Paste]: UIKeyboardHIDUsage.keyboardPaste,
  [ReactNativeKeysKeyCode.Undo]: UIKeyboardHIDUsage.keyboardUndo,
  [ReactNativeKeysKeyCode.Copy]: UIKeyboardHIDUsage.keyboardCopy,
  [ReactNativeKeysKeyCode.CapsLock]: UIKeyboardHIDUsage.keyboardCapsLock,
};

const mapKeyCode = (
  key?: UIKeyboardHIDUsage
): ReactNativeKeysKeyCode | null => {
  return (
    (Object.keys(keyMap).find((k) => {
      const val = keyMap[k as unknown as ReactNativeKeysKeyCode] as
        | UIKeyboardHIDUsage
        | UIKeyboardHIDUsage[];
      return Array.isArray(val) && key ? val.includes(key) : val === key;
    }) as unknown as ReactNativeKeysKeyCode) || null
  );
};

export const addEventListener: ReactNativeKeysEventListener = (
  eventType,
  callback,
  opts
) => {
  const subscription = EventEmitter.addListener(eventType, (nativeEvent) => {
    const { modifierFlags, characters, keyCode } = nativeEvent.presses[0] || {};
    if (modifierFlags) {
      const getModifierState: ReactNativeKeysEvent['getModifierState'] = (
        key
      ) => {
        switch (key) {
          case KeyArg.Alt:
            return modifierFlags.alternate;
          case KeyArg.Meta:
            return modifierFlags.command;
          case KeyArg.Control:
            return modifierFlags.control;
          case KeyArg.Shift:
            return modifierFlags.shift;
          case KeyArg.CapsLock:
            return modifierFlags.alphaShift;
          default:
            return false;
        }
      };

      if (opts?.once) {
        subscription.remove();
      }

      callback({
        altKey: modifierFlags.alternate,
        ctrlKey: modifierFlags.control,
        metaKey: modifierFlags.command,
        shiftKey: modifierFlags.shift,
        getModifierState,
        key: characters,
        nativeEvent: nativeEvent,
        keyCode: mapKeyCode(keyCode),
      });
    }
  });

  return {
    remove: () => subscription.remove(),
  };
};
