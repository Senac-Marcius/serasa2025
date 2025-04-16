import React, { useState } from 'react';
import {View,StyleSheet,ScrollView,Dimensions,Text,Pressable,} from 'react-native';
import { useRouter } from 'expo-router';
import {Ionicons,FontAwesome5,Feather,MaterialCommunityIcons,} from '@expo/vector-icons';

const menuItems = [
  { label: 'Cursos', icon: <Ionicons name="school-outline" size={20} color="#555" />, route: 'secretaria/courses' },
  { label: 'Disciplinas', icon: <Ionicons name="book-outline" size={20} color="#555" />, route: 'secretaria/disciplines' },
  { label: 'Biblioteca', icon: <Ionicons name="library-outline" size={20} color="#555" />, route: 'secretaria/library' },
  { label: 'Calendário', icon: <Ionicons name="calendar-outline" size={20} color="#555" />, route: 'secretaria/calendar' },
  { label: 'Documentos', icon: <Ionicons name="document-text-outline" size={20} color="#555" />, route: 'secretaria/documents' },
  { label: 'Matrícula', icon: <MaterialCommunityIcons name="clipboard-text-outline" size={20} color="#555" />, route: 'secretaria/registration' },
  { label: 'Configurações', icon: <Feather name="settings" size={20} color="#555" />, route: 'secretaria/settings' },
];

export default function SecretariaHome() {
  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState('');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const cards = [
    {
      title: 'Disciplinas',
      icon: <Ionicons name="book" size={30} color="#6C63FF" />,
      route: 'secretaria/disciplines',
      bgColor: '#F3F1FE',
      value: 12,
    },
    {
      title: 'Cursos',
      icon: <Ionicons name="school" size={30} color="#FFB703" />,
      route: 'secretaria/courses',
      bgColor: '#FFF6E5',
      value: 5,
    },
    {
      title: 'Calendário',
      icon: <Ionicons name="calendar" size={30} color="#2EC4B6" />,
      route: 'secretaria/calendar',
      bgColor: '#E5FBF8',
      value: 7,
    },
    {
      title: 'Documentos',
      icon: <Ionicons name="document-text" size={30} color="#FF5C8A" />,
      route: 'secretaria/documents',
      bgColor: '#FFEAF0',
      value: 21,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <View style={styles.logoContainer}>
          <FontAwesome5 name="chalkboard-teacher" size={30} color="#3AC7A8" />
          <Text style={styles.logoTitle}>Estudy</Text>
          <Text style={styles.logoSubtitle}>Learn From Home</Text>
        </View>

        {menuItems.map((item, index) => {
          const isActive = item.route === activeRoute;
          const isHovered = item.route === hoveredItem;

          return (
            <Pressable
              key={index}
              onHoverIn={() => setHoveredItem(item.route)}
              onHoverOut={() => setHoveredItem(null)}
              onPress={() => {
                setActiveRoute(item.route);
                router.push(item.route);
              }}
              style={[
                styles.menuItem,
                (isActive || isHovered) && styles.activeItem,
              ]}
            >
              <View style={styles.icon}>{item.icon}</View>
              <Text style={[styles.menuText, (isActive || isHovered) && styles.activeText]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Conteúdo principal */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.mainTitle}>Painel da Secretaria</Text>

        <View style={styles.cardArea}>
          {cards.map((card, index) => (
            <Pressable
              key={index}
              style={[styles.card, { backgroundColor: card.bgColor }]}
              onPress={() => router.push(card.route)}
            >
              {card.icon}
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardNumber}>{card.value}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const isLarge = Dimensions.get('window').width > 600;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F2F3F5',
  },
  sidebar: {
    width: isLarge ? 240 : 200,
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 16,
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3AC7A8',
    marginTop: 8,
  },
  logoSubtitle: {
    fontSize: 12,
    color: '#aaa',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    cursor: 'pointer',
  },
  icon: {
    marginRight: 12,
  },
  menuText: {
    fontSize: 14,
    color: '#555',
  },
  activeItem: {
    backgroundColor: '#E6F9F5',
    borderLeftWidth: 4,
    borderLeftColor: '#3AC7A8',
  },
  activeText: {
    color: '#3AC7A8',
    fontWeight: '600',
  },
  content: {
    flexGrow: 1,
    padding: 24,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
  },
  cardArea: {
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  card: {
    padding: 24,
    borderRadius: 12,
    elevation: 2,
    width: isLarge ? 250 : '100%',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  cardNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
});
