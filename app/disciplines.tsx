import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { iDisciplines, SetDisciplinebd, UpdateDisciplinebd, DeleteDisciplinebd } from '../src/controllers/disciplines';
import { supabase } from '../src/utils/supabase';
import type { KeyboardTypeOptions } from 'react-native';
import MyView from '../src/components/MyView';

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
  const [filtro, setFiltro] = useState('');
  const [activeScreen, setActiveScreen] = useState<'disciplinas' | 'professores'>('disciplinas');
  const router = useRouter();

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

  const menuItems = [
    { icon: 'home-outline', label: 'Home', route: 'home' },
    { icon: 'account-outline', label: 'Professores', route: 'professores' },
    { icon: 'file-document-outline', label: 'Documentos', route: 'documents' },
    { icon: 'library-shelves', label: 'Cursos', route: 'courses' },
    { icon: 'calendar-month-outline', label: 'Calendário', route: 'calendar' },
  ];

  return (
    <MyView style={styles.container}>
      <ScrollView stickyHeaderIndices={[0]}>
        <View style={styles.menuBar}>
          <Text style={styles.menuTitle}>Meu Sistema</Text>
          <View style={styles.menuItems}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.label}
                style={styles.menuButton}
                onPress={() => {
                  if (item.route === 'professores') setActiveScreen('professores');
                  else {
                    setActiveScreen('disciplinas');
                    router.push(`/${item.route}`);
                  }
                }}
              >
                <Icon name={item.icon} size={16} color="#6A1B9A" />
                <Text style={styles.menuText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {activeScreen === 'disciplinas' ? (
          <View style={styles.main}>
            <Text style={styles.pageTitle}>Cadastro de Disciplinas</Text>
            <View style={styles.card}>
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
        ) : (
          <View style={styles.main}>
            <Text style={styles.pageTitle}>Professores Cadastrados</Text>
            <TextInput
              placeholder="Buscar por professor ou disciplina..."
              style={styles.input}
              value={filtro}
              onChangeText={setFiltro}
            />
            {professoresAgrupados().map((prof, index) => (
              <View key={index} style={styles.cardGridItem}>
                <Text style={styles.cardTitle}>{prof.nome}</Text>
                <View style={styles.tagsContainer}>
                  {prof.disciplinas.map((disc, idx) => (
                    <View key={idx} style={styles.tag}>
                      <Text style={styles.tagText}>{disc}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </MyView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  menuBar: {
    flexDirection: 'column',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    zIndex: 10,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#6A1B9A',
  },
  menuItems: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E5F5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  menuText: {
    fontSize: 14,
    color: '#6A1B9A',
    fontWeight: 'bold',
  },
  main: {
    padding: 20,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6A1B9A',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
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
  primaryButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
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
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
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
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
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