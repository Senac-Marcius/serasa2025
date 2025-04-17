import React, { ReactNode, useState } from 'react';
import { View, StyleSheet, TextStyle, ScrollView } from 'react-native';
import MyTopbar from './MyTopbar';
import MySupport from './MySupport';
import MyAccessibility from './MyAccessibility';
import { Router } from 'expo-router'; // Importando o Router do expo-router
import MyMenu from './MyMenu';

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
      {/* Topbar recebe o controle do menu */}
      <MyTopbar router={router} title={title ?? ''} onMenuToggle={() => setMenuOpen(!menuOpen)} />

      {/* Conteúdo da tela */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {children}
      </ScrollView>

      {/* Botão de suporte fixo */}
      <MySupport />

      {/* Menu lateral colado na esquerda */}
      {menuOpen && <MyMenu closeMenu={() => setMenuOpen(false)} />}
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
