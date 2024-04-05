# react-native-toastee

A react-native toast notification with features like swipeable, auto dismiss, and toast positioning

<image src="./demo-crop.gif" />

## Features

- 🛠️ **Flexible setup**
- ✅ **Swipeable (Horizontal and Vertical) and auto dismiss**
- 🔝 **Toast positioning (top & bottom)**
- 💅 **Customizable**
- 🙈 **Toast shows complete message. No hidden text**

## Installation

```sh
npm install react-native-toastee
# or
yarn add react-native-toastee
```

## Peer Dependencies Installation

These library depends on [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/), [react-native-safe-area-context](https://www.npmjs.com/package/react-native-safe-area-context), and [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/docs/fundamentals/installation). Ensure you install these packages and follow their config instructions

```sh
yarn add react-native-reanimated react-native-safe-area-context react-native-gesture-handler
```

## Usage

Render the `<ToastProvider />` in the root of your app. Then, you can call the `toast()` function in any part of the app.

```js
// App.js
// ... hidden imports
import { ToastProvider, toast } from 'react-native-toastee';

export const App () => {
  const handleToast = () => {
    toast('Hello from react-native-toastee');
  };

    return (
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={styles.container}>
            <Button title="Default Toast" onPress={handleToast} />

            <ToastProvider />
          </View>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    )
}
//...
```

## API Documentation

## `<ToastProvider />`

The component should be rendered at the root of the application.

### Example usage

```js
// ...
<ToastProvider position="top" autoDismiss={5000} />
// ...
```

| Props       | Type             | Default | Description                                                   |
| ----------- | ---------------- | :-----: | ------------------------------------------------------------- |
| position    | `top` / `bottom` |  `top`  | Toast position                                                |
| autoDismiss | `number`         | `3000`  | The time at which the toast will be dismissed in milliseconds |
| style       | `ViewStyle`      |    -    | Toast Container styling                                       |
| textStyle   | `TextStyle`      |    -    | Text styling                                                  |
| zIndex      | `number`         | `1500`  | The z-index of the toast                                      |

## `toast()`

To show a toast, call the function `toast()` from anywhere in the app. Ensure the `<ToastProvider />` is already added to your app

### Example usage

#### Default

```sh
  toast('Hello from react-native-toastee');
```

#### Success

```sh
  toast('Hello from react-native-toastee', 'success');
```

#### Error

```sh
  toast('Hello from react-native-toastee', 'error');
```

## `<ToastUIView />`

To create a custom toast that is specific to a screen, you can use the `<ToastUIView />`.

### Example usage

```js
import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { ToastUIView } from 'react-native-toastee';

export const App = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleCustomToast = () => setIsVisible(!isVisible);

  return (
    <View>
      <Button title="Custom Toast" onPress={toggleCustomToast} />

      <ToastUIView
        position="top"
        autoDismiss={5000}
        message="This is a custom toast"
        onDismiss={toggleCustomToast}
        style={styles.toast}
        preset="success"
        visible={isVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  toast: {
    backgroundColor: 'white',
  },
});
```

In addition to Props in `<Toastprovider />` :

| Props     | Type                 |  Default  | Description                              |
| --------- | -------------------- | :-------: | ---------------------------------------- |
| onDismiss | `Function`           |     -     | Function is called to dismiss the toast. |
| preset    | `success` or `error` | `success` | Toast type                               |
| message   | `string`             |           | The text to render                       |
| visible   | `boolean`            |           | Toast visibility                         |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
