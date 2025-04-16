import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, FontAwesome5, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const menuItems = [
  { label: 'Dashboard', icon: <Ionicons name="grid-outline" size={20} color="#555" />, route: '/dashboard' },
  { label: 'Cursos', icon: <Ionicons name="book-outline" size={20} color="#555" />, route: '/courses' },
  { label: 'Alunos', icon: <Ionicons name="person-outline" size={20} color="#555" />, route: '/students' },
  { label: 'Transações', icon: <Ionicons name="card-outline" size={20} color="#555" />, route: '/transactions' },
  { label: 'Chat', icon: <Ionicons name="chatbubble-ellipses-outline" size={20} color="#555" />, route: '/chat' },
  { label: 'Horários', icon: <Ionicons name="calendar-outline" size={20} color="#555" />, route: '/calendar' },
  { label: 'Aulas Ao Vivo', icon: <MaterialCommunityIcons name="video-outline" size={20} color="#555" />, route: '/live' },
  { label: 'Configurações', icon: <Feather name="settings" size={20} color="#555" />, route: '/settings' },
];

export default function SecretariaHome() {
  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState('/students');

  const cards = [
    {
      title: 'Disciplinas',
      icon: <Ionicons name="book" size={30} color="#6C63FF" />,
      route: '/disciplines',
      bgColor: '#F3F1FE',
    },
    {
      title: 'Cursos',
      icon: <Ionicons name="school" size={30} color="#FFB703" />,
      route: '/courses',
      bgColor: '#FFF6E5',
    },
    {
      title: 'Calendário',
      icon: <Ionicons name="calendar" size={30} color="#2EC4B6" />,
      route: '/calendar',
      bgColor: '#E5FBF8',
    },
    {
      title: 'Documentos',
      icon: <Ionicons name="document-text" size={30} color="#FF5C8A" />,
      route: '/documents',
      bgColor: '#FFEAF0',
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
          return (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, isActive && styles.activeItem].filter(Boolean)}
              onPress={() => {
                setActiveRoute(item.route);
                router.push(item.route);
              }}
            >
              <View style={styles.icon}>{item.icon}</View>
              <Text style={[styles.menuText, isActive && styles.activeText].filter(Boolean)}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Conteúdo principal */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.mainTitle}>Painel da Secretaria</Text>
        <View style={styles.cardArea}>
          {cards.map((card, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.card, { backgroundColor: card.bgColor }]}
              onPress={() => router.push(card.route)}
            >
              {card.icon}
              <Text style={styles.cardTitle}>{card.title}</Text>
            </TouchableOpacity>
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
    backgroundColor: '#F9FAFC',
  },
  sidebar: {
    width: isLarge ? 240 : 200,
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 16,
    borderRightWidth: 1,
    borderRightColor: '#eee',
    justifyContent: 'flex-start',
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
    marginBottom: 20,
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
    gap: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
