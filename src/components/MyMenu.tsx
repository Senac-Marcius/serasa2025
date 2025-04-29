import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
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
  }) => {
    const isHovered = hoveredItem === route;
    return (
      <Pressable
        onPress={() => {
          router.push(`/${route}`);
          closeMenu();
        }}
        onHoverIn={() => setHoveredItem(route)}
        onHoverOut={() => setHoveredItem(null)}
        style={[styles.menuItem, isHovered && styles.menuItemHover]}
      >
        <View style={[styles.hoverBar, isHovered && styles.hoverBarActive]} />
        <Ionicons name={icon} size={20} color={isHovered ? '#6A1B9A' : '#666'} style={{ marginRight: 12 }} />
        <Text style={[styles.menuText, isHovered && styles.menuTextHover]}>{label}</Text>
      </Pressable>
    );
  };

  return (
    <Animated.View
      style={[
        styles.menu,
        {
          transform: [{ translateX: slideAnim }],
        },
      ]}
    >
      <View style={styles.menuHeader}>
        <Pressable onPress={closeMenu}>
          <Ionicons name="close" size={26} color="#4A148C" />
        </Pressable>
      </View>

      <Pressable style={styles.profileSection}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=1' }}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.profileName}>Sung Jin-Woo</Text>
          <Text style={styles.profileRole}>Administrador</Text>
        </View>
      </Pressable>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <MenuItem label="Administração" route="Administracao/" icon="people" />
        <MenuItem label="Financeiro" route="finance" icon="people" />
        <MenuItem label="Secretaria" route="secretaria" icon="add-circle" />
        <MenuItem label="Classes" route="classes" icon="school" />
        <MenuItem label="Collections" route="collections" icon="cube" />
        <MenuItem label="Launchs" route="launchs" icon="rocket" />
        <MenuItem label="Levels" route="levels" icon="stats-chart" />
        <MenuItem label="Librarie" route="librarie" icon="book" />
        <MenuItem label="Loans" route="loans" icon="card" />
        <MenuItem label="Perfil" route="perfil" icon="person" />
        <MenuItem label="Posts" route="posts" icon="chatbox" />
        <MenuItem label="Infraestrutura" route="infraestrutura" icon="cube-outline"/>
        <MenuItem label="Projects" route="projects" icon="briefcase" />
        <MenuItem label="Records" route="records" icon="document-text-outline"/>
        <MenuItem label="Revenues" route="revenues" icon="cash-outline" />
        <MenuItem label="Timelines" route="timelines" icon="calendar" />
        <MenuItem label="Students" route="students" icon="school" />
        <MenuItem label="Users" route="registeredUsers" icon="person-circle" />
        <MenuItem label="More" route="more" icon="add-circle" />
        <MenuItem label="Trabalhe Conosco" route='Administracao/employees?view=form'  icon="cash" />
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
    height: height,
    backgroundColor: '#FFFFFF',
    zIndex: 9999,
    elevation: 20,
    paddingTop: 16,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  menuHeader: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'flex-end',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#4A148C',
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  profileRole: {
    fontSize: 13,
    color: '#777',
  },
  scrollContainer: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 4,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  menuItemHover: {
    backgroundColor: '#F3E5F5',
  },
  hoverBar: {
    position: 'absolute',
    left: 0,
    height: '100%',
    width: 4,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: 'transparent',
  },
  hoverBarActive: {
    backgroundColor: '#6A1B9A',
  },
  menuText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  menuTextHover: {
    color: '#6A1B9A',
    fontWeight: '600',
  },
});