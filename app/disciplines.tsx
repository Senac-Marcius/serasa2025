import React, { useState, useEffect } from 'react';
import { View,Text,StyleSheet,TextInput,TouchableOpacity,ScrollView,Dimensions,Modal,Pressable,} from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { iDisciplines, SetDisciplinebd, UpdateDisciplinebd, DeleteDisciplinebd } from '../src/controllers/disciplines';
import { supabase } from '../src/utils/supabase';
import type { KeyboardTypeOptions } from 'react-native';

const { width } = Dimensions.get('window');

export default function DisciplineScreen() {
  const [req, setReq] = useState<iDisciplines>({
    id: -1,
    name: '',
    url: '',
    workload: 0,
    created_at: new Date().toISOString(),
    teacher: '',
  });

  const [disciplines, setDisciplines] = useState<iDisciplines[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [activeScreen, setActiveScreen] = useState<'disciplinas' | 'professores'>('disciplinas');
  const [filtro, setFiltro] = useState('');
  const router = useRouter();
  const isMobile = width < 768;

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('disciplines').select();
      if (error) console.log('Erro ao carregar disciplinas:', error);
      if (data) setDisciplines(data);
    })();
  }, []);

  const professoresAgrupados = () => {
    const agrupado: { [nome: string]: string[] } = {};

    disciplines.forEach((item) => {
      const nome = item.teacher?.trim();
      const disciplina = item.name?.trim();

      if (nome && disciplina) {
        if (!agrupado[nome]) agrupado[nome] = [];
        agrupado[nome].push(disciplina);
      }
    });

    const listaFormatada = Object.entries(agrupado).map(([nome, disciplinas]) => ({
      nome,
      disciplinas,
    }));

    return listaFormatada.filter((prof) => {
      const termo = filtro.toLowerCase();
      return (
        prof.nome.toLowerCase().includes(termo) ||
        prof.disciplinas.some((disc) => disc.toLowerCase().includes(termo))
      );
    });
  };

  function handleRegister() {
    if (!req.name.trim() || !req.url.trim() || !req.teacher.trim()) {
      console.log('Preencha todos os campos!');
      return;
    }

    if (isEditing) {
      handleUpdate();
      return;
    }

    const newDiscipline = {
      name: req.name,
      url: req.url,
      workload: req.workload,
      created_at: new Date().toISOString(),
      teacher: req.teacher,
    };

    (async () => {
      const result = await SetDisciplinebd(newDiscipline as iDisciplines);
      if (result && result[0]) {
        setDisciplines([...disciplines, result[0]]);
        console.log('Disciplina cadastrada com sucesso!');
      } else {
        console.log('Erro ao cadastrar disciplina.');
      }
    })();

    resetForm();
  }

  function handleUpdate() {
    setDisciplines(disciplines.map((d) => (d.id === req.id ? req : d)));

    (async () => {
      await UpdateDisciplinebd(req);
      console.log('Disciplina atualizada.');
    })();

    resetForm();
  }

  function handleDelete(id: number) {
    (async () => {
      setDisciplines(disciplines.filter((d) => d.id !== id));
      await DeleteDisciplinebd(id);
      console.log(`Disciplina ${id} excluída.`);
    })();
  }

  function handleEdit(id: number) {
    const discipline = disciplines.find((d) => d.id === id);
    if (discipline) {
      setReq(discipline);
      setIsEditing(true);
    }
  }

  function resetForm() {
    setReq({
      id: -1,
      name: '',
      url: '',
      workload: 0,
      created_at: new Date().toISOString(),
      teacher: '',
    });
    setIsEditing(false);
  }

  function handleNavigation(route: string) {
    setDrawerVisible(false);
    if (route.toLowerCase() === 'professores') {
      setActiveScreen('professores');
    } else {
      setActiveScreen('disciplinas');
      router.push(`/${route.toLowerCase()}`);
    }
  }

  const menuItems = [
    { icon: 'home-outline', label: 'home', route: 'home' },
    { icon: 'account-outline', label: 'Professores', route: 'professores' },
    { icon: 'file-document-outline', label: 'Documentos', route: 'documents' },
    { icon: 'library-shelves', label: 'Cursos', route: 'courses' },
    { icon: 'calendar-month-outline', label: 'Calendário', route: 'calendar' },
  ];

  return (
    <View style={styles.container}>
      {!isMobile && (
        <View style={styles.sidebar}>
          <Text style={styles.sidebarTitle}>Meu Sistema</Text>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.sidebarButton}
              onPress={() => handleNavigation(item.route)}
            >
              <Icon name={item.icon} size={20} color="#fff" style={{ marginRight: 10 }} />
              <Text style={styles.sidebarItem}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {isMobile && (
        <>
          <TouchableOpacity style={styles.menuButton} onPress={() => setDrawerVisible(true)}>
            <Icon name="menu" size={28} color="#6A1B9A" />
          </TouchableOpacity>
          <Modal visible={drawerVisible} transparent animationType="slide">
            <View style={styles.drawerContainer}>
              <View style={styles.drawer}>
                {menuItems.map((item) => (
                  <TouchableOpacity
                    key={item.label}
                    style={styles.sidebarButton}
                    onPress={() => handleNavigation(item.route)}
                  >
                    <Icon name={item.icon} size={20} color="#fff" style={{ marginRight: 10 }} />
                    <Text style={styles.sidebarItem}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Pressable style={styles.drawerOverlay} onPress={() => setDrawerVisible(false)} />
            </View>
          </Modal>
        </>
      )}

      {activeScreen === 'disciplinas' ? (
        <ScrollView style={styles.main}>
          <Text style={styles.pageTitle}>Cadastro de Disciplinas</Text>

          <View style={styles.card}>
            <View style={styles.formCard}>
              <Text style={styles.sectionTitle}>{isEditing ? 'Editar Disciplina' : 'Nova Disciplina'}</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome da disciplina"
                value={req.name}
                onChangeText={(text) => setReq({ ...req, name: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="URL"
                value={req.url}
                onChangeText={(text) => setReq({ ...req, url: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Professor"
                value={req.teacher}
                onChangeText={(text) => setReq({ ...req, teacher: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Carga Horária"
                keyboardType={'numeric' as KeyboardTypeOptions}
                value={req.workload.toString()}
                onChangeText={(text) => setReq({ ...req, workload: parseInt(text || '0') })}
              />
              <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
                <Text style={styles.primaryButtonText}>{isEditing ? 'Atualizar' : 'Cadastrar'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Disciplinas Cadastradas</Text>
            <View style={styles.gridContainer}>
              {disciplines.map((item) => (
                <View key={item.id} style={styles.cardGridItem}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardText}>URL: {item.url}</Text>
                  <Text style={styles.cardText}>Carga Horária: {item.workload} horas</Text>
                  <Text style={styles.cardText}>Professor: {item.teacher}</Text>
                  <View style={styles.actions}>
                    <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item.id)}>
                      <Text style={styles.buttonText}>EDITAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                      <Text style={styles.buttonText}>EXCLUIR</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      
    ) : (
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <Text style={styles.pageTitle}>Professores Cadastrados</Text>

        <TextInput
          placeholder="Buscar por professor ou disciplina..."
          style={styles.searchInput}
          value={filtro}
          onChangeText={setFiltro}
        />

        <View style={styles.cardGridProfessores}>
          {professoresAgrupados().map((prof, index) => (
            <View key={index} style={styles.professorCard}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>{prof.nome[0].toUpperCase()}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.professorName}>{prof.nome}</Text>
                <View style={styles.tagsContainer}>
                  {prof.disciplinas.map((disc, idx) => (
                    <View key={idx} style={styles.tag}>
                      <Text style={styles.tagText}>{disc}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
          {professoresAgrupados().length === 0 && (
            <Text style={{ padding: 12, color: '#666' }}>Nenhum professor encontrado.</Text>
          )}
        </View>
      </ScrollView>
    )}
  </View>
);
}


const styles = StyleSheet.create({
  container: { flexDirection: 'row', flex: 1, backgroundColor: '#F4F4F4' },
  sidebar: { width: 240, backgroundColor: '#6A1B9A', padding: 20 },
  sidebarTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginBottom: 30 },
  sidebarButton: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  sidebarItem: { color: '#FFF', fontSize: 16 },
  main: { flex: 1, padding: 20 },

  pageTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#6A1B9A', marginBottom: 10 },

  input: {
    height: 45,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#FAFAFA',
  },

  primaryButton: {
    backgroundColor: '#6A1B9A',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  primaryButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },

  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' },
  cardGridItem: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    margin: 8,
    width: width > 768 ? 300 : '100%',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },

  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  cardText: { fontSize: 14, color: '#666' },

  actions: { flexDirection: 'row', gap: 10, marginTop: 10 },
  editButton: {
    backgroundColor: '#9575CD',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: '#EF5350',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  buttonText: { color: '#FFF', fontWeight: 'bold' },

  menuButton: { position: 'absolute', top: 40, left: 20, zIndex: 10 },
  drawerContainer: { flex: 1, flexDirection: 'row' },
  drawer: { width: 240, backgroundColor: '#6A1B9A', padding: 20 },
  drawerOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' },

  card: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    padding: 20,
    marginBottom: 25,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },

  searchInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 14,
    color: '#333',
  },

  tableWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#FFF',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: '#DDD',
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#444',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: '#EEE',
    alignItems: 'center',
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },

  cardGridProfessores: {
    flexDirection: 'column',
    gap: 12,
  },
  professorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6A1B9A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  professorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    backgroundColor: '#EDE7F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 12,
    color: '#5E35B1',
  },
});
