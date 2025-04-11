import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');
const MENU_WIDTH = 280;

interface HamburgerMenuProps {
  closeMenu: () => void;
}

export default function HamburgerMenu({ closeMenu }: HamburgerMenuProps) {
  const router = useRouter();
  const slideAnim = useState(new Animated.Value(-MENU_WIDTH))[0];

  // Animação de entrada do menu
  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, []);

  const MenuItem = ({
    label,
    route,
    icon,
  }: {
    label: string;
    route: string;
    icon: keyof typeof Ionicons.glyphMap;
  }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => {
        router.push(`/${route}`);
        closeMenu();
      }}
    >
      <Ionicons name={icon} size={20} color="#FFF" style={{ marginRight: 8 }} />
      <Text style={styles.menuText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <Animated.View
      style={[styles.menu, { height, transform: [{ translateX: slideAnim }] }]}
    >
      <View style={styles.menuHeader}>
        <TouchableOpacity onPress={closeMenu}>
          <Ionicons name="close" size={26} color="#FFF" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.profileSection}>
        <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.profileImage} />
        <View>
          <Text style={styles.profileName}>Usuário</Text>
          <Text style={styles.profileRole}>Admin</Text>
        </View>
      </TouchableOpacity>

      <ScrollView style={styles.scroll}>
        <MenuItem label="Budgets" route="budgets" icon="wallet" />
        <MenuItem label="Calendar" route="calendar" icon="calendar" />
        <MenuItem label="Categories" route="categories" icon="albums" />
        <MenuItem label="Classes" route="classes" icon="school" />
        <MenuItem label="Collections" route="collections" icon="cube" />
        <MenuItem label="Courses" route="courses" icon="book" />
        <MenuItem label="Disciplines" route="disciplines" icon="document-text" />
        <MenuItem label="Documents" route="documents" icon="document" />
        <MenuItem label="Employees" route="employees" icon="people" />
        <MenuItem label="Expenses" route="expenses" icon="cash" />
        <MenuItem label="Investments" route="investments" icon="trending-up" />
        <MenuItem label="Items" route="items" icon="pricetag" />
        <MenuItem label="Launchs" route="launchs" icon="rocket" />
        <MenuItem label="Levels" route="levels" icon="stats-chart" />
        <MenuItem label="Libraie" route="libraie" icon="book" />
        <MenuItem label="Loans" route="loans" icon="card" />
        <MenuItem label="Locals" route="locals" icon="location" />
        <MenuItem label="Notifications" route="notifications" icon="notifications" />
        <MenuItem label="Parents" route="Parents" icon="people-circle" />
        <MenuItem label="Perfil" route="perfil" icon="person" />
        <MenuItem label="Positions" route="positions" icon="pin" />
        <MenuItem label="Posts" route="posts" icon="chatbox" />
        <MenuItem label="Products" route="products" icon="cart" />
        <MenuItem label="Projects" route="projects" icon="briefcase" />
        <MenuItem label="Records" route="records" icon="document-text-outline" />
        <MenuItem label="Revenues" route="revenues" icon="cash-outline" />
        <MenuItem label="Scales" route="scales" icon="speedometer" />
        <MenuItem label="Timelines" route="timelines" icon="calendar" />
        <MenuItem label="Students" route="students" icon="school" />
        <MenuItem label="Users" route="users" icon="person-circle" />
        <MenuItem label="More" route="more" icon="add-circle" />
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: MENU_WIDTH,
    backgroundColor: '#5A2D82',
    zIndex: 999,
  },
  scroll: {
    paddingHorizontal: 10,
  },
  menuHeader: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'flex-end',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#FFF',
    backgroundColor: '#FFF',
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  profileRole: {
    fontSize: 14,
    color: '#DDD',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingRight: 10,
  },
  menuText: {
    fontSize: 18,
    color: '#FFF',
  },
});
