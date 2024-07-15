import * as React from 'react';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './MainStack/AppStack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthProvider from './frontend/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider>
          <NavigationContainer>
            <AppStack />
          </NavigationContainer>
        </PaperProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}