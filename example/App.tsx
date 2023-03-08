import React, { useState } from 'react'
import {
  KeysProvider, ModifiersType, ReactNativeKeysKeyCode, useHotkey,
} from 'react-native-hotkeys'
import {
  StyleSheet, View, Text, TextInput,
} from 'react-native'

function App() {
  const [result, setResult] = useState<string>('')

  useHotkey(ReactNativeKeysKeyCode.KeyA, (event) => {
    setResult(JSON.stringify(event))
    alert('ctrl-a')
  }, { title: 'Testar', modifiers: [ModifiersType.Control] })

  /* useHotkey(ReactNativeKeysKeyCode.Escape, (event) => {
    setResult(JSON.stringify(event))
  }) */

  useHotkey(ReactNativeKeysKeyCode.Escape, (event) => {
    setResult(JSON.stringify(event))
    alert('escape')
  })

  useHotkey(ReactNativeKeysKeyCode.ArrowLeft, (event) => {
    setResult(JSON.stringify(event))
    alert('left')
  })

  // useEffect(() => {
  //   const subscription = addEventListener('keydown', event => {
  //     setResult(JSON.stringify(event))
  //   })
  //   return () => subscription.remove()
  // }, [])

  useHotkey(ReactNativeKeysKeyCode.Key0, (event) => {
    alert('0')
  })

  return (

    <View style={styles.container}>
      <TextInput
        accessibilityLabel='Text input field'
        style={{ width: 100, height: 20, backgroundColor: 'lightgray' }}

      />
      <Text style={{ color: 'black' }}>
        Result:
        {result}
      </Text>
    </View>
  )
}

const AppOuter = () => (
  <KeysProvider>
    <App />
  </KeysProvider>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
})

export default AppOuter
