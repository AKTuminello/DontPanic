import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <AppNavigator />
        </View>
      </NavigationContainer>
    </PaperProvider>
  );
}
