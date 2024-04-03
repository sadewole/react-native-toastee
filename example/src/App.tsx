import * as React from 'react';

import { StyleSheet, View, Button, Switch, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider, toast } from 'react-native-toastify';

export default function App() {
  const [isTopPosition, setIsTopPosition] = React.useState(true);
  const handleToast = () => {
    toast('Hello from react-native-toastify');
  };
  const handleSuccessToast = () =>
    toast('Hello from react-native-toastify', 'success');

  const handleFailedToast = () =>
    toast('Hello from react-native-toastify', 'failure');

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
            <Text>Top Position: </Text>
            <Switch
              trackColor={{ false: '#393939', true: '#00AD50' }}
              thumbColor="#fff"
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setIsTopPosition(!isTopPosition)}
              value={isTopPosition}
            />
          </View>
          <Button title="Default toast" onPress={handleToast} />
          <Button title="Success toast" onPress={handleSuccessToast} />
          <Button title="Error toast" onPress={handleFailedToast} />
        </View>
        <ToastProvider position={isTopPosition ? 'top' : 'bottom'} />
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
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
