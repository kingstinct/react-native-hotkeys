import {
  EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
  Platform,
} from 'react-native';
import {
  AddKeyEventListener,
  EventType,
  IOSKeyboardEvent,
  KeyArg,
  UnifiedKeyboardEvent,
} from './types';

const LINKING_ERROR =
  `The package 'react-native-keys' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const Keys = NativeModules.Keys
  ? NativeModules.Keys
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
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

export const addEventListener: AddKeyEventListener = (
  eventType,
  callback,
  opts
) => {
  const subscription = EventEmitter.addListener(eventType, (nativeEvent) => {
    const { modifierFlags, characters } = nativeEvent.presses[0] || {};
    if (modifierFlags) {
      const getModifierState: UnifiedKeyboardEvent['getModifierState'] = (
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
      });
    }
  });

  return {
    remove: () => subscription.remove(),
  };
};
