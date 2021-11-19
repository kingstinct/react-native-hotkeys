![npm](https://img.shields.io/npm/v/@kingstinct/react-native-keys)

# @kingstinct/react-native-keys

Cross-platform handling of key events

## Installation

```sh
npm install @kingstinct/react-native-keys
```

If using eas build add "@kingstinct/react-native-keys" to the plugins array in your expo.json.

## Usage

```js
import { addEventListener } from "@kingstinct/react-native-keys";

// ...

useEffect(() => {
    const subscription = addEventListener(
        'keydown',
        (e: UnifiedKeyboardEvent) => {
            console.log('e', e.nativeEvent) // native web or ios event
            alert(e.key); // 'A'
        }
    );

    return () => {
        subscription.remove();
    };
}, []);
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
