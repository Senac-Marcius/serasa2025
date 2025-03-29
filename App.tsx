import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React, { useState, useEffect } from 'react';
import { Provider as PaperProvider, ActivityIndicator } from 'react-native-paper';
import { Slot } from 'expo-router';
import * as Font from 'expo-font';
import { View, StyleSheet } from 'react-native';
import MyColorPicker from './src/components/MyColorPicker';
import ScheduleScreen from './app/schedules';

// Importando fontes manualmente
import {
  Poppins_400Regular,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Poppins_400Regular,
        Poppins_700Bold,
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  return (
    <PaperProvider>
      <Slot />
      <ScheduleScreen/>
    </PaperProvider>
  );
}

// Estilos para a tela de carregamento
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
