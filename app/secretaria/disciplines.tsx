import React, { useState, useEffect } from 'react';
import {View,Text,StyleSheet,TextInput,Pressable,Image,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import {iDisciplines,SetDisciplinebd,UpdateDisciplinebd,DeleteDisciplinebd,getDisciplines,} from '../../src/controllers/disciplines';
import MyView from '../../src/components/MyView';
import MyButton from '../../src/components/MyButtons';
import { Myinput } from '../../src/components/MyInputs';
//Ultimo commit de Secretaria 

const Sidebar = () => {
  const router = useRouter();
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);

  const menuItems = [
    { icon: 'calendar-month-outline', label: 'Calendário', route: 'secretaria/calendar' },
    { icon: 'file-document-outline', label: 'Documentos', route: 'secretaria/documents' },
    { icon: 'cog-outline', label: 'Configurações', route: 'perfil' },
  ];

  return (
    <View style={styles.sidebar}>
      <Text style={styles.sidebarTitle}>Virtudemy</Text>
      {menuItems.map((item) => {
        const isHovered = hoveredRoute === item.route;
        return (
          <Pressable
            key={item.label}
            onPress={() => router.push(item.route)}
            onHoverIn={() => setHoveredRoute(item.route)}
            onHoverOut={() => setHoveredRoute(null)}
            style={[styles.menuItem, isHovered && styles.menuItemActive]}
          >
            <Icon
              name={item.icon}
              size={20}
              color={isHovered ? '#1EB980' : '#444'}
              style={{ width: 24 }}
            />
            <Text style={[styles.menuLabel, isHovered && styles.menuLabelActive]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

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
  const [showForm, setShowForm] = useState(false);
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

  function resetForm() {
    setReq({ id: -1, name: '', url: '', workload: 0, created_at: new Date().toISOString(), teacher: '' });
    setIsEditing(false);
  }

  function handleRegister() {
    if (!req.name.trim() || !req.url.trim() || !req.teacher.trim()) return;

    if (isEditing) {
      setDisciplines(disciplines.map((d) => (d.id === req.id ? req : d)));
      (async () => await UpdateDisciplinebd(req))();
      resetForm();
      setShowForm(false);
      return;
    }

    (async () => {
      const result = await SetDisciplinebd(req);
      if (result && result[0]) setDisciplines([...disciplines, result[0]]);
    })();
    resetForm();
    setShowForm(false);
  }

  function handleEdit(id: number) {
    const discipline = disciplines.find((d) => d.id === id);
    if (discipline) {
      setReq(discipline);
      setIsEditing(true);
      setShowForm(true);
    }
  }

  function handleDelete(id: number) {
    (async () => {
      setDisciplines(disciplines.filter((d) => d.id !== id));
      await DeleteDisciplinebd(id);
    })();
  }

  return (
    <MyView style={{ flex: 1, backgroundColor: '#f0f2f5' }}>
      <View style={{ flexDirection: 'row', flex: 1, backgroundColor: '#f0f2f5' }}>
        <Sidebar />
        <View style={{ flex: 1, backgroundColor: '#f0f2f5' }}>
          <View style={{ padding: 20 }}>
            <View style={styles.headerRow}>
              <Text style={styles.title}>Disciplinas</Text>
              <Pressable style={styles.buttonNew} onPress={() => { resetForm(); setShowForm(true); }}>
                <Text style={styles.buttonNewText}>+ Nova Disciplina</Text>
              </Pressable>
            </View>

            <View style={styles.searchWrapper}>
              <TextInput
                placeholder="Buscar por nome ou professor"
                value={filtro}
                onChangeText={setFiltro}
                style={styles.searchInput}
                placeholderTextColor="#999"
              />
              <Icon name="magnify" size={20} color="#999" style={styles.searchIcon} />
            </View>

            {showForm && (
              <View style={styles.card}>
                <Text style={styles.formTitle}>Cadastro de Disciplinas</Text>
                <Myinput iconName="" label="Nome" placeholder="Digite o nome" value={req.name} onChangeText={(text) => setReq({ ...req, name: text })} />
                <Myinput iconName="" label="URL" placeholder="Digite a URL" value={req.url} onChangeText={(text) => setReq({ ...req, url: text })} />
                <Myinput iconName="" label="Professor" placeholder="Digite o nome do professor" value={req.teacher} onChangeText={(text) => setReq({ ...req, teacher: text })} />
                <Myinput iconName="" label="Carga Horária" placeholder="Digite a carga horária" value={req.workload.toString()} onChangeText={(text) => setReq({ ...req, workload: parseInt(text || '0') })} />
                <View style={styles.formButtons}>
                  <MyButton title={isEditing ? 'Atualizar' : 'Cadastrar'} button_type="default" onPress={handleRegister} style={{ flex: 1, marginRight: 8 }} />
                  <MyButton title="Cancelar" onPress={() => { resetForm(); setShowForm(false); }} style={{ flex: 1, marginLeft: 8, backgroundColor: '#EEE' }} />
                </View>
              </View>
            )}

            <View style={styles.table}>
              <View style={styles.tableRowHeader}>
                <Text style={styles.th}>Disciplina</Text>
                <Text style={styles.th}>Professor</Text>
                <Text style={styles.th}>URL</Text>
                <Text style={styles.th}>Carga</Text>
                <Text style={styles.th}>Criado em</Text>
                <Text style={styles.th}>Status</Text>
                <Text style={styles.th}>Ações</Text>
              </View>
              {disciplines.filter((d) => d.name.toLowerCase().includes(filtro.toLowerCase()) || d.teacher.toLowerCase().includes(filtro.toLowerCase())).map((item) => (
                <View style={styles.tableRow} key={item.id}>
                  <Text style={styles.td}>{item.name}</Text>
                  <View style={[styles.td, { flexDirection: 'row', alignItems: 'center', gap: 8 }]}> 
                    <Image source={{ uri: 'https://i.pravatar.cc/150?u=' + item.teacher }} style={styles.avatar} />
                    <Text>{item.teacher}</Text>
                  </View>
                  <Text style={styles.td}>{item.url}</Text>
                  <Text style={styles.td}>{item.workload}h</Text>
                  <Text style={styles.td}>{new Date(item.created_at).toLocaleDateString()}</Text>
                  <View style={styles.tdStatus}><Text style={styles.statusActive}>Ativo</Text></View>
                  <View style={styles.actions}>
                    <Pressable onPress={() => handleEdit(item.id)}><Text style={styles.edit}>Editar</Text></Pressable>
                    <Pressable onPress={() => handleDelete(item.id)}><Text style={styles.del}>Excluir</Text></Pressable>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </MyView>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 220,
    backgroundColor: '#FFF',
    padding: 16,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    color: '#3A3A3A',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 6,
  },
  menuItemActive: {
    backgroundColor: '#E6F8F3',
    borderLeftWidth: 4,
    borderLeftColor: '#b34db2',
  },
  menuLabel: {
    fontSize: 14,
    color: '#444',
  },
  menuLabelActive: {
    color: '#b34db2',
    fontWeight: '600',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  title: { fontSize: 22, fontWeight: '700', color: '#333' },
  buttonNew: {
    backgroundColor: '#b34db2',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
  },
  buttonNewText: { color: '#fff', fontWeight: '600' },
  searchWrapper: {
    marginBottom: 16,
    position: 'relative',
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    paddingRight: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 14,
  },
  searchIcon: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  formButtons: {
    flexDirection: 'row',
    marginTop: 16,
  },
  table: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 8,
  },
  tableRowHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  th: { flex: 1, fontWeight: '600', fontSize: 13, color: '#333' },
  td: { flex: 1, fontSize: 13, color: '#444' },
  tdStatus: { flex: 1 },
  statusActive: {
    backgroundColor: '#D8FEEB',
    color: '#1EB980',
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 12,
    fontWeight: '600',
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 12,
    paddingLeft: 8,
  },
  edit: { color: '#3AC7A8', fontWeight: '600', fontSize: 13 },
  del: { color: '#D63031', fontWeight: '600', fontSize: 13 },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});
