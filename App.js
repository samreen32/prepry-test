import * as React from 'react';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './MainStack/AppStack';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </PaperProvider>
  );
}