import React, { useState, useEffect } from 'react';
import {View,Text,StyleSheet,ScrollView,Dimensions,} from 'react-native';
import { useRouter } from 'expo-router';
import {iDisciplines,SetDisciplinebd,UpdateDisciplinebd,DeleteDisciplinebd, getDisciplines, toListDisciplines} from '../src/controllers/disciplines';
import MyView from '../src/components/MyView';
import MyButton from '../src/components/MyButtons';
import MyList from '../src/components/MyList';
import { Myinput } from '../src/components/MyInputs';

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
  const [activeScreen, setActiveScreen] = useState<'disciplinas' | 'professores' | 'documentos' | 'cursos' | 'calendario'>('disciplinas');
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
          <Text style={styles.menuTitle}>Meu Sistema</Text>
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
                style={{ marginBottom: 6 }}
              />
            ))}
          </View>
        </View>

        <View style={styles.main}>
          {activeScreen === 'professores' ? (
            <>
              <Text style={styles.pageTitle}>Professores Cadastrados</Text>
              <Myinput
                iconName="account-search"
                label="Buscar"
                placeholder="Buscar por professor ou disciplina..."
                value={filtro}
                onChangeText={setFiltro}
              />
              {professoresAgrupados().map((prof, index) => (
                <View key={index} style={styles.card}>
                  <Text style={styles.sectionTitle}>{prof.nome}</Text>
                  <View style={styles.tagsContainer}>
                    {prof.disciplinas.map((disc, idx) => (
                      <View key={idx} style={styles.tag}>
                        <Text style={styles.tagText}>{disc}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
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
                  onChangeText={(text) => setReq({ ...req, workload: parseInt(text || '0') })}
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
                  <View style={styles.cardGridItem}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={styles.cardText}>URL: {item.url}</Text>
                    <Text style={styles.cardText}>Carga Horária: {item.workload} horas</Text>
                    <Text style={styles.cardText}>Professor: {item.teacher}</Text>
                    <View style={styles.actions}>
                      <MyButton
                        title="EDITAR"
                        button_type="edit"
                        onPress={() => handleEdit(item.id)}
                        style={styles.editButton}
                      />
                      <MyButton
                        title="EXCLUIR"
                        button_type="delete"
                        onPress={() => handleDelete(item.id)}
                        style={styles.deleteButton}
                      />
                    </View>
                  </View>
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
  primaryButton: {
    backgroundColor: '#6A1B9A',
    marginTop: 10,
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
    marginRight: 8,
  },
  deleteButton: {},
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