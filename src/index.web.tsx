import type { AddKeyEventListener } from './types';

export const addEventListener: AddKeyEventListener = (eventType, callback) => {
  document.body.addEventListener(eventType, callback, {
    capture: true,
  });

  return {
    remove: () => {
      document.body.removeEventListener(eventType, callback);
    },
  };
};
