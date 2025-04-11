import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Link, Router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MyNotify from './MyNotify';
import MyMenu from './MyMenu';

interface MyTopbarProps {
  router?: Router;
  title?: string;
}

const MyTopbar: React.FC<MyTopbarProps> = ({ router }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.topbarPill}>
        <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)} style={styles.iconButton}>
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.rightIcons}>
          <MyNotify />
          <Link href="/perfil" asChild>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="person" size={20} color="#fff" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      {menuOpen && <MyMenu closeMenu={() => setMenuOpen(false)} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,       
    padding: 0,      
    zIndex: 2,
  },
  topbarPill: {
    marginHorizontal: 16, 
    marginTop: 16,        
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
