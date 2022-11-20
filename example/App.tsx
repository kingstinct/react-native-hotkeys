import { useState} from 'react';

import { StyleSheet, View, Text, TextInput } from 'react-native';
import {  KeysProvider, ModifiersType, ReactNativeKeysKeyCode, useGlobalKeyHandler } from '@kingstinct/react-native-keys';


function App() {
  const [result, setResult] = useState<string>('');

  useGlobalKeyHandler(ReactNativeKeysKeyCode.KeyA,  (event) => {
    setResult(JSON.stringify(event))
    alert('ctrl-a')
  }, [ModifiersType.Hyper], { title: 'Testar' })

  /*useGlobalKeyHandler(ReactNativeKeysKeyCode.Escape, (event) => {
    setResult(JSON.stringify(event))
  })*/

  useGlobalKeyHandler(ReactNativeKeysKeyCode.Escape, (event) => {
    setResult(JSON.stringify(event))
    alert('escape')
  })


  useGlobalKeyHandler(ReactNativeKeysKeyCode.ArrowLeft, (event) => {
    setResult(JSON.stringify(event))
    alert('left')
  })

  // useEffect(() => {
  //   const subscription = addEventListener('keydown', event => {
  //     setResult(JSON.stringify(event))
  //   })
  //   return () => subscription.remove()
  // }, [])

  useGlobalKeyHandler(ReactNativeKeysKeyCode.Key0, (event) => {
    alert('0')
  })
  

  return (
    
      <View style={styles.container}>
        <TextInput
          style={{ width: 100, height: 20, backgroundColor: 'lightgray' }}
          
        />
        <Text style={{ color: 'black' }}>Result: {result}</Text>
      </View>
  );
}

const AppOuter = () => {
  return <KeysProvider>
    <App></App>
  </KeysProvider>
}

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
});

export default AppOuter