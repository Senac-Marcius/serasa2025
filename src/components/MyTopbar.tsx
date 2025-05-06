import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Text, Image } from 'react-native';
import { Link, Router, useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import MyNotify from './MyNotify';
import MyMenu from './MyMenu';

interface MyTopbarProps {
  router?: Router;
  title?: string;
  onMenuToggle: () => void;
}


const MyTopbar: React.FC<MyTopbarProps> = ({ router, title }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const rout = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <View style={styles.leftGroup}>
          <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)} style={styles.iconButton}>
            <Ionicons name="menu" size={20} color="#4A148C" />
          </TouchableOpacity>
          {/*        <View style={styles.searchWrapper}>
            <Ionicons name="search" size={16} color="#888" style={styles.searchIcon} />
            <TextInput
              placeholder="Pesquisar..."
              placeholderTextColor="#888"
              style={styles.searchInput}
            />
          </View> */}
        </View>

        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons name="lightning-bolt-outline" size={20} color="#4A148C" />
          </TouchableOpacity>

          <MyNotify style={styles.iconButton} />

          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons name="cog-outline" size={20} color="#4A148C" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.avatarButton} onPress={() => {
            rout.push('/perfil');
          }}>
            <Image source={ require("../../assets/perfilIcon.png")} style={styles.avatar} />
          </TouchableOpacity>
        </View>
      </View>

      {menuOpen && <MyMenu closeMenu={() => setMenuOpen(false)} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    zIndex: 10,
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    backgroundColor: '#EDE7F6',
    padding: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 36,
    borderWidth: 1,
    borderColor: '#DDD',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  searchInput: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    minWidth: 160,
  },
  searchIcon: {
    marginTop: 1,
  },
  avatarButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    
    height: '100%',
    borderRadius: 18,
  },
});

export default MyTopbar;
//OK