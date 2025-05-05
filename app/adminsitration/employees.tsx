import React, {useState, useEffect} from 'react';
import { ScrollView, View, ActivityIndicator, Pressable, Modal, TextInput, Switch } from 'react-native';
import { Text, StyleSheet } from 'react-native';
import MyButton from '../../src/components/MyButtons';
import MyView from '../../src/components/MyView';
import {MyItem, MyTb} from '../../src/components/MyItem';
import MyList from '../../src/components/MyList';
import { Myinput } from '../../src/components/MyInputs';
import { useRouter } from 'expo-router';
import { setEmployee, iEmployees, updateEmployee, dellEmployee, getEmployees } from '../../src/controllers/employees';
import { getCargo, iPosition } from '../../src/controllers/positions';
import MySelect from '../../src/components/MySelect';
import { getUsers, iUser } from '../../src/controllers/users';
import { Icon } from "react-native-paper";
import { MaterialIcons } from '@expo/vector-icons';


export default function EmployeeScreen() {
    const [employees, setEmployees] = useState<iEmployees[]>([]);
    const [positions, setPositions] = useState<iPosition[]>([]);
    const [positionLabel, setPositionLabel] = useState('Selecione...');
    const [users, setUsers] = useState<iUser[]>([]);
    const [selectedUser, setSelectedUser] = useState<iUser | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    
    const [req, setReq] = useState<Omit<iEmployees, 'id'> & { id: number }>({
        id: -1,
        urls: '',
        nationality: '',
        disc_personality: '',
        sex: '',
        martinal_status: '',
        ethnicity: '',
        deficiency: '',
        is_active: 'true', // Inicializado como string
        user_id: -1,
        positions_id: 1,
    });

    const [userModalVisible, setUserModalVisible] = useState(false);
    const [userSearch, setUserSearch] = useState('');
    const [filteredUsers, setFilteredUsers] = useState<iUser[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                
                const [employeesRes, positionsRes, usersRes] = await Promise.all([
                    getEmployees({}),
                    getCargo({}),
                    getUsers({})
                ]);

                if (employeesRes.status && employeesRes.data) {
                    setEmployees(employeesRes.data);
                }

                if (positionsRes.status && positionsRes.data) {
                    setPositions(positionsRes.data);
                }

                if (usersRes.status && usersRes.data) {
                    setUsers(usersRes.data);
                    setFilteredUsers(usersRes.data);
                    
                    if (req.user_id > 0) {
                        const user = usersRes.data.find(u => u.id === req.user_id);
                        setSelectedUser(user || null);
                    }
                }
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    useEffect(() => {
        if (userSearch === '') {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter(user => 
                user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
                user.email.toLowerCase().includes(userSearch.toLowerCase()) ||
                (user.cpf && user.cpf.includes(userSearch))
            );
            setFilteredUsers(filtered);
        }
    }, [userSearch, users]);

    const selectUser = (user: iUser) => {
        setSelectedUser(user);
        setReq({...req, user_id: user.id});
        setUserModalVisible(false);
        setUserSearch('');
    };

    const handleRegister = async () => {
        try {
            if (req.user_id === -1) {
                console.error("Nenhum usuário selecionado");
                return;
            }

            // Garante que is_active será 'true' ou 'false'
            const employeeToSave = {
                ...req,
                is_active: req.is_active === 'true' ? 'true' : 'false'
            };

            if (req.id === -1) {
                const newEmployee = {
                    ...employeeToSave,
                    id: employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1
                };
                await setEmployee(newEmployee);
                setEmployees([...employees, newEmployee]);
            } else {
                await updateEmployee(req.id, employeeToSave);
                setEmployees(employees.map(e => e.id === req.id ? employeeToSave : e));
            }
            
            setReq({
                id: -1,
                urls: '',
                nationality: '',
                disc_personality: '',
                sex: '',
                martinal_status: '',
                ethnicity: '',
                deficiency: '',
                is_active: 'true',
                user_id: -1,
                positions_id: 1,
            });
            setSelectedUser(null);
        } catch (error) {
            console.error("Error saving employee:", error);
        }
    };

    const editEmployee = async (id: number) => {
        const employee = employees.find(e => e.id === id);
        if (employee) {
            setReq(employee);
            
            const selectedPosition = positions.find(p => p.id === employee.positions_id);
            if (selectedPosition) {
                setPositionLabel(selectedPosition.name);
            }
            
            const user = users.find(u => u.id === employee.user_id);
            setSelectedUser(user || null);
        }
    };

    const deleteEmployee = async (id: number) => {
        try {
            await dellEmployee(id);
            setEmployees(employees.filter(e => e.id !== id));
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#3AC7A8" />
            </View>
        );
    }

    return (
        <MyView router={router}>
            <View style={styles.header}>
                <Pressable 
                    onPress={() => router.push('adminsitration/')}
                    style={styles.backButton}
                >
                    <MaterialIcons name="arrow-back" size={24} color="#3AC7A8" />
                    <Text style={styles.backButtonText}>Voltar</Text>
                </Pressable>
                
                <Text style={styles.title}>
                    {req.id === -1 ? 'Cadastrar Funcionário' : 'Editar Funcionário'}
                </Text>
                
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.card}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={userModalVisible}
                        onRequestClose={() => setUserModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Selecionar Usuário</Text>
                                
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
                                    button_type="round"
                                />
                            </View>
                        </View>
                    </Modal>

                    {!selectedUser ? (
                        <MyButton
                            title="Selecionar Usuário"
                            onPress={() => setUserModalVisible(true)}
                            icon="account-circle"
                            button_type="round"
                            style={styles.selectUserButton}
                        />
                    ) : (
                        <>
                            <View style={styles.selectedUserHeader}>
                                <Text style={styles.selectedUserText}>Usuário selecionado:</Text>
                                <MyButton
                                    title="Trocar Usuário"
                                    onPress={() => {
                                        setSelectedUser(null);
                                        setReq({...req, user_id: -1});
                                    }}
                                    icon="swap-horizontal"
                                    button_type="round"
                                    style={styles.changeUserButton}
                                />
                            </View>
                            
                            <Myinput
                                label="Nome do Usuário"
                                value={selectedUser.name}
                                placeholder="Nome"
                                onChangeText={() => {}}
                                iconName="person-outline"
                            />
                            <Myinput
                                label="Data de Nascimento"
                                value={selectedUser.age}
                                placeholder=""
                                onChangeText={() => {}}
                                iconName="event"
                            />
                            <Myinput
                                label="Email do Usuário"
                                value={selectedUser.email}
                                placeholder="Email"
                                onChangeText={() => {}}
                                iconName="email"
                            />
                            <Myinput
                                label="Contato"
                                value={selectedUser.contact || ''}
                                placeholder="Contato"
                                onChangeText={() => {}}
                                iconName="phone"
                            />
                            <Myinput
                                label="CPF"
                                value={selectedUser.cpf || ''}
                                placeholder="CPF"
                                onChangeText={() => {}}
                                iconName="assignment-ind"
                            />
                            <Myinput
                                label="Endereço"
                                value={selectedUser.address || ''}
                                placeholder="Endereço"
                                onChangeText={() => {}}
                                iconName="home"
                            />
                        </>
                    )}

                    <Text style={styles.sectionTitle}>Dados Profissionais</Text>
                    <Myinput
                        value={req.urls}
                        onChangeText={(text) => setReq({...req, urls: text})}
                        placeholder="Insira uma URL válida"
                        label="Perfil do LinkedIn:"
                        iconName="link"
                    />

                    <MySelect
                        caption="Nacionalidade:"
                        label={req.nationality}
                        list={[
                            { key: 'afegao', option: 'Afegã' },
                            { key: 'alemao', option: 'Alemã' },
                        ]}
                        setLabel={(text) => setReq({ ...req, nationality: text })}
                    />

                    <MySelect
                        caption="Personalidade:"
                        label={req.disc_personality}
                        list={[
                            { key: 'd', option: 'Dominância' },
                            { key: 'i', option: 'Influência' },
                            { key: 's', option: 'Estabilidade' },
                            { key: 'c', option: 'Conformidade' },
                        ]}
                        setLabel={(text) => setReq({ ...req, disc_personality: text })}
                    />

                    <MySelect
                        caption="Gênero:"
                        label={req.sex}
                        list={[
                            { key: 'masculino', option: 'Masculino' },
                            { key: 'feminino', option: 'Feminino' },
                            { key: 'nao_informar', option: 'Prefiro não informar' },
                            { key: 'outro', option: 'Outro' },
                        ]}
                        setLabel={(text) => setReq({ ...req, sex: text })}
                    />

                    <MySelect
                        caption="Estado Civil:"
                        label={req.martinal_status}
                        list={[
                            { key: 'solteiro', option: 'Solteiro(a)' },
                            { key: 'casado', option: 'Casado(a)' },
                            { key: 'separado', option: 'Separado(a)' },
                            { key: 'divorciado', option: 'Divorciado(a)' },
                            { key: 'viuvo', option: 'Viúvo(a)' },
                        ]}
                        setLabel={(text) => setReq({ ...req, martinal_status: text })}
                    />

                    <MySelect
                        caption="Etnia:"
                        label={req.ethnicity}
                        list={[
                            { key: 'branco', option: 'Branco(a)' },
                            { key: 'preto', option: 'Preto(a)' },
                            { key: 'pardo', option: 'Pardo(a)' },
                            { key: 'amarelo', option: 'Amarelo(a)' },
                            { key: 'indigena', option: 'Indígena' },
                            { key: 'nao_informar', option: 'Prefiro não informar' },
                        ]}
                        setLabel={(text) => setReq({ ...req, ethnicity: text })}
                    />

                    <MySelect
                        caption="Deficiência:"
                        label={req.deficiency}
                        list={[
                            { key: 'nenhuma', option: 'Nenhuma' },
                            { key: 'fisica', option: 'Deficiência Física' },
                            { key: 'auditiva', option: 'Deficiência Auditiva' },
                            { key: 'visual', option: 'Deficiência Visual' },
                            { key: 'intelectual', option: 'Deficiência Intelectual' },
                            { key: 'multipla', option: 'Deficiência Múltipla' },
                            { key: 'outro', option: 'Outro' },
                        ]}
                        setLabel={(text) => setReq({ ...req, deficiency: text })}
                    />

                    <MySelect
                        caption="Cargo do Funcionário:"
                        label={positionLabel}
                        list={positions.map((position) => ({
                            key: position.id,
                            option: position.name
                        }))}
                        setLabel={setPositionLabel}
                        setKey={(key) => setReq({...req, positions_id: key})}
                    />

                    <View style={styles.switchContainer}>
                        <Text style={styles.switchLabel}>Status:</Text>
                        <Switch
                            value={req.is_active === 'true'}
                            onValueChange={(value) => setReq({...req, is_active: value ? 'true' : 'false'})}
                            thumbColor={req.is_active === 'true' ? "#3AC7A8" : "#f4f3f4"}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                        />
                        <Text style={styles.switchText}>
                            {req.is_active === 'true' ? 'Ativo' : 'Inativo'}
                        </Text>
                    </View>

                    <View style={styles.buttonGroup}>
                        <MyButton 
                            title={req.id === -1 ? "Cadastrar Funcionário" : "Atualizar Dados"} 
                            button_type="round" 
                            onPress={handleRegister}
                            icon="content-save"
                        />
                        <MyButton 
                            title="Cancelar" 
                            button_type="round" 
                            onPress={() => {
                                setReq({
                                    id: -1,
                                    urls: '',
                                    nationality: '',
                                    disc_personality: '',
                                    sex: '',
                                    martinal_status: '',
                                    ethnicity: '',
                                    deficiency: '',
                                    is_active: 'true',
                                    user_id: -1,
                                    positions_id: 1,
                                });
                                setSelectedUser(null);
                            }}
                            icon="close-circle"
                        />
                    </View>
                </View>

                <View style={styles.tableContainer}>
                    <MyList 
                        style={styles.listContainer}
                        data={employees}
                        keyItem={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <MyTb 
                                onDel={() => deleteEmployee(item.id)}
                                onEdit={() => editEmployee(item.id)}
                            >
                                <View style={styles.itemContent}>
                                    <Text style={styles.itemText}>
                                        <Text style={styles.boldText}>Nome:</Text> {users.find(u => u.id === item.user_id)?.name || 'Não encontrado'}
                                    </Text>
                                    <Text style={styles.itemText}>
                                        <Text style={styles.boldText}>Cargo:</Text> {positions.find(p => p.id === item.positions_id)?.name || 'Não encontrado'}
                                    </Text>
                                    <Text style={styles.itemText}>
                                        <Text style={styles.boldText}>Status:</Text> {item.is_active === 'true' ? 'Ativo' : 'Inativo'}
                                    </Text>
                                </View>
                            </MyTb>
                        )}
                    />
                </View>
            </ScrollView>
        </MyView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        flex: 1,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },
    backButtonText: {
        marginLeft: 5,
        color: '#3AC7A8',
        fontSize: 16,
        fontWeight: '500',
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 20,
        margin: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#3AC7A8',
        marginBottom: 15,
        marginTop: 10,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 10,
    },
    tableContainer: {
        paddingHorizontal: 15,
    },
    listContainer: {
        marginBottom: 20,
    },
    itemContent: {
        padding: 10,
    },
    itemText: {
        fontSize: 15,
        marginBottom: 5,
        color: '#555',
    },
    boldText: {
        fontWeight: 'bold',
        color: '#333',
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
        borderRadius: 10,
        padding: 20,
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
        textAlign: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    userList: {
        marginBottom: 15,
    },
    userItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
    },
    userEmail: {
        fontSize: 14,
        color: '#666',
    },
    userCpf: {
        fontSize: 14,
        color: '#666',
    },
    modalCancelButton: {
        marginTop: 10,
    },
    selectUserButton: {
        marginBottom: 20,
    },
    selectedUserHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    selectedUserText: {
        fontSize: 16,
        color: '#3AC7A8',
        fontWeight: 'bold',
    },
    changeUserButton: {
        width: 'auto',
        paddingHorizontal: 15,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
        paddingHorizontal: 10,
    },
    switchLabel: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    switchText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#3AC7A8',
    },
});