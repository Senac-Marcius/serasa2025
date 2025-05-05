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

// Interfaces de Tipos
interface TimelineItem {
  date: string;
  description: string;
}

interface Event {
  id: string;
  projectName: string;
  date: string;
  description: string;
  type: 'event';
}

interface ScaleEvent {
  id: string;
  date: string;
  description: string;
  type: 'scale';
  start_time: string;
  end_time: string;
}

type CalendarEvent = Event | ScaleEvent;

interface UserSchedule {
  day: string;
  start_time: string;
  end_time: string;
  date?: string;
  project?: {
    name: string;
    timeline: TimelineItem[];
  };
}

interface Project {
  id: number;
  namep: string;
  timeline: TimelineItem[];
}

interface CalendarModalProps {
  visible: boolean;
  onClose: () => void;
  events: Event[];
  scales: UserSchedule[];
  projects: Project[];
}

// Componente do Modal do Calendário
const CalendarModal = ({ visible, onClose, events, scales, projects }: CalendarModalProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const allItems: CalendarEvent[] = [
    ...events.map(e => ({ ...e, type: 'event' as const })),
    ...scales.map(s => ({ 
      id: `scale-${s.day}-${s.start_time}`,
      date: s.date || s.day,
      description: 'Sua escala',
      type: 'scale' as const,
      start_time: s.start_time,
      end_time: s.end_time
    }))
  ];

  const renderDays = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.emptyDay} />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const currentDate = new Date(year, month, d).toISOString().split('T')[0];
      const dateEvents = allItems.filter(item => 
        new Date(item.date).toISOString().split('T')[0] === currentDate
      );

      const hasEvent = dateEvents.some(e => e.type === 'event');
      const hasScale = dateEvents.some(e => e.type === 'scale');

      days.push(
        <Pressable
          key={`day-${d}`}
          style={[
            styles.day,
            hasEvent && styles.eventDay,
            hasScale && styles.scaleDay,
            currentDate === selectedDate.toISOString().split('T')[0] && styles.selectedDay
          ]}
          onPress={() => setSelectedDate(new Date(year, month, d))}
        >
          <Text style={styles.dayText}>{d}</Text>
        </Pressable>
      );
    }

    return days;
  };

  const selectedItems = allItems.filter(item =>
    new Date(item.date).toISOString().split('T')[0] === 
    selectedDate.toISOString().split('T')[0]
  );

  const selectedProjects = projects.filter(project => 
    project.timeline.some(item => 
      new Date(item.date).toISOString().split('T')[0] === 
      selectedDate.toISOString().split('T')[0]
  ));

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.calendarModal}>
          <View style={styles.calendarHeader}>
            <Pressable onPress={() => {
              if (month === 0) {
                setMonth(11);
                setYear(year - 1);
              } else {
                setMonth(month - 1);
              }
            }}>
              <Ionicons name="chevron-back" size={24} color="#3AC7A8" />
            </Pressable>
            
            <Text style={styles.monthText}>
              {new Date(year, month).toLocaleString('pt-BR', { month: 'long' })} {year}
            </Text>
            
            <Pressable onPress={() => {
              if (month === 11) {
                setMonth(0);
                setYear(year + 1);
              } else {
                setMonth(month + 1);
              }
            }}>
              <Ionicons name="chevron-forward" size={24} color="#3AC7A8" />
            </Pressable>
          </View>

          <View style={styles.weekDays}>
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
              <Text key={day} style={styles.weekDayText}>{day}</Text>
            ))}
          </View>

          <View style={styles.daysContainer}>
            {renderDays()}
          </View>

          <View style={styles.eventsList}>
            <Text style={styles.selectedDateText}>
              {selectedDate.toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long' 
              })}
            </Text>
            
            {selectedItems.length === 0 && selectedProjects.length === 0 ? (
              <Text style={styles.noEventsText}>Nenhum evento ou projeto</Text>
            ) : (
              <>
                {selectedItems.map(item => (
                  <View key={item.id} style={[
                    styles.eventItem,
                    item.type === 'scale' ? styles.scaleItem : styles.projectItem
                  ]}>
                    <Text style={styles.eventTitle}>
                      {item.type === 'scale' ? 'Sua Escala' : item.projectName}
                    </Text>
                    <Text style={styles.eventDescription}>{item.description}</Text>
                    {item.type === 'scale' && (
                      <Text style={styles.eventTime}>
                        {item.start_time} - {item.end_time}
                      </Text>
                    )}
                  </View>
                ))}
                
                {selectedProjects.map(project => (
                  <View key={project.id} style={styles.projectItem}>
                    <Text style={styles.eventTitle}>{project.namep}</Text>
                    {project.timeline
                      .filter(item => 
                        new Date(item.date).toISOString().split('T')[0] === 
                        selectedDate.toISOString().split('T')[0]
                      )
                      .map((item, idx) => (
                        <Text key={idx} style={styles.eventDescription}>
                          {item.description}
                        </Text>
                      ))}
                  </View>
                ))}
              </>
            )}
          </View>

          <Pressable 
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>Fechar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

