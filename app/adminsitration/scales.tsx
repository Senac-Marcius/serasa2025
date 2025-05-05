import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, Pressable, TextInput } from 'react-native';
import MySelect from '../../src/components/MySelect';
import MyTimerPicker from '../../src/components/MyTimerPiker';
import MyButton from '../../src/components/MyButtons';
import { MyItem } from '../../src/components/MyItem';
import MyView from '../../src/components/MyView';
import { useRouter } from 'expo-router';
import { iScale, setScale, updateScale, deleteScale, getScale } from '../../src/controllers/scales';
import Mytext from '../../src/components/MyText';
import { getEmployees, iEmployees } from '../../src/controllers/employees';
import { getUserById, getUsers, iUser } from '../../src/controllers/users';
import { MaterialIcons } from '@expo/vector-icons';

export default function ScaleScreen() {
  const [scales, setScales] = useState<iScale[]>([]);
  const [employees, setEmployees] = useState<iEmployees[]>([]);
  const [users, setUsers] = useState<iUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<iUser[]>([]);
  const [userSearch, setUserSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<iUser | null>(null);
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [req, setReq] = useState({
    id: -1,
    day: '',
    start_time: '',
    end_time: '',
    created_at: new Date().toISOString(),
    employ_id: 1,
  });
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);

  const router = useRouter();

  const daysOfWeek = [
    { key: '1', option: 'Segunda-feira' },
    { key: '2', option: 'Terça-feira' },
    { key: '3', option: 'Quarta-feira' },
    { key: '4', option: 'Quinta-feira' },
    { key: '5', option: 'Sexta-feira' },
    { key: '6', option: 'Sábado' },
    { key: '7', option: 'Domingo' },
  ];

  useEffect(() => {
    async function fetchData() {
      // Load scales
      const scalesResult = await getScale({});
      if (scalesResult.status && scalesResult.data) {
        setScales(scalesResult.data);
      }

      // Load employees and their associated users
      const employeesResult = await getEmployees({});
      if (employeesResult.status && employeesResult.data) {
        setEmployees(employeesResult.data);
        
        // Get unique user IDs from employees
        const userIds = [...new Set(employeesResult.data.map(emp => emp.user_id))];
        
        // Fetch user details for each employee
        const usersPromises = userIds.map(id => getUserById(id));
        const usersResults = await Promise.all(usersPromises);
        
        const validUsers = usersResults
          .filter(result => result.status && result.data)
          .map(result => result.data);
        
        setUsers(validUsers);
        setFilteredUsers(validUsers);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (userSearch) {
      const filtered = users.filter(user => 
        user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(userSearch.toLowerCase()) ||
        (user.cpf && user.cpf.includes(userSearch))
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [userSearch, users]);

  const handleSetDay = (day: string) => {
    setSelectedDay(day);
    setReq(prevReq => ({ ...prevReq, day }));
  };

  const selectUser = (user: iUser) => {
    setSelectedUser(user);
    setUserModalVisible(false);
    setUserSearch('');
    
    // Find employee associated with this user
    const employee = employees.find(emp => emp.user_id === user.id);
    if (employee) {
      setReq(prevReq => ({ ...prevReq, employ_id: employee.id }));
    }
  };

  async function handleRegister() {
    if (!req.day || !req.start_time || !req.end_time || !req.employ_id) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    if (req.id === -1) {
      const newid = scales.length ? Math.max(...scales.map(s => s.id)) + 1 : 0;
      const newScale = { ...req, id: newid };
      const saved = await setScale(newScale);
      if (saved) setScales([...scales, saved[0]]);
    } else {
      const updated = await updateScale(req.id, req);
      if (updated) {
        setScales(scales.map(s => (s.id === req.id ? updated[0] : s)));
      }
    }

    resetForm();
    setModalVisible(false);
  }

  function resetForm() {
    setReq({
      id: -1,
      day: '',
      start_time: '',
      end_time: '',
      created_at: new Date().toISOString(),
      employ_id: 1,
    });
    setSelectedDay('');
    setSelectedUser(null);
  }

  async function handleDeleteScale(id: number) {
    const success = await deleteScale(id);
    if (success) {
      setScales(scales.filter(s => s.id !== id));
    }
  }

  function editScale(id: number) {
    const scale = scales.find(s => s.id === id);
    if (scale) {
      setReq(scale);
      setSelectedDay(scale.day);
      
      // Find employee and user for this scale
      const employee = employees.find(e => e.id === scale.employ_id);
      if (employee) {
        const user = users.find(u => u.id === employee.user_id);
        if (user) setSelectedUser(user);
      }
      
      setModalVisible(true);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <MyView>
        <View style={styles.header}>
          <MyButton 
            style={styles.backButton}
            title="VOLTAR" 
            onPress={() => router.push('adminsitration/')} 
            icon="arrow-left"
          />
          <Text style={styles.title}>GERENCIAR ESCALAS</Text>
        </View>

        <View style={styles.buttonGroup}>
          <MyButton
            style={styles.Button}
            title='ADICIONAR ESCALA'
            onPress={() => setModalVisible(true)}
            icon="plus"
          />
        </View>

        <View style={styles.listContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Funcionário</Text>
            <Text style={styles.tableHeaderText}>Dia</Text>
            <Text style={styles.tableHeaderText}>Início</Text>
            <Text style={styles.tableHeaderText}>Término</Text>
            <Text style={styles.tableHeaderText}>Ações</Text>
          </View>

          {scales.map((item) => {
            const employee = employees.find(e => e.id === item.employ_id);
            const user = users.find(u => employee?.user_id === u.id);
            return (
              <View key={item.id.toString()} style={styles.tableRow}>
                <Text style={styles.tableCell}>{user?.name || 'N/A'}</Text>
                <Text style={styles.tableCell}>{item.day}</Text>
                <Text style={styles.tableCell}>{item.start_time}</Text>
                <Text style={styles.tableCell}>{item.end_time}</Text>
                <View style={styles.tableCell}>
                  <MyItem 
                    style={styles.tableButton}
                    onEdit={() => editScale(item.id)} 
                    onDel={() => handleDeleteScale(item.id)} 
                  />
                </View>
              </View>
            );
          })}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
            resetForm();
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {req.id === -1 ? 'NOVA ESCALA' : 'EDITAR ESCALA'}
              </Text>

              <View style={styles.userSelectionContainer}>
                {!selectedUser ? (
                  <MyButton
                    title="SELECIONAR FUNCIONÁRIO"
                    onPress={() => setUserModalVisible(true)}
                    icon="account-circle"
                    style={styles.selectUserButton}
                  />
                ) : (
                  <View style={styles.selectedUserContainer}>
                    <View style={styles.selectedUserInfo}>
                      <Text style={styles.selectedUserName}>{selectedUser.name}</Text>
                      <Text style={styles.selectedUserEmail}>{selectedUser.email}</Text>
                    </View>
                    <MyButton
                      title="TROCAR"
                      onPress={() => {
                        setSelectedUser(null);
                        setReq(prev => ({...prev, employ_id: 1}));
                      }}
                      style={styles.changeUserButton}
                      icon="swap-horiz"
                    />
                  </View>
                )}
              </View>

              <MySelect
                caption="Dia da semana"
                label={selectedDay || 'Selecione um dia da semana'}
                list={daysOfWeek}
                setLabel={handleSetDay}
              />

              <Mytext style={styles.label}>Horário de início:</Mytext>
              <MyTimerPicker
                initialTime={req.start_time}
                onTimeSelected={(time) => setReq({ ...req, start_time: time })}
              />

              <Mytext style={styles.label}>Horário de término:</Mytext>
              <MyTimerPicker
                initialTime={req.end_time}
                onTimeSelected={(time) => setReq({ ...req, end_time: time })}
              />
              
              <View style={styles.modalButtons}>
                <MyButton 
                  title="CANCELAR" 
                  onPress={() => {
                    setModalVisible(false);
                    resetForm();
                  }} 
                  style={styles.cancelButton}
                  icon="close"
                />
                <MyButton 
                  title={req.id === -1 ? 'SALVAR' : 'ATUALIZAR'} 
                  onPress={handleRegister} 
                  style={styles.saveButton}
                  icon="check"
                />
              </View>
            </View>
          </View>
        </Modal>

        {/* User Selection Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={userModalVisible}
          onRequestClose={() => setUserModalVisible(false)}
        >
          <View style={styles.userModalContainer}>
            <View style={styles.userModalContent}>
              <Text style={styles.userModalTitle}>Selecionar Funcionário</Text>
              
              <View style={styles.searchContainer}>
                <MaterialIcons name="search" size={24} color="#3AC7A8" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Buscar por nome, email ou CPF"
                  value={userSearch}
                  onChangeText={setUserSearch}
                  autoFocus={true}
                />
              </View>
              
              <ScrollView style={styles.userList}>
                {filteredUsers.map(user => (
                  <Pressable 
                    key={user.id} 
                    style={styles.userItem}
                    onPress={() => selectUser(user)}
                  >
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                    {user.cpf && <Text style={styles.userCpf}>{user.cpf}</Text>}
                  </Pressable>
                ))}
              </ScrollView>
              
              <MyButton
                title="Cancelar"
                onPress={() => setUserModalVisible(false)}
                style={styles.modalCancelButton}
                icon="close"
              />
            </View>
          </View>
        </Modal>
      </MyView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    paddingTop: 10,
  },
  backButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#343a40',
    flex: 1,
    textAlign: 'center',
    marginRight: 120,
  },
  buttonGroup: {
    marginVertical: 20,
  },
  Button: {
    backgroundColor: '#6f42c1',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    fontSize: 16,
    marginVertical: 5,
    minWidth: 260,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  label: {
    color: '#495057',
    fontSize: 15,
    fontWeight: '500',
    marginVertical: 8,
    paddingHorizontal: 5,
    marginLeft: 5,
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    paddingVertical: 12,
    marginBottom: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
    paddingHorizontal: 5,
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#495057',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
    paddingHorizontal: 5,
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    color: '#495057',
    textAlign: 'center',
    paddingHorizontal: 2,
    alignSelf: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#343a40',
    textAlign: 'center',
    marginBottom: 25,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    gap: 15,
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  saveButton: {
    backgroundColor: '#28a745',
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  iconStyle: {
    marginRight: 8,
  },
  tableButton: {
    margin: 'auto'
  },
  // User selection styles
  userSelectionContainer: {
    marginBottom: 20,
  },
  selectUserButton: {
    backgroundColor: '#3AC7A8',
    width: '100%',
  },
  selectedUserContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f1f3f5',
    borderRadius: 8,
    padding: 12,
  },
  selectedUserInfo: {
    flex: 1,
  },
  selectedUserName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#343a40',
  },
  selectedUserEmail: {
    fontSize: 14,
    color: '#6c757d',
  },
  changeUserButton: {
    backgroundColor: '#6c757d',
    paddingHorizontal: 12,
    marginLeft: 10,
  },
  // User modal styles
  userModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  userModalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
  },
  userModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#343a40',
    textAlign: 'center',
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  userList: {
    maxHeight: 300,
    marginBottom: 15,
  },
  userItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#343a40',
  },
  userEmail: {
    fontSize: 14,
    color: '#6c757d',
  },
  userCpf: {
    fontSize: 14,
    color: '#6c757d',
    fontFamily: 'monospace',
  },
  modalCancelButton: {
    backgroundColor: '#6c757d',
    width: '100%',
  },
});