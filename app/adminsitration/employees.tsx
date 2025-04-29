import React, {useState, useEffect} from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import { Text, StyleSheet } from 'react-native';
import MyTimePicker from '../../src/components/MyTimerPiker';
import MyButton from '../../src/components/MyButtons';
import MyView from '../../src/components/MyView';
import {MyItem, MyTb} from '../../src/components/MyItem';
import MyList from '../../src/components/MyList';
import { Myinput } from '../../src/components/MyInputs';
import { useRouter } from 'expo-router';
import { setEmployee, iEmployees, updateEmployee, dellEmployee, getEmployees } from '../../src/controllers/employees';
import MyCalendar from '../../src/components/MyCalendar';
import { useLocalSearchParams } from 'expo-router';
import { getCargo, iPosition } from '../../src/controllers/positions';
import MySelect from '../../src/components/MySelect';
import { getUsers, iUser } from '../../src/controllers/users';

export default function EmployeeScreen() {
    const [employees, setEmployees] = useState<iEmployees[]>([]);
    const [positions, setPositions] = useState<iPosition[]>([]);
    const [positionLabel, setPositionLabel] = useState('Selecione...');
    const [users, setUsers] = useState<iUser[]>([]);
    const [selectedUser, setSelectedUser] = useState<iUser | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    
    const params = useLocalSearchParams();
    const viewParam = params.view as 'form' | 'table' | undefined;
    const [currentView, setCurrentView] = useState<'form' | 'table'>(viewParam || 'table');
    
    const [req, setReq] = useState<iEmployees>({
        id: -1,
        urls: '',
        date_birth: '',
        nationality: '',
        disc_personality: '',
        sex: '',
        martinal_status: '',
        ethnicity: '',
        deficiency: '',
        created_at: '',
        is_active: '',
        user_id: -1,
        positions_id: 1,
        scale_id: 1
    });

    const action = req.id === -1 ? "Cadastrar Funcionário" : "Atualizar Dados";

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                
                // Carrega todos os dados em paralelo
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
                    
                    // Se estiver editando e tiver user_id válido, encontra o usuário
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

    const handleRegister = async () => {
        try {
            if (req.user_id === -1) {
                console.error("Nenhum usuário selecionado");
                return;
            }

            if (req.id === -1) {
                // Cadastro novo
                const newEmployee = {
                    ...req,
                    id: employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1
                };
                await setEmployee(newEmployee);
                setEmployees([...employees, newEmployee]);
            } else {
                // Atualização
                await updateEmployee(req.id, req);
                setEmployees(employees.map(e => e.id === req.id ? req : e));
            }
            
            // Reset form
            setReq({
                id: -1,
                urls: '',
                date_birth: '',
                nationality: '',
                disc_personality: '',
                sex: '',
                martinal_status: '',
                ethnicity: '',
                deficiency: '',
                created_at: '',
                is_active: '',
                user_id: -1,
                positions_id: 1,
                scale_id: 1
            });
            setSelectedUser(null);
            setCurrentView('table');
        } catch (error) {
            console.error("Error saving employee:", error);
        }
    };

    const editEmployee = async (id: number) => {
        const employee = employees.find(e => e.id === id);
        if (employee) {
            setReq(employee);
            
            // Encontra a posição correspondente
            const selectedPosition = positions.find(p => p.id === employee.positions_id);
            if (selectedPosition) {
                setPositionLabel(selectedPosition.name);
            }
            
            // Encontra o usuário correspondente
            const user = users.find(u => u.id === employee.user_id);
            setSelectedUser(user || null);
            
            setCurrentView('form');
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

    const handleUserSelect = (userId: number) => {
        const user = users.find(u => u.id === userId);
        if (user) {
            setSelectedUser(user);
            setReq({...req, user_id: userId});
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <ScrollView>
            <View style={styles.hiddenControls}>
                <MyButton
                    title='Alterar dados de Funcionários'
                    onPress={() => setCurrentView('form')}
                />
                <MyButton
                    title='Lista de Funcionários'
                    onPress={() => setCurrentView('table')}
                />
            </View>
            
            <MyView router={router}>
                {currentView === 'form' && (
                    <View style={styles.row}>
                        <View style={styles.form}>

                            {selectedUser && (
                                <>
                                <Myinput
                                        label="Nome do Usuário"
                                        value={selectedUser ? selectedUser.name : 'Nenhum usuário selecionado'}
                                        placeholder="Nome"
                                        onChangeText={() => {}}
                                        iconName="person"
                                    />
                                    <Myinput
                                        label="Data de Nascimento"
                                        value={selectedUser.age}
                                        placeholder=""
                                        onChangeText={() => {}}
                                        iconName="age"
                                        
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
                                        iconName="call"
                                        
                                    />
                                    <Myinput
                                        label="CPF"
                                        value={selectedUser.cpf || ''}
                                        placeholder="CPF"
                                        onChangeText={() => {}}
                                        iconName="badge"
                                        
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
                                                                { key: 'americano', option: 'Americana' },
                                                                { key: 'angolano', option: 'Angolana' },
                                                                { key: 'argentino', option: 'Argentina' },
                                                                { key: 'australiano', option: 'Australiana' },
                                                                { key: 'belga', option: 'Belga' },
                                                                { key: 'boliviano', option: 'Boliviana' },
                                                                { key: 'brasileiro', option: 'Brasileira' },
                                                                { key: 'canadense', option: 'Canadense' },
                                                                { key: 'chileno', option: 'Chilena' },
                                                                { key: 'chines', option: 'Chinesa' },
                                                                { key: 'colombiano', option: 'Colombiana' },
                                                                { key: 'cubano', option: 'Cubana' },
                                                                { key: 'dinamarques', option: 'Dinamarquesa' },
                                                                { key: 'egipcio', option: 'Egípcia' },
                                                                { key: 'espanhol', option: 'Espanhola' },
                                                                { key: 'frances', option: 'Francesa' },
                                                                { key: 'grego', option: 'Grega' },
                                                                { key: 'haitiano', option: 'Haitiana' },
                                                                { key: 'hondurenho', option: 'Hondurenha' },
                                                                { key: 'indiano', option: 'Indiana' },
                                                                { key: 'ingles', option: 'Inglesa' },
                                                                { key: 'italiano', option: 'Italiana' },
                                                                { key: 'japones', option: 'Japonesa' },
                                                                { key: 'libanes', option: 'Libanesa' },
                                                                { key: 'mexicano', option: 'Mexicana' },
                                                                { key: 'mocambicano', option: 'Moçambicana' },
                                                                { key: 'nigeriano', option: 'Nigeriana' },
                                                                { key: 'noruegues', option: 'Norueguesa' },
                                                                { key: 'panamenho', option: 'Panamenha' },
                                                                { key: 'paraguaio', option: 'Paraguaia' },
                                                                { key: 'peruano', option: 'Peruana' },
                                                                { key: 'polones', option: 'Polonesa' },
                                                                { key: 'portugues', option: 'Portuguesa' },
                                                                { key: 'romeno', option: 'Romena' },
                                                                { key: 'russo', option: 'Russa' },
                                                                { key: 'sueco', option: 'Sueca' },
                                                                { key: 'suico', option: 'Suíça' },
                                                                { key: 'tailandes', option: 'Tailandesa' },
                                                                { key: 'turco', option: 'Turca' },
                                                                { key: 'ucraniano', option: 'Ucraniana' },
                                                                { key: 'uruguaio', option: 'Uruguaia' },
                                                                { key: 'venezuelano', option: 'Venezuelana' },
                                                                { key: 'vietnamita', option: 'Vietnamita' }
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

                            <MyTimePicker 
                                onTimeSelected={(time) => setReq({ ...req, is_active: time.toString() })}
                                initialTime={req.is_active}
                                labelText="Está ativo desde:"
                            />

                            <View style={styles.buttonGroup}>
                                <MyButton 
                                    title={action} 
                                    button_type="round" 
                                    onPress={handleRegister}
                                />
                                <MyButton 
                                    title="Cancelar" 
                                    button_type="round" 
                                    onPress={() => {
                                        setReq({
                                            id: -1,
                                            urls: '',
                                            date_birth: '',
                                            nationality: '',
                                            disc_personality: '',
                                            sex: '',
                                            martinal_status: '',
                                            ethnicity: '',
                                            deficiency: '',
                                            created_at: '',
                                            is_active: '',
                                            user_id: -1,
                                            positions_id: 1,
                                            scale_id: 1
                                        });
                                        setSelectedUser(null);
                                        setCurrentView('table');
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                )}
                
                {currentView === 'table' && (
                    <View>
                        <MyButton
                            title="Adicionar Novo Funcionário"
                            onPress={() => {
                                setReq({
                                    id: -1,
                                    urls: '',
                                    date_birth: '',
                                    nationality: '',
                                    disc_personality: '',
                                    sex: '',
                                    martinal_status: '',
                                    ethnicity: '',
                                    deficiency: '',
                                    created_at: '',
                                    is_active: '',
                                    user_id: -1,
                                    positions_id: 1,
                                    scale_id: 1
                                });
                                setSelectedUser(null);
                                setCurrentView('form');
                            }}
                            style={styles.addButton}
                        />
                        
                        <MyList 
                            style={styles.itemContainer}
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
                                            <Text style={styles.boldText}>Status:</Text> {item.is_active ? 'Ativo' : 'Inativo'}
                                        </Text>
                                    </View>
                                </MyTb>
                            )}
                        />
                    </View>
                )}    
            </MyView>   
        </ScrollView>    
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    form: {
        flex: 1,
        marginHorizontal: 20,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        marginTop: 20,
        marginBottom: 20,
    },
    itemContainer: {
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        borderColor: '#ddd',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginHorizontal: 20,
        marginTop: 10,
    },
    itemContent: {
        padding: 5,
    },
    itemText: {
        fontSize: 14,
        marginBottom: 3,
        color: '#333',
    },
    boldText: {
        fontWeight: 'bold',
    },
    hiddenControls: {
        display: 'none',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    addButton: {
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 10,
    },
});