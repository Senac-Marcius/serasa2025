import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MyNotify from './MyNotify';
import MyMenu from './MyMenu';
import { Router } from 'expo-router';
interface MySearchProps { 
  title?: string;  
  router?: Router;
}
const MyTopbar: React.FC< MySearchProps > = ({title, router}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.topbarPill}>
        {/* Botão de menu */}
        <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)} style={styles.iconButton}>
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Ícones à direita */}
        <View style={styles.rightIcons}>
          <MyNotify />
          <Link href="/perfil" asChild>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="person" size={20} color="#fff" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      {/* Renderiza o menu somente quando aberto */}
      {menuOpen && <MyMenu closeMenu={() => setMenuOpen(false)} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    zIndex: 2,
  },
  topbarPill: {
    backgroundColor: '#f1f1f1',
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#9C27B0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 3,
  },
  iconButton: {
    backgroundColor: '#6A1B9A',
    padding: 10,
    borderRadius: 30,
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MyTopbar;