// Componente Principal
export default function AdminDashboard() {
  const [projectCount, setProjectCount] = useState(0);
  const [employeesCount, setEmployeesCount] = useState(0);
  const [positionsCount, setPositionsCount] = useState(0);
  const [scalesCount, setScalesCount] = useState(0);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [userSchedule, setUserSchedule] = useState<UserSchedule[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);

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
            
            // Carrega todos os projetos
            const projectsResponse = await getProjects({});
            if (projectsResponse.status && projectsResponse.data) {
              const allProjectsData = projectsResponse.data.map(p => ({
                id: p.id,
                namep: p.namep,
                timeline: parseTimeline(p.time_line)
              }));
              setAllProjects(allProjectsData);

              // Carrega projetos do usuário
              const projectsWithUsers = await Promise.all(
                projectsResponse.data.map(async (project) => {
                  const userIds = await getProjectUsers(project.id);
                  const isUserInProject = userIds.includes(Number(userId));
                  return isUserInProject ? {
                    id: project.id,
                    namep: project.namep,
                    timeline: parseTimeline(project.time_line)
                  } : null;
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

  function parseTimeline(timelineStr: string): TimelineItem[] {
    try {
      if (!timelineStr) return [];
      const parsed = JSON.parse(timelineStr);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error('Error parsing timeline:', e);
      return [];
    }
  }

  function normalizeDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0];
  }

  async function loadUserEvents() {
    try {
      setLoadingEvents(true);
      const userId = await AsyncStorage.getItem('userId');
      
      if (!userId) {
        console.log('Nenhum usuário logado');
        return;
      }
      
      const scaleResponse = await getScale({ employ_id: Number(userId) });
      
      if (!scaleResponse.status || !scaleResponse.data) {
        console.log('Nenhuma escala encontrada');
        return;
      }
      
      const userEvents: Event[] = [];
      const scheduleWithProjects: UserSchedule[] = [];
      
      for (const scaleItem of scaleResponse.data) {
        if (!scaleItem.date) {
          console.log('Escala sem data:', scaleItem);
          continue;
        }
        
        const scaleDate = normalizeDate(scaleItem.date);
        
        for (const project of userProjects) {
          if (!project.timeline || !Array.isArray(project.timeline)) {
            console.log('Projeto sem timeline válida:', project.namep);
            continue;
          }
          
          const matchingItems = project.timeline.filter(item => {
            if (!item.date) return false;
            const itemDate = normalizeDate(item.date);
            return itemDate === scaleDate;
          });
          
          matchingItems.forEach(item => {
            userEvents.push({
              id: `${scaleItem.id}-${project.id}-${item.date}`,
              projectName: project.namep,
              date: item.date,
              description: item.description,
              type: 'event'
            });
          });
          
          scheduleWithProjects.push({
            day: scaleItem.day,
            start_time: scaleItem.start_time,
            end_time: scaleItem.end_time,
            date: scaleItem.date,
            project: {
              name: project.namep,
              timeline: project.timeline
            }
          });
        }
      }
      
      setEvents(userEvents);
      setUserSchedule(scheduleWithProjects);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
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
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Agenda</Text>
              <Pressable
                style={styles.viewCalendarButton}
                onPress={() => setCalendarModalVisible(true)}
              >
                <Text style={styles.viewCalendarButtonText}>Calendário</Text>
                <Ionicons name="calendar" size={20} color="white" style={styles.calendarIcon} />
              </Pressable>
            </View>
            
            {loadingEvents ? (
              <ActivityIndicator size="large" color="#3AC7A8" />
            ) : (
              <>
                {/* Mostrar escalas do usuário */}
                {userSchedule.length > 0 && (
                  <>
                    <Text style={styles.subSectionTitle}>Minhas Escalas</Text>
                    {userSchedule.map((schedule, index) => (
                      <View key={`${schedule.date}-${index}`} style={[
                        styles.scheduleItem,
                        !schedule.project && styles.scheduleItemWithoutProject
                      ]}>
                        <View style={styles.scheduleTime}>
                          <Text style={styles.scheduleDay}>
                            {formatDate(schedule.date || schedule.day)}
                          </Text>
                          <Text style={styles.scheduleHours}>
                            {schedule.start_time} - {schedule.end_time}
                          </Text>
                        </View>
                        
                        {schedule.project ? (
                          <View style={styles.projectInfo}>
                            <Text style={styles.projectName}>{schedule.project.name}</Text>
                            {schedule.project.timeline
                              .filter(item => {
                                const itemDate = normalizeDate(item.date);
                                const scaleDate = normalizeDate(schedule.date || schedule.day);
                                return itemDate === scaleDate;
                              })
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
                  </>
                )}

                {/* Mostrar todos os projetos */}
                {allProjects.length === 0 ? (
                  <Text style={styles.noProjectsText}>Nenhum projeto cadastrado</Text>
                ) : (
                  allProjects.map(project => (
                    <View key={project.id} style={styles.projectCard}>
                      <Text style={styles.projectTitle}>{project.namep}</Text>
                      {project.timeline.length > 0 ? (
                        project.timeline.map((item, idx) => (
                          <View key={idx} style={styles.timelineItem}>
                            <Text style={styles.timelineDate}>
                              {formatDate(item.date)}
                            </Text>
                            <Text style={styles.timelineDescription}>
                              {item.description}
                            </Text>
                          </View>
                        ))
                      ) : (
                        <Text style={styles.noTimelineText}>Nenhum marco definido</Text>
                      )}
                    </View>
                  ))
                )}
              </>
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

      <CalendarModal
        visible={calendarModalVisible}
        onClose={() => setCalendarModalVisible(false)}
        events={events}
        scales={userSchedule}
        projects={allProjects}
      />
    </View>
  );
}

// Estilos
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewCalendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3AC7A8',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  viewCalendarButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 5,
  },
  calendarIcon: {
    marginLeft: 5,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
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
  projectCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3AC7A8',
    marginBottom: 10,
  },
  timelineItem: {
    marginBottom: 10,
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#FFA726',
  },
  timelineDate: {
    fontWeight: 'bold',
    color: '#555',
  },
  timelineDescription: {
    color: '#666',
  },
  noProjectsText: {
    textAlign: 'center',
    color: '#888',
    paddingVertical: 20,
  },
  noTimelineText: {
    color: '#888',
    fontStyle: 'italic',
  },
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
  // Estilos do modal do calendário
  calendarModal: {
    backgroundColor: 'white',
    borderRadius: 15,
    width: '90%',
    maxHeight: '80%',
    padding: 20,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekDayText: {
    width: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#666',
  },
  noEventsText: {
    textAlign: 'center',
    color: '#888',
    paddingVertical: 20,
    fontSize: 16,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  day: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 2,
  },
  emptyDay: {
    width: 40,
    height: 40,
    margin: 2,
  },
  dayText: {
    color: '#333',
  },
  eventDay: {
    backgroundColor: '#FFA726',
  },
  scaleDay: {
    backgroundColor: '#66BB6A',
  },
  selectedDay: {
    borderWidth: 2,
    borderColor: '#3AC7A8',
  },
  eventsList: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
    maxHeight: 200,
  },
  selectedDateText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  eventItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  projectItem: {
    backgroundColor: '#FFF3E0',
    borderLeftWidth: 4,
    borderLeftColor: '#FFA726',
  },
  scaleItem: {
    backgroundColor: '#E8F5E9',
    borderLeftWidth: 4,
    borderLeftColor: '#66BB6A',
  },
  eventTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  eventTime: {
    color: '#3AC7A8',
    marginTop: 4,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#3AC7A8',
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});