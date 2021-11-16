import { AddKeyEventListener, KeyArg } from './types';

export const addEventListener: AddKeyEventListener = (
  eventType,
  callback,
  { once /*, passive*/ }
) => {
  const internalCallback = (nativeEvent: KeyboardEvent) => {
    callback({
      altKey: nativeEvent.altKey,
      nativeEvent: nativeEvent,
      ctrlKey: nativeEvent.ctrlKey,
      key: nativeEvent.key,
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
    });
  };

  document.body.addEventListener(eventType, internalCallback, {
    once,
  });

  return {
    remove: () => {
      document.body.removeEventListener(eventType, internalCallback);
    },
  };
};
