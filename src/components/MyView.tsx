import React, { ReactNode } from 'react';
import { View, StyleSheet, TextStyle, ScrollView } from 'react-native';
import MyTopbar from './MyTopbar';
import MySupport from './MySupport';
import { Router } from 'expo-router';

interface MySearchProps {
  children: ReactNode;
  style?: TextStyle | TextStyle[]; // estilo externo opcional
  title?: string;
  router?: Router;
}

const MyView: React.FC<MySearchProps> = ({ children, style, title, router }) => {
  return (
    <View style={[styles.container, style]}>
      <MyTopbar router={router} title={title ?? ''} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {children}
      </ScrollView>
      <MySupport style={styles.suporteButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA', // fundo cinza claro padrão
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  suporteButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyView;
