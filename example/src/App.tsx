import * as React from 'react';

import { StyleSheet, View, Button, Switch, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider, toast, ToastUIView } from 'react-native-toastify';

export default function App() {
  const [isTopPosition, setIsTopPosition] = React.useState(true);
  const [isVisible, setIsVisible] = React.useState(false);

  const handleToast = () => {
    toast('Hello from react-native-toastify');
  };
  const handleSuccessToast = () =>
    toast('Hello from react-native-toastify', 'success');

  const handleFailedToast = () =>
    toast('Hello from react-native-toastify', 'error');

  const toggleCustomToast = () => setIsVisible(!isVisible);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.position}>
            <Text>Top Position: </Text>
            <Switch
              trackColor={{ false: '#393939', true: '#00AD50' }}
              thumbColor="#fff"
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setIsTopPosition(!isTopPosition)}
              value={isTopPosition}
            />
          </View>
          <Button title="Default Toast" onPress={handleToast} />
          <Button title="Success Toast" onPress={handleSuccessToast} />
          <Button title="Error Toast" onPress={handleFailedToast} />
          <Button title="Custom Toast" onPress={toggleCustomToast} />
        </View>

        {/* TOASTS */}
        <ToastProvider position={isTopPosition ? 'top' : 'bottom'} />
        <ToastUIView
          position="top"
          autoDismiss={5000}
          message="This is a custom toast"
          onDismiss={toggleCustomToast}
          style={{ backgroundColor: 'white' }}
          preset="success"
          visible={isVisible}
        />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  position: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    marginBottom: 15,
  },
});
