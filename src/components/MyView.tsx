import React, { ReactNode } from 'react';
import { View, StyleSheet, TextStyle } from 'react-native';
import MyTopbar from './MyTopbar';
import MySupport from './MySupport';
import { Router } from 'expo-router';
import MyAccessibility from './MyAccessibility';
import { ScrollView } from 'react-native-gesture-handler';

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
    position: 'relative',
    backgroundColor: '#F4F4F4',
  },
  scrollContainer: {
    flex: 1, 
    paddingHorizontal: 16,
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
