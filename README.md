# react-native-hotkeys

React Native module to enable listening to and capturing hotkeys. Currently with support for iOS (tested on iPad and M1 Macs) and web.

# API documentation

- [Documentation for the main branch](https://github.com/expo/expo/blob/main/docs/pages/versions/unversioned/sdk/react-native-hotkeys.md)
- [Documentation for the latest stable release](https://docs.expo.dev/versions/latest/sdk/react-native-hotkeys/)

# Installation in managed Expo projects

For [managed](https://docs.expo.dev/versions/latest/introduction/managed-vs-bare/) Expo projects, please follow the installation instructions in the [API documentation for the latest stable release](#api-documentation). If you follow the link and there is no documentation available then this library is not yet usable within managed projects &mdash; it is likely to be included in an upcoming Expo SDK release.

# Installation in bare React Native projects

For bare React Native projects, you must ensure that you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before continuing.

### Add the package to your npm dependencies

```
npm install react-native-hotkeys
```

or 

```
yarn add react-native-hotkeys
```

### Configure for iOS

Run `npx pod-install` after installing the npm package.

# Usage

Start by wrapping your app in the KeysProvider:
```TypeScript
import {
  KeysProvider
} from 'react-native-hotkeys'

const App = () => {
  return (
    <KeysProvider>
      <YourApp />
    </KeysProvider>
  )
}
```

The easiest way to use it is with the useHotkey Hook:
```TypeScript
import {
  ModifiersType, ReactNativeKeysKeyCode, useHotkey,
} from 'react-native-hotkeys'

// use the useHotkey hook anywhere
useHotkey(ReactNativeKeysKeyCode.Escape, (event) => {
  // do something
})

useHotkey(ReactNativeKeysKeyCode.ArrowLeft, (event) => {
  // move player to the left
})

// use modifiers
useHotkey(ReactNativeKeysKeyCode.ArrowLeft, (event) => {
  // do something different
}, { modifiers: ModifiersType.Shift })

// return true to indicate that the event was handled (and priority to override priority for nestled handlers)
useHotkey(ReactNativeKeysKeyCode.ArrowLeft, (event) => {
  return true
}, { priority: 10 })
```

Optionally you can directly use addEventListener:
```TypeScript
addEventListener(ReactNativeKeysKeyCode.Escape, (event) => {
  // do something
})
```

# Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide]( https://github.com/expo/expo#contributing).
