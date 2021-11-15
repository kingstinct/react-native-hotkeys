import * as React from 'react';

import { StyleSheet, View, Text, TextInput } from 'react-native';
import { addEventListener } from '../../src/index';

export default function App() {
  const [result, setResult] = React.useState<string>('');

  React.useEffect(() => {
    console.log('registering subscription');
    const subscription = addEventListener('keydown', (e: KeyboardEvent) => {
      setResult(JSON.stringify(e));
      return true;
    });

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={{ width: 100, height: 20, backgroundColor: 'lightgray' }}
      />
      <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
