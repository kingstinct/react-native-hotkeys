import {
  EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
  Platform,
} from 'react-native';
import type { AddKeyEventListener, CallbackFn, EventType } from './types';

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

interface IOSEventEmitter extends NativeEventEmitter {
  addListener: (
    eventType: EventType,
    callback: CallbackFn
  ) => EmitterSubscription;
}

export const EventEmitter = new NativeEventEmitter(Keys) as IOSEventEmitter;

export const addEventListener: AddKeyEventListener = (eventType, callback) => {
  const subscription = EventEmitter.addListener(eventType, callback);

  return subscription;
};
