import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable, Dimensions,} from 'react-native';
import { Ionicons,  MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getProjects } from '../../src/controllers/projects';
import { getEmployees } from '../../src/controllers/employees';
import { getCargo} from '../../src/controllers/positions';
import { getScale } from '../../src/controllers/scales';
import MyView from '../../src/components/MyView';


interface Evento {
  id: number;
  nome: string;
  data: string;
}

const menuItems = [
  { label: 'Funcionários', icon: <Ionicons name="people-circle-outline" size={20} color="#555" />, route: 'adminsitration/employees?view=table' },
  { label: 'Cargos', icon: <Ionicons name="book-outline" size={20} color="#555" />, route: 'adminsitration/positions' },
  { label: 'Escala', icon: <Ionicons name="library-outline" size={20} color="#555" />, route: 'adminsitration/scales' },
  { label: 'Projetos', icon: <Ionicons name="calendar-outline" size={20} color="#555" />, route: 'adminsitration/projects' },
  { label: 'Banco de Taletos', icon: <Ionicons name="document-text-outline" size={20} color="#555" />, route: 'adminsitration/employees?view=form' },
  { label: 'Vagas', icon: <MaterialCommunityIcons name="clipboard-text-outline" size={20} color="#555" />, route: 'adminsitration/positions' },
];



export default function IndexScreen() {
  const [projectCount, setProjectCount] = useState(0);
  const [employeesCount, setEmployeesCount] = useState(0);
  const [positionsCount , setPositionsCount] = useState(0);
  const [scalesCount, setScalesCount] = useState(0);

  useEffect(() => {
    async function fetchProjects() {
      const result = await getProjects({});
      if (result.status && Array.isArray(result.data)) {
        setProjectCount(result.data.length);
      } else {
        setProjectCount(0);
      }
    }
    async function fetchEmployes() {
      const result = await getEmployees({});
      if (result.status && Array.isArray(result.data)) {
        setEmployeesCount(result.data.length);
      } else {
        setEmployeesCount(0);
      }  
    }
    async function fetchPositions() {
      const result = await getCargo({});
      if (result.status && Array.isArray(result.data)) {
        setPositionsCount(result.data.length);
      } else {
        setPositionsCount(0);
        console.warn("Resposta inesperada de getProjects:", result.data);
      }
    }
    async function fetchScales() {
      const result = await getScale({});
      if (result.status && Array.isArray(result.data)) {
        setScalesCount(result.data.length);
      } else {
        setScalesCount(0);
        console.warn("Resposta inesperada de getProjects:", result.data);
      }
    }
    fetchScales();
    fetchPositions();
    fetchEmployes();
    fetchProjects();
  }, []);
  const cards = [
    {
      title: 'Meus Dados',
      icon: <Ionicons name="reader" size={30} color="#6C63FF" />,
      route: 'adminsitration/employees',
      bgColor: '#F3F1FE',
    },
    {
      title: 'Minha Escala',
      icon: <Ionicons name="document-text" size={30} color="#FF5C8A" />,
      route: 'adminsitration/scales',
      bgColor: '#FFEAF0',
    },
    {
      title: 'Projetos',
      icon: <Ionicons name="calendar" size={30} color="#2EC4B6" />,
      route: 'adminsitration/projects',
      bgColor: '#E5FBF8',
      value: projectCount,
    },
    {
      title: 'Funcionários',
      icon: <Ionicons name="reader" size={30} color="#6C63FF" />,
      route: 'adminsitration/employees',
      bgColor: '#F3F1FE',
      value: employeesCount,
    },
    {
      title: 'Cargos',
      icon: <Ionicons name="calendar" size={30} color="#2EC4B6" />,
      route: 'adminsitration/positions',
      bgColor: '#E5FBF8',
      value: positionsCount,
    },
    {
      title: 'Escalas',
      icon: <Ionicons name="document-text" size={30} color="#FF5C8A" />,
      route: 'adminsitration/scales',
      bgColor: '#FFEAF0',
      value: scalesCount,
    },
  ];
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoTitle}>Administração</Text>
        </View>

        {menuItems.map((item, index) => {
          const isHovered = hoveredItem === item.route;
          return (
            <Pressable
              key={index}
              onHoverIn={() => setHoveredItem(item.route)}
              onHoverOut={() => setHoveredItem(null)}
              onPress={() => router.push(item.route)}
              style={[styles.menuItem, isHovered && styles.activeItem]}
            >
              <View style={styles.icon}>{item.icon}</View>
              <Text style={[styles.menuText, isHovered && styles.activeText]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Conteúdo principal */}
      <MyView style={styles.mainContent}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.mainTitle}>Painel da Administração </Text>

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
      </MyView>
    </View>
  );
}

const isLarge = Dimensions.get('window').width > 600;

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#F2F3F5' },
  sidebar: {
    width: 180,
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  mainContent: { flex: 1 },
  logoContainer: { alignItems: 'center', marginBottom: 24 },
  logoTitle: { fontSize: 18, fontWeight: 'bold', color: '#3AC7A8', marginTop: 6 },
  logoSubtitle: { fontSize: 11, color: '#aaa' },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', marginVertical: 8,
    paddingVertical: 6, paddingHorizontal: 8, borderRadius: 8,
  },
  icon: { marginRight: 10 },
  menuText: { fontSize: 13, color: '#555' },
  activeItem: { backgroundColor: '#E6F9F5', borderLeftWidth: 4, borderLeftColor: '#3AC7A8' },
  activeText: { color: '#3AC7A8', fontWeight: '600' },
  content: { flexGrow: 1, padding: 24, backgroundColor: '#F2F3F5' },
  mainTitle: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  cardArea: {
    flexDirection: 'row', gap: 20, flexWrap: 'wrap',
    justifyContent: 'flex-start', marginBottom: 20,
  },
  card: {
    padding: 24, borderRadius: 12, elevation: 2, width: isLarge ? 250 : '100%',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10,
    alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
  cardNumber: { fontSize: 22, fontWeight: 'bold', color: '#222' },
  eventsTitle: { fontSize: 17, fontWeight: 'bold', color: '#3AC7A8', marginBottom: 12 },
  eventItem: {
    backgroundColor: '#fff', padding: 16, borderRadius: 10, marginBottom: 10,
    flexDirection: 'row', alignItems: 'center', elevation: 1,
  },
  eventName: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  eventDate: { fontSize: 12, color: '#666' },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff', borderRadius: 10, padding: 20,
    width: '80%', elevation: 5,
  },
  input: {
    borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 16,
    paddingVertical: 6, fontSize: 16,
  },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12 },
  cancelButton: { paddingVertical: 8, paddingHorizontal: 16 },
  saveButton: { paddingVertical: 8, paddingHorizontal: 16, backgroundColor: '#6A1B9A', borderRadius: 6 },
  cancelText: { color: '#777' },
  saveText: { color: '#fff', fontWeight: 'bold' },
});
