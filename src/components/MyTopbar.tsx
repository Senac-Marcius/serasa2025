import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MyNotify from './MyNotify';
import HamburgerMenu from './MyMenu';

interface MyTopbarProps {
  title?: string;
}

const MyTopbar: React.FC<MyTopbarProps> = ({ title }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topbarPill}>
        {/* Botão de menu */}
        <HamburgerMenu />

        {/* Ícones à direita */}
        <View style={styles.rightIcons}>
          <MyNotify />
          
          {/* Ícone de perfil navegável */}
          <TouchableOpacity onPress={() => router.push('/perfil')} style={styles.iconButton}>
            <Ionicons name="person" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
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
