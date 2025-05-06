import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  Text, 
  TextInput, 
  Modal,
  Alert,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { router } from 'expo-router';
import { Icon } from "react-native-paper";
import { iProject, setProject, updateProject, deleteProject, getProjects, getProjectUsers } from '../../src/controllers/projects';
import { getUsers, toListUser, getLoggedUserId, getUserById } from '../../src/controllers/users';
import MyButton from '../../src/components/MyButtons';
import MyList from '../../src/components/MyList';
import { Myinput, MyTextArea } from '../../src/components/MyInputs';
import MySelect from '../../src/components/MySelect';
import { Calendar } from 'react-native-calendars';

interface TimelineItem {
  date: string;
  description: string;
}

export default function ProjectScreen() {
  const [projects, setProjects] = useState<iProject[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [rawRecurces, setRawRecurces] = useState('');
  const [idUs, setIdUs] = useState<{key: number, option: string}[]>([]);
  const [integrantes, setIntegrantes] = useState<{key: number, option: string}[]>([{key: -1, option: ''}]);
  const [currentUser, setCurrentUser] = useState<{id: number, name: string} | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentTimelineItem, setCurrentTimelineItem] = useState<TimelineItem>({date: '', description: ''});
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const [projectData, setProjectData] = useState<Omit<iProject, 'id'> & { id: number }>({
    id: -1,
    name: '',
    namep: '',
    url: '',
    created_at: new Date().toISOString(),
    recurces: 0,
    description: '',
    activity: '',
    time_line: '[]',
    objective: '',
    methodology: '',
    techniques: '',
    strategies: '',
    planning: '',
    process: ''
  });

  const timelineItems: TimelineItem[] = projectData.time_line 
    ? JSON.parse(projectData.time_line)
    : [];

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const userId = await getLoggedUserId();
        if (userId) {
          const userResponse = await getUserById(Number(userId));
          if (userResponse.status && userResponse.data) {
            setCurrentUser({
              id: userResponse.data.id,
              name: userResponse.data.name
            });
            if (projectData.id === -1) {
              setProjectData(prev => ({
                ...prev,
                name: userResponse.data.name
              }));
            }
          }
        }

        const projectsResponse = await getProjects({});
        if (projectsResponse.status && projectsResponse.data) {
          setProjects(projectsResponse.data);
        }

        const usersResponse = await getUsers({});
        if (usersResponse.status && usersResponse.data) {
          setIdUs(toListUser(usersResponse.data));
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados iniciais');
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const formatCurrency = (value: string): string => {
    const numeric = value.replace(/\D/g, '') || '0';
    const number = parseFloat(numeric) / 100;
    return number.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL',
      minimumFractionDigits: 2
    });
  };

  const addIntegrante = () => {
    setIntegrantes([...integrantes, {key: -1, option: ''}]);
  };

  const updateIntegrante = (index: number, key: number) => {
    const name = idUs.find(u => u.key === key)?.option || '';
    const updatedIntegrante = { key, option: name };
    setIntegrantes(integrantes.map((int, idx) => (idx === index ? updatedIntegrante : int)));
  };

  const editProject = async (id: number) => {
    try {
      setModalLoading(true);
      const project = projects.find(item => item.id === id);
      if (project) {
        const userIds = await getProjectUsers(id);
        const integrantesList = userIds.length > 0 
          ? userIds.map(userId => ({
              key: userId,
              option: idUs.find(u => u.key === userId)?.option || ''
            }))
          : [{ key: -1, option: '' }];

        setProjectData({
          ...project,
          name: project.name || '',
          namep: project.namep || '',
          url: project.url || '',
          recurces: project.recurces || 0,
          description: project.description || '',
          activity: project.activity || '',
          time_line: project.time_line || '[]',
          objective: project.objective || '',
          methodology: project.methodology || '',
          techniques: project.techniques || '',
          strategies: project.strategies || '',
          planning: project.planning || '',
          process: project.process || ''
        });

        setRawRecurces((project.recurces || 0).toFixed(2));
        setIntegrantes(integrantesList);
        setModalVisible(true);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dados do projeto');
      console.error("Erro ao editar projeto:", error);
    } finally {
      setModalLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setModalLoading(true);
      const recurcesValue = parseFloat(rawRecurces.replace(/\D/g, '')) / 100 || 0;
      const projectToSave = {
        ...projectData,
        recurces: recurcesValue,
        created_at: projectData.created_at || new Date().toISOString()
      };

      const userIds = integrantes
        .filter(i => i.key !== -1)
        .map(i => i.key);

      if (projectData.id === -1) {
        const response = await setProject(projectToSave, integrantes);
        if (response && !response.error && response.data) {
          setProjects([...projects, ...response.data]);
          Alert.alert('Sucesso', 'Projeto criado com sucesso');
        }
      } else {
        await updateProject(projectToSave, userIds);
        const updatedProjects = await getProjects({});
        if (updatedProjects.status && updatedProjects.data) {
          setProjects(updatedProjects.data);
        }
        Alert.alert('Sucesso', 'Projeto atualizado com sucesso');
      }

      resetForm();
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao salvar o projeto');
      console.error("Erro ao salvar projeto:", error);
    } finally {
      setModalLoading(false);
    }
  };

  const resetForm = () => {
    setProjectData({
      id: -1,
      name: currentUser?.name || '',
      namep: '',
      url: '',
      created_at: new Date().toISOString(),
      recurces: 0,
      description: '',
      activity: '',
      time_line: '[]',
      objective: '',
      methodology: '',
      techniques: '',
      strategies: '',
      planning: '',
      process: ''
    });
    setRawRecurces('');
    setIntegrantes([{key: -1, option: ''}]);
    setCurrentTimelineItem({date: '', description: ''});
  };

  const dellProject = async (id: number) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este projeto?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              setLoading(true);
              await deleteProject(id);
              setProjects(projects.filter(item => item.id !== id));
              Alert.alert('Sucesso', 'Projeto excluído com sucesso');
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o projeto');
              console.error("Erro ao deletar projeto:", error);
            } finally {
              setLoading(false);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const addTimelineItem = () => {
    if (currentTimelineItem.date && currentTimelineItem.description) {
      const newTimeline = [...timelineItems, currentTimelineItem];
      setProjectData({
        ...projectData,
        time_line: JSON.stringify(newTimeline)
      });
      setCurrentTimelineItem({date: '', description: ''});
      setShowCalendar(false);
    } else {
      Alert.alert('Atenção', 'Preencha a data e a descrição');
    }
  };

  const removeTimelineItem = (index: number) => {
    const newTimeline = timelineItems.filter((_, i) => i !== index);
    setProjectData({
      ...projectData,
      time_line: JSON.stringify(newTimeline)
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Data não selecionada';
    
    // Corrige o problema de fuso horário criando a data com meio-dia
    const date = new Date(dateString + 'T12:00:00');
    return date.toLocaleDateString('pt-BR');
  };

  const filteredProjects = projects.filter(project => {
    const name = project.namep || '';
    const desc = project.description || '';
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>Carregando projetos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity 
              onPress={() => router.push('adminsitration/')}
              style={styles.backButton}
            >
              <Icon source="arrow-left" size={24} color="#2c3e50" />
              <Text style={styles.backButton}>Voltar</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Gerenciamento de Projetos</Text>
          </View>
          
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholder="Buscar projetos..."
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.searchButton}>
              <Icon source="magnify" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <MyButton 
            title="Novo Projeto" 
            onPress={() => setModalVisible(true)}
            style={styles.addButton}
            icon="plus"
          />
        </View>

        <MyList
          data={filteredProjects}
          style={styles.listContainer}
          keyItem={(item) => item.id?.toString() || Math.random().toString()}
          renderItem={({ item }) => (
            <View style={styles.projectCard}>
              <Text style={styles.projectTitle}>{item.namep || 'Projeto sem nome'}</Text>
              <Text style={styles.projectCreator}>
                Criado por: {item.name || 'Não informado'}
              </Text>
              
              <View style={styles.projectMeta}>
                <Text style={styles.metaLabel}>Recursos:</Text>
                <Text style={styles.metaValue}>
                  {(item.recurces || 0).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </Text>
              </View>
              
              <View style={styles.projectMeta}>
                <Text style={styles.metaLabel}>Descrição:</Text>
                <Text style={styles.metaText} numberOfLines={2}>
                  {item.description || 'Nenhuma descrição fornecida'}
                </Text>
              </View>
              
              <View style={styles.buttonRow}>
                <MyButton 
                  title="Editar" 
                  onPress={() => editProject(item.id)}
                  style={styles.editButton}
                  icon="pencil"
                />
                <MyButton 
                  title="Excluir" 
                  onPress={() => dellProject(item.id)}
                  style={styles.deleteButton}
                  icon="delete"
                />
              </View>
            </View>
          )}
        />

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <SafeAreaView style={styles.modalContainer}>
            {modalLoading ? (
              <View style={styles.modalLoadingContainer}>
                <ActivityIndicator size="large" color="#3498db" />
                <Text style={styles.loadingText}>Carregando...</Text>
              </View>
            ) : (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>
                    {projectData.id === -1 ? "Novo Projeto" : "Editar Projeto"}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      resetForm();
                      setModalVisible(false);
                    }}
                    style={styles.closeButton}
                  >
                    <Icon source="close" size={24} color="#333" />
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.modalContent}>
                  <View style={styles.readOnlyField}>
                    <Text style={styles.label}>Nome do Criador</Text>
                    <Text style={styles.value}>
                      {projectData.id === -1 
                        ? (currentUser?.name || 'Carregando...') 
                        : projectData.name}
                    </Text>
                  </View>

                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Integrantes</Text>
                    {integrantes.map((integrante, index) => (
                      <View key={index} style={styles.integranteRow}>
                        <MySelect 
                          label={integrante.option || "Selecione um integrante"}
                          list={idUs}
                          setLabel={() => {}}
                          setKey={(key) => updateIntegrante(index, key)}
                          caption={`Integrante ${index + 1}`}
                        />
                        
                        <TouchableOpacity
                          onPress={() => {
                            const updated = [...integrantes];
                            updated.splice(index, 1);
                            setIntegrantes(updated);
                          }}
                          style={styles.removeButton}
                        >
                          <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>
                        
                        {index === integrantes.length - 1 && (
                          <TouchableOpacity
                            onPress={addIntegrante}
                            style={styles.addButtonSmall}
                          >
                            <Text style={styles.buttonText}>+</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    ))}
                  </View>

                  <Myinput
                    label="Nome do Projeto"
                    iconName="work"
                    value={projectData.namep}
                    onChangeText={(text) => setProjectData({...projectData, namep: text})}
                    placeholder="Nome do projeto"
                  />

                  <Myinput
                    label="URL do Projeto"
                    iconName="link"
                    value={projectData.url}
                    onChangeText={(text) => setProjectData({...projectData, url: text})}
                    placeholder="https://exemplo.com"
                  />

                  <Myinput
                    label="Recursos Financeiros"
                    iconName="attach-money"
                    value={rawRecurces}
                    onChangeText={(text) => {
                      const formatted = formatCurrency(text);
                      setRawRecurces(formatted);
                    }}
                    placeholder="R$ 0,00"
                  />

                  <MyTextArea
                    label="Descrição do Projeto"
                    iconName="description"
                    value={projectData.description}
                    onChangeText={(text) => setProjectData({...projectData, description: text})}
                    placeholder="Descreva o projeto..."
                  />

                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Linha do Tempo</Text>
                    
                    {timelineItems.map((item, index) => (
                      <View key={index} style={styles.timelineItem}>
                        <View style={styles.timelineItemHeader}>
                          <Text style={styles.timelineDate}>{formatDate(item.date)}</Text>
                          <TouchableOpacity 
                            onPress={() => removeTimelineItem(index)}
                            style={styles.removeTimelineButton}
                          >
                            <Icon source="close" size={20} color="#e74c3c" />
                          </TouchableOpacity>
                        </View>
                        <Text style={styles.timelineDescription}>{item.description}</Text>
                      </View>
                    ))}

                    {showCalendar && (
                      <View style={styles.calendarContainer}>
                        <Calendar
  onDayPress={(day: { dateString: string; }) => {
    // Corrige o problema da data selecionada sendo um dia anterior
    const selectedDate = new Date(day.dateString + 'T12:00:00'); // Adiciona meio-dia para evitar problemas de fuso horário
    setCurrentTimelineItem({
      ...currentTimelineItem,
      date: selectedDate.toISOString().split('T')[0] // Formata para YYYY-MM-DD
    });
    setShowCalendar(false);
  }}
  markedDates={{
    [currentTimelineItem.date]: {selected: true, selectedColor: '#3498db'}
  }}
  theme={{
    calendarBackground: '#fff',
    todayTextColor: '#3498db',
    arrowColor: '#3498db',
    monthTextColor: '#2c3e50',
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
  }}
/>
                      </View>
                    )}

                    <TouchableOpacity
                      onPress={() => setShowCalendar(true)}
                      style={styles.datePickerButton}
                    >
                      <Icon source="calendar" size={20} color="#3498db" />
                      <Text style={styles.datePickerText}>
                        {currentTimelineItem.date 
                          ? formatDate(currentTimelineItem.date) 
                          : 'Selecione uma data'}
                      </Text>
                    </TouchableOpacity>

                    <TextInput
                      style={styles.descriptionInput}
                      value={currentTimelineItem.description}
                      onChangeText={(text) => setCurrentTimelineItem({
                        ...currentTimelineItem,
                        description: text
                      })}
                      placeholder="Descrição do marco"
                      multiline
                    />

                    <MyButton
                      title="Adicionar Marco"
                      onPress={addTimelineItem}
                      button_type='round'
                      icon="plus"
                    />
                  </View>

                  <MyTextArea
                    label="Objetivo do Projeto"
                    iconName="flag"
                    value={projectData.objective}
                    onChangeText={(text) => setProjectData({...projectData, objective: text})}
                    placeholder="Quais são os objetivos principais do projeto..."
                  />

                  <MyTextArea
                    label="Atividades"
                    iconName="checklist"
                    value={projectData.activity}
                    onChangeText={(text) => setProjectData({...projectData, activity: text})}
                    placeholder="Lista de atividades a serem realizadas..."
                  />

                  <MyTextArea
                    label="Metodologia"
                    iconName="science"
                    value={projectData.methodology}
                    onChangeText={(text) => setProjectData({...projectData, methodology: text})}
                    placeholder="Metodologia utilizada no projeto..."
                  />

                  <MyTextArea
                    label="Técnicas"
                    iconName="build"
                    value={projectData.techniques}
                    onChangeText={(text) => setProjectData({...projectData, techniques: text})}
                    placeholder="Técnicas específicas que serão aplicadas..."
                  />

                  <MyTextArea
                    label="Estratégias"
                    iconName="insights"
                    value={projectData.strategies}
                    onChangeText={(text) => setProjectData({...projectData, strategies: text})}
                    placeholder="Estratégias de implementação..."
                  />

                  <MyTextArea
                    label="Planejamento"
                    iconName="assignment"
                    value={projectData.planning}
                    onChangeText={(text) => setProjectData({...projectData, planning: text})}
                    placeholder="Detalhes do planejamento..."
                  />

                  <MyTextArea
                    label="Processo"
                    iconName="repeat"
                    value={projectData.process}
                    onChangeText={(text) => setProjectData({...projectData, process: text})}
                    placeholder="Fluxo do processo..."
                  />

                  <View style={styles.formActions}>
                    <MyButton
                      title="Cancelar"
                      onPress={() => {
                        resetForm();
                        setModalVisible(false);
                      }}
                      style={styles.cancelButton}
                      icon="close"
                    />
                    
                    <MyButton
                      title={projectData.id === -1 ? "Cadastrar" : "Atualizar"}
                      onPress={handleSubmit}
                      style={styles.submitButton}
                      icon="content-save"
                    />
                  </View>
                </ScrollView>
              </>
            )}
          </SafeAreaView>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  modalLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  header: {
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 12,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#2ecc71',
    borderRadius: 8,
  },
  listContainer: {
    marginBottom: 20,
  },
  projectCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 6,
  },
  projectCreator: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  projectMeta: {
    marginBottom: 10,
  },
  metaLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 15,
    color: '#27ae60',
    fontWeight: '500',
  },
  metaText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 16,
  },
  editButton: {
    backgroundColor: '#f39c12',
    paddingHorizontal: 16,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    padding: 16,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
  },
  integranteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonSmall: {
    backgroundColor: '#2ecc71',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  cancelButton: {
    backgroundColor: '#95a5a6',
    paddingHorizontal: 16,
  },
  submitButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  readOnlyField: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#2c3e50',
    padding: 12,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
  },
  timelineItem: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  timelineItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timelineDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
  },
  timelineDescription: {
    fontSize: 14,
    color: '#666',
  },
  removeTimelineButton: {
    padding: 4,
  },
  calendarContainer: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    marginBottom: 12,
  },
  datePickerText: {
    marginLeft: 8,
    color: '#2c3e50',
  },
  descriptionInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    minHeight: 80,
    textAlignVertical: 'top',
  },
});