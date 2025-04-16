import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import {
  iDisciplines,
  SetDisciplinebd,
  UpdateDisciplinebd,
  DeleteDisciplinebd,
  getDisciplines,
} from '../../src/controllers/disciplines';
import MyView from '../../src/components/MyView';
import MyButton from '../../src/components/MyButtons';
import MyList from '../../src/components/MyList';
import { Myinput } from '../../src/components/MyInputs';
import { MyItem } from '../../src/components/MyItem';

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
  const [disciplinaFiltro, setDisciplinaFiltro] = useState('');
  const [activeScreen, setActiveScreen] = useState<
    'disciplinas' | 'professores' | 'documentos' | 'cursos' | 'calendario'
  >('disciplinas');

  const router = useRouter();

  useEffect(() => {
    const fetchDisciplines = async () => {
      const response = await getDisciplines({});
      if (!response.status) {
        console.log('Erro ao carregar disciplinas:', response.data);
        return;
      }
      setDisciplines(response.data as iDisciplines[]);
    };
    fetchDisciplines();
  }, []);

  const professoresAgrupados = () => {
    const agrupado: {
      [nome: string]: { disciplinas: string[], data: string, id: number }
    } = {};
    disciplines.forEach((item) => {
      const nome = item.teacher?.trim();
      const disciplina = item.name?.trim();
      if (nome && disciplina) {
        if (!agrupado[nome]) {
          agrupado[nome] = {
            disciplinas: [],
            data: item.created_at,
            id: item.id
          };
        }
        agrupado[nome].disciplinas.push(disciplina);
      }
    });

    const listaFormatada = Object.entries(agrupado).map(([nome, dados]) => ({
      nome,
      disciplinas: dados.disciplinas,
      data: new Date(dados.data).toLocaleDateString('pt-BR'),
      id: dados.id,
    }));

    return listaFormatada.filter((prof) => {
      const termo = filtro.toLowerCase();
      const filtroDisciplina = disciplinaFiltro.toLowerCase();

      return (
        (prof.nome.toLowerCase().includes(termo) ||
         prof.disciplinas.some((disc) => disc.toLowerCase().includes(termo))) &&
        (filtroDisciplina === '' || prof.disciplinas.some((disc) => disc.toLowerCase().includes(filtroDisciplina)))
      );
    });
  };

  const listaDeDisciplinas = Array.from(new Set(disciplines.map((d) => d.name)));

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

  function handleRegister() {
    if (!req.name.trim() || !req.url.trim() || !req.teacher.trim()) {
      console.log('Preencha todos os campos!');
      return;
    }

    if (isEditing) {
      setDisciplines(disciplines.map((d) => (d.id === req.id ? req : d)));
      (async () => {
        await UpdateDisciplinebd(req);
        console.log('Disciplina atualizada.');
      })();
      resetForm();
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

  function handleEdit(id: number) {
    const discipline = disciplines.find((d) => d.id === id);
    if (discipline) {
      setReq(discipline);
      setIsEditing(true);
    }
  }

  function handleDelete(id: number) {
    (async () => {
      setDisciplines(disciplines.filter((d) => d.id !== id));
      await DeleteDisciplinebd(id);
      console.log(`Disciplina ${id} excluída.`);
    })();
  }

  const menuItems = [
    { icon: 'home-outline', label: 'Home', route: '/home' },
    { icon: 'account-outline', label: 'Professores', route: 'professores' },
    { icon: 'file-document-outline', label: 'Documentos', route: '/documents' },
    { icon: 'library-shelves', label: 'Cursos', route: '/courses' },
    { icon: 'calendar-month-outline', label: 'Calendário', route: '/calendar' },
  ];

  return (
    <MyView style={styles.container}>
      <ScrollView stickyHeaderIndices={[0]}>
        <View style={styles.menuBar}>
          <View style={styles.menuItems}>
            {menuItems.map((item) => (
              <MyButton
                key={item.label}
                title={item.label}
                icon={item.icon}
                button_type="capsule"
                onPress={() =>
                  item.route === 'professores'
                    ? setActiveScreen('professores')
                    : router.push(item.route)
                }
                style={{ marginBottom: 4, height: 32, width: 110 }}
                font_size={12}
                iconSize={14}
              />
            ))}
          </View>
        </View>

        <View style={styles.main}>
          {activeScreen === 'professores' ? (
            <>
              <Text style={styles.pageTitle}>Professores</Text>
              <Text style={styles.subtitle}>
                {professoresAgrupados().length} professores cadastrados
              </Text>

              <Myinput
                iconName="account-search"
                label="Buscar"
                placeholder="Buscar por nome..."
                value={filtro}
                onChangeText={setFiltro}
              />

              <Myinput
                iconName="filter"
                label="Filtrar por disciplina"
                placeholder="Digite o nome da disciplina"
                value={disciplinaFiltro}
                onChangeText={setDisciplinaFiltro}
              />

              <View style={styles.gridContainer}>
                {professoresAgrupados().map((prof, index) => (
                  <View key={index} style={styles.professorCard}>
                    <View style={styles.avatarContainer}>
                      <Text style={styles.avatarText}>
                        {prof.nome.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View style={styles.professorInfo}>
                      <Text style={styles.professorName}>{prof.nome}</Text>
                      <Text style={styles.professorMeta}>
                        {prof.disciplinas.length} disciplina(s) • Desde: {prof.data}
                      </Text>
                      <View style={styles.disciplinesContainer}>
                        {prof.disciplinas.map((disc, idx) => (
                          <View key={idx} style={styles.disciplineTag}>
                            <Text style={styles.disciplineText}>{disc}</Text>
                          </View>
                        ))}
                      </View>
                      <View style={styles.actions}>
                        <TouchableOpacity onPress={() => handleEdit(prof.id)}>
                          <Text style={styles.editButton}>✏️ Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => console.log('Ver mais')}>
                          <Text style={styles.viewButton}>👁 Ver mais</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </>
          ) : (
            <>
              <Text style={styles.pageTitle}>Cadastro de Disciplinas</Text>
              <View style={styles.card}>
                <Text style={styles.sectionTitle}>
                  {isEditing ? 'Editar Disciplina' : ''}
                </Text>
                <Myinput
                  iconName="book"
                  label="Nome da disciplina"
                  placeholder="Digite o nome"
                  value={req.name}
                  onChangeText={(text) => setReq({ ...req, name: text })}
                />
                <Myinput
                  iconName="link"
                  label="URL"
                  placeholder="Digite a URL"
                  value={req.url}
                  onChangeText={(text) => setReq({ ...req, url: text })}
                />
                <Myinput
                  iconName="account"
                  label="Professor"
                  placeholder="Digite o nome do professor"
                  value={req.teacher}
                  onChangeText={(text) => setReq({ ...req, teacher: text })}
                />
                <Myinput
                  iconName="clock-outline"
                  label="Carga Horária"
                  placeholder="Digite a carga horária"
                  value={req.workload.toString()}
                  onChangeText={(text) =>
                    setReq({ ...req, workload: parseInt(text || '0') })
                  }
                />
                <MyButton
                  title={isEditing ? 'Atualizar' : 'Cadastrar'}
                  button_type="default"
                  onPress={handleRegister}
                  style={styles.primaryButton}
                />
              </View>

              <Text style={styles.sectionTitle}>Disciplinas Cadastradas</Text>
              <MyList
                data={disciplines}
                keyItem={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <MyItem
                    style={styles.cardGridItem}
                    onEdit={() => handleEdit(item.id)}
                    onDel={() => handleDelete(item.id)}
                  >
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={styles.cardText}>URL: {item.url}</Text>
                    <Text style={styles.cardText}>
                      Carga Horária: {item.workload} horas
                    </Text>
                    <Text style={styles.cardText}>Professor: {item.teacher}</Text>
                  </MyItem>
                )}
              />
            </>
          )}
        </View>
      </ScrollView>
    </MyView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F4' },
  menuBar: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    zIndex: 10,
  },
  menuItems: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  main: { padding: 16 },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6A1B9A',
    marginBottom: 8,
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
  primaryButton: {
    backgroundColor: '#6A1B9A',
    marginTop: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    marginTop: 12,
  },
  professorCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    width: width > 768 ? 360 : '100%',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  avatarContainer: {
    backgroundColor: '#D1C4E9',
    borderRadius: 50,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6A1B9A',
  },
  professorInfo: { flex: 1 },
  professorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5E35B1',
  },
  professorMeta: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  disciplinesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  disciplineTag: {
    backgroundColor: '#EDE7F6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  disciplineText: {
    fontSize: 12,
    color: '#6A1B9A',
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
  },
  editButton: {
    fontSize: 13,
    color: '#4A148C',
    fontWeight: '600',
  },
  viewButton: {
    fontSize: 13,
    color: '#6A1B9A',
    fontWeight: '600',
  },
  cardGridItem: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    margin: 8,
    //width: width > 768 ? 300 : '100%',
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
});
