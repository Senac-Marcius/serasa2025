import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Pressable,
  Dimensions, Modal, ActivityIndicator
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getProjects, getProjectUsers } from '../../src/controllers/projects';
import { getEmployees } from '../../src/controllers/employees';
import { getCargo } from '../../src/controllers/positions';
import { getScale } from '../../src/controllers/scales';
import MyView from '../../src/components/MyView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserById } from '../../src/controllers/users';

interface TimelineItem {
  date: string;
  description: string;
}

interface Event {
  id: number;
  projectName: string;
  date: string;
  description: string;
}

interface UserSchedule {
  day: string;
  start_time: string;
  end_time: string;
  project?: {
    name: string;
    timeline: TimelineItem[];
  };
}

export default function AdminDashboard() {
  const [projectCount, setProjectCount] = useState(0);
  const [employeesCount, setEmployeesCount] = useState(0);
  const [positionsCount, setPositionsCount] = useState(0);
  const [scalesCount, setScalesCount] = useState(0);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("Todos");
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [userSchedule, setUserSchedule] = useState<UserSchedule[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [userProjects, setUserProjects] = useState<any[]>([]);

  const departments = ['Todos', 'RH', 'TI', 'Financeiro', 'Operações'];
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const router = useRouter();

  const cards = [
    {
      title: 'Meus Dados',
      icon: <Ionicons name="reader" size={30} color="#6C63FF" />,
      route: 'adminsitration/myProfile',
      bgColor: '#F3F1FE',
    },
    {
      title: 'Minha Escala',
      icon: <Ionicons name="document-text" size={30} color="#FF5C8A" />,
      route: 'adminsitration/my-schedule',
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
      icon: <Ionicons name="people" size={30} color="#6C63FF" />,
      route: 'adminsitration/employees',
      bgColor: '#F3F1FE',
      value: employeesCount,
    },
    {
      title: 'Cargos',
      icon: <Ionicons name="briefcase" size={30} color="#2EC4B6" />,
      route: 'adminsitration/positions',
      bgColor: '#E5FBF8',
      value: positionsCount,
    },
    {
      title: 'Escalas',
      icon: <MaterialCommunityIcons name="timetable" size={30} color="#FF5C8A" />,
      route: 'adminsitration/scales',
      bgColor: '#FFEAF0',
      value: scalesCount,
    },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const [projects, employees, cargos, escalas] = await Promise.all([
          getProjects({}),
          getEmployees({}),
          getCargo({}),
          getScale({}),
        ]);
    
        setProjectCount(Array.isArray(projects.data) ? projects.data.length : 0);
        setEmployeesCount(Array.isArray(employees.data) ? employees.data.length : 0);
        setPositionsCount(Array.isArray(cargos.data) ? cargos.data.length : 0);
        setScalesCount(Array.isArray(escalas.data) ? escalas.data.length : 0);
    
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          const userResponse = await getUserById(Number(userId));
          if (userResponse.status && userResponse.data) {
            setUserName(userResponse.data.name);
            setUserEmail(userResponse.data.email);
            
            // Load user's projects
            const projectsResponse = await getProjects({});
            if (projectsResponse.status && projectsResponse.data) {
              const projectsWithUsers = await Promise.all(
                projectsResponse.data.map(async (project) => {
                  const userIds = await getProjectUsers(project.id);
                  return userIds.includes(Number(userId)) ? project : null;
                })
              );
              setUserProjects(projectsWithUsers.filter(project => project !== null));
            }
          }
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    }
  
    fetchData();
  }, []);

  async function loadUserEvents() {
    try {
      setLoadingEvents(true);
      const userId = await AsyncStorage.getItem('userId');
      
      if (!userId) return;
      
      const scaleResponse = await getScale({ employ_id: Number(userId) });
      if (!scaleResponse.status || !scaleResponse.data) return;
      
      const userEvents: Event[] = [];
      const scheduleWithProjects: UserSchedule[] = [];
      
      scaleResponse.data.forEach((scaleItem) => {
        const relevantProjects = userProjects.filter(project => {
          try {
            const timeline = JSON.parse(project.time_line || '[]') as TimelineItem[];
            return timeline.some(item => item.date === scaleItem.day);
          } catch (e) {
            console.error('Error parsing timeline:', e);
            return false;
          }
        });
        
        relevantProjects.forEach(project => {
          try {
            const timeline = JSON.parse(project.time_line || '[]') as TimelineItem[];
            timeline
              .filter(item => item.date === scaleItem.day)
              .forEach(item => {
                userEvents.push({
                  id: Math.random(),
                  projectName: project.name,
                  date: item.date,
                  description: item.description
                });
              });
          } catch (e) {
            console.error('Error processing project timeline:', e);
          }
        });
        
        const firstProject = relevantProjects[0];
        scheduleWithProjects.push({
          day: scaleItem.day,
          start_time: scaleItem.start_time,
          end_time: scaleItem.end_time,
          project: firstProject ? {
            name: firstProject.name,
            timeline: JSON.parse(firstProject.time_line || '[]')
          } : undefined
        });
      });
      
      setEvents(userEvents);
      setUserSchedule(scheduleWithProjects);
    } catch (error) {
      console.error('Error loading user events:', error);
    } finally {
      setLoadingEvents(false);
    }
  }

  useEffect(() => {
    if (userProjects.length > 0) {
      loadUserEvents();
    }
  }, [userProjects]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const formatDateTime = (dateString: string, timeString?: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('pt-BR');
    
    if (!timeString) return formattedDate;
    
    return `${formattedDate} às ${timeString}`;
  };

  return (
    <View style={styles.container}>
      <MyView style={styles.mainContent}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <View style={styles.userInfo}>
              <Ionicons name="person-circle-outline" size={40} color="#3AC7A8" />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.userName}>Olá, {userName}</Text>
                <Text style={styles.userRole}>{userEmail}</Text>
              </View>
            </View>
            <Pressable
              style={styles.logoutButton}
              onPress={() => setShowLogoutModal(true)}
            >
              <Ionicons name="log-out-outline" size={24} color="#fff" />
              <Text style={styles.logoutText}>Sair</Text>
            </Pressable>
          </View>

          <Text style={styles.mainTitle}>Painel de Administração</Text>
          <View style={styles.cardArea}>
            {cards.map((card, index) => (
              <Pressable
                key={index}
                style={[styles.card, { backgroundColor: card.bgColor }]}
                onPress={() => router.push(card.route)}
              >
                {card.icon}
                <Text style={styles.cardTitle}>{card.title}</Text>
                {card.value !== undefined && (
                  <Text style={styles.cardNumber}>{card.value}</Text>
                )}
              </Pressable>
            ))}
          </View>

          <View style={styles.eventsContainer}>
            <Text style={styles.sectionTitle}>Minha Agenda</Text>
            
            {loadingEvents ? (
              <ActivityIndicator size="large" color="#3AC7A8" />
            ) : userSchedule.length === 0 ? (
              <Text style={styles.noEventsText}>Nenhum evento agendado</Text>
            ) : (
              <ScrollView style={styles.eventsScrollView}>
                {userSchedule.map((schedule, index) => (
                  <View key={index} style={[
                    styles.scheduleItem,
                    !schedule.project && styles.scheduleItemWithoutProject
                  ]}>
                    <View style={styles.scheduleTime}>
                      <Text style={styles.scheduleDay}>{formatDate(schedule.day)}</Text>
                      <Text style={styles.scheduleHours}>
                        {schedule.start_time} - {schedule.end_time}
                      </Text>
                    </View>
                    
                    {schedule.project ? (
                      <View style={styles.projectInfo}>
                        <Text style={styles.projectName}>{schedule.project.name}</Text>
                        {schedule.project.timeline
                          .filter(item => item.date === schedule.day)
                          .map((item, idx) => (
                            <Text key={idx} style={styles.eventDescription}>
                              {item.description}
                            </Text>
                          ))}
                      </View>
                    ) : (
                      <Text style={styles.noProjectText}>Sem projeto alocado</Text>
                    )}
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        </ScrollView>
      </MyView>

      <Modal visible={showLogoutModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 16, marginBottom: 20 }}>Deseja realmente sair?</Text>
            <View style={styles.modalButtons}>
              <Pressable onPress={() => setShowLogoutModal(false)} style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setShowLogoutModal(false);
                  router.push('/');
                }}
                style={styles.saveButton}
              >
                <Text style={styles.saveText}>Sair</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const isLarge = Dimensions.get('window').width > 600;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F3F5' },
  mainContent: { flex: 1 },
  content: { flexGrow: 1, padding: 24, backgroundColor: '#F2F3F5', alignItems: 'center' },
  header: {
    width: '100%', flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 24,
  },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  userName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  userRole: { fontSize: 12, color: '#888' },
  logoutButton: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#3AC7A8',
    paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8,
  },
  logoutText: { color: '#fff', marginLeft: 6, fontWeight: 'bold' },
  dropdownContainer: { width: '100%', marginBottom: 20 },
  dropdownButton: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 12, backgroundColor: '#fff', borderRadius: 8, borderWidth: 1,
    borderColor: '#ddd',
  },
  dropdownText: { fontSize: 14, color: '#333' },
  dropdownOptions: {
    marginTop: 4, backgroundColor: '#fff', borderRadius: 8, borderWidth: 1,
    borderColor: '#ddd',
  },
  dropdownOption: { padding: 12 },
  dropdownOptionText: { fontSize: 14, color: '#333' },
  mainTitle: { fontSize: 26, fontWeight: 'bold', color: '#333', marginBottom: 30 },
  cardArea: {
    flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 20,
  },
  card: {
    padding: 24, borderRadius: 12, elevation: 2, width: isLarge ? 220 : '100%',
    maxWidth: 240, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10,
    alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#333', textAlign: 'center' },
  cardNumber: { fontSize: 22, fontWeight: 'bold', color: '#222' },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff', borderRadius: 10, padding: 20,
    width: '80%', elevation: 5,
  },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12 },
  cancelButton: { paddingVertical: 8, paddingHorizontal: 16 },
  saveButton: {
    paddingVertical: 8, paddingHorizontal: 16,
    backgroundColor: '#6A1B9A', borderRadius: 6,
  },
  cancelText: { color: '#777' },
  saveText: { color: '#fff', fontWeight: 'bold' },
  eventsContainer: {
    width: '100%',
    marginTop: 30,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  noEventsText: {
    textAlign: 'center',
    color: '#888',
    paddingVertical: 20,
  },
  eventsScrollView: {
    maxHeight: 300,
  },
  scheduleItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  scheduleItemWithoutProject: {
    opacity: 0.6,
  },
  scheduleTime: {
    width: 100,
    marginRight: 16,
  },
  scheduleDay: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  scheduleHours: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3AC7A8',
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
  },
  noProjectText: {
    fontSize: 13,
    color: '#888',
    fontStyle: 'italic',
    flex: 1,
    textAlignVertical: 'center',
  },
});