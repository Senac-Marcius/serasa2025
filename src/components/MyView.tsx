import React, { ReactNode } from 'react';
import { View, StyleSheet, TextStyle } from 'react-native';
import MyTopbar from './MyTopbar';
import MySupport from './MySupport';
import MyAccessibility from './MyAccessibility';
import { Router } from 'expo-router'; // Importando o Router do expo-router

interface MySearchProps {
  children: ReactNode;
  style?: TextStyle | TextStyle[];
  title?: string;
  router?: Router; // <- agora é opcional
}


const MyView: React.FC<MySearchProps> = ({ children, style, title, router }) => {
  return (
    <View style={[styles.container, style]}>
      <MyTopbar router={router} title={title ?? ''} />
      <View style={styles.scrollContainer}>
        {children}
      </View>

      <View style={styles.containerButton}>
        <MySupport />
        <MyAccessibility > </MyAccessibility >
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    position: 'relative',
    backgroundColor: '#F4F4F4',
  },
  containerButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  
  scrollContainer: {
    flex: 1, 
    paddingHorizontal: 16,
  },
  
  
});

export default MyView;
