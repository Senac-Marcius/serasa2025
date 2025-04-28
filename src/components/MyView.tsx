import React, { ReactNode, useState } from 'react';
import { View, StyleSheet, TextStyle, ScrollView } from 'react-native';
import MyTopbar from './MyTopbar';
import MySupport from './MySupport';
import { Router } from 'expo-router';
import MyAccessibility from './MyAccessibility';
import { ScrollView } from 'react-native-gesture-handler';

interface MySearchProps {
  children: ReactNode;
  style?: TextStyle | TextStyle[];
  title?: string;
  router?: Router;
}

const MyView: React.FC<MySearchProps> = ({ children, style, title, router }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View style={[styles.container, style]}>
      <MyTopbar router={router} title={title ?? ''} />
      <View style={styles.scrollContainer}>000
        
          <ScrollView>
        {children}
        </ScrollView>
      </View>
      <MySupport style={styles.suporteButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F3F5', // fundo cinza claro para todas as telas
  },
  containerButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
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
