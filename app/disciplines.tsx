import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
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
  const router = useRouter();
  const isMobile = width < 768;

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('disciplines').select();
      if (error) console.log('Erro ao carregar disciplinas:', error);
      if (data) setDisciplines(data);
    })();
  }, []);

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
    router.push(`/${route.toLowerCase()}`);
  }

  const menuItems = [
    { icon: 'home-outline', label: 'Início', route: 'inicio' },
    { icon: 'book-outline', label: 'Matrículas', route: 'matriculas' },
    { icon: 'account-outline', label: 'Professores', route: 'professores' },
    { icon: 'file-chart-outline', label: 'Relatórios', route: 'relatorios' },
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
});