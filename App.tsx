import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Slot } from 'expo-router';

export default function App() {
  return (
    <PaperProvider>
      <Slot />
    </PaperProvider>
  );
}
