import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, FlatList } from 'react-native';
import { Myinput, MyCheck, MyTextArea } from '../src/components/Myinputs'
import MyView from '../src/components/MyView'
import { ScrollView } from 'react-native-gesture-handler';
// Define o estado inicial como false
//isChecked = valor atual da váriavel, SetIsChecked ele altera o valor da isChecked
//useState(false), define o valor inicial do isChecked como true

export default function UserScreen() {

    const [isChecked, setIsChecked] = useState(true);

    const [req, setReq] = useState({
        name: '',
        password: '',
        cpf: '',
        age: '',
        contact: '',
        email: '',
        address: '',
        createAt: new Date().toISOString(),
        id: -1,
        Userid: 0

    });

    const [users, setUsers] = useState<{
        //tipo, tipo vetor, objeto
        name: string,
        password: string,
        cpf: string,
        age: string,
        contact: string,
        email: string,
        address: string,
        createAt: string,
        id: number,
        Userid: number
    }[]>([])

    function handleRegister() {
        if (req.id == -1) {
            const newId = users.length ? users[users.length - 1].id + 1 : 0
            const newUser = { ...req, id: newId }
            setUsers([...users, newUser])

        } else {
            setUsers(users.map(p => (p.id == req.id ? req : p)))

        }

        setReq({
            name: '',
            password: '',
            cpf: '',
            age: '',
            contact: '',
            email: '',
            address: '',
            createAt: new Date().toISOString(),
            id: -1,
            Userid: 0
        })

    }
    function editUser(id: number) {
        let user = users.find(u => u.id == id)
        if (user)
            setReq(user)


    }

    function deleteUser(id: number) {
        const list = users.filter(u => u.id != id)
        if (list)
            setUsers(list)
    }

    //criar outras funções, sempre retorna html
    //aqui é typescript


    //CHECKBOX:
    //setIsChecked: é uma função usada para atualizar o estado de isChecked.
    //!isChecked: o operador ! inverte o valor atual de isChecked. Se isChecked era true (checkbox marcada), ele se torna false (checkbox desmarcada), e vice-versa.
    return (
        <ScrollView>
        <MyView>

            <View style ={styles.formContainer} >
                <View style={styles.form}>

                    <Myinput value={req.name} onChangeText={(text) => setReq({ ...req, name: text })} placeholder="Digite seu nome..." label="Login" iconName='person' />

                    {/* <MyCheck label={isChecked ? "Presente" : "Faltou"} checked={isChecked} onToggle={() => setIsChecked(!isChecked)} />
                    checked busca o valor inicial/atual do estado. onToggle */}

                    <Myinput value={req.password} onChangeText={(text) => setReq({ ...req, password: text })} placeholder="Digite a sua senha..." label="Password" iconName='password' />
                    
                    <Myinput value={req.cpf} onChangeText={(text) => setReq({ ...req, cpf: text })} placeholder="Digite o seu CPF" label="CPF:" iconName='article' /> 

                     <Myinput value={req.age} onChangeText={(text) => setReq({ ...req, age: text })} placeholder="Digite a sua idade" label="Idade:" iconName='celebration' /> 

                     <Myinput value={req.contact} onChangeText={(text) => setReq({ ...req, contact: text })} placeholder="(XX) XXXXX-XXXX" label="Contato:" iconName='phone' />

                     <Myinput value={req.email} onChangeText={(text) => setReq({ ...req, email: text })} placeholder="domain@domain.com" label="Email:" iconName='mail' /> 

                     <Myinput value={req.address} onChangeText={(text) => setReq({ ...req, address: text })} placeholder="Digite o seu endereço" label="Endereço" iconName='house' />      

                    <Button title='CADASTRAR' color="purple" onPress={handleRegister} />
                    


                </View>

                <FlatList
                    data={users}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemText}>Nome: {item.name}</Text>
                            <Text style={styles.itemText}>CPF: {item.cpf}</Text>
                            <Text style={styles.itemText}>Email: {item.email}</Text>
                            <Text style={styles.itemText}>Idade: {item.age}</Text>
                            <Text style={styles.itemText}>Endereço: {item.address}</Text>
                            <Text style={styles.itemText}>Contato: {item.contact}</Text>
                            <Text style={styles.itemText}>Criação: {item.createAt}</Text>

                            <View style={styles.buttonsContainer}>

                                <TouchableOpacity style={styles.deleteButton} onPress={() => { deleteUser(item.id) }}>
                                    <Text style={styles.buttonText}>X</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.editButton} onPress={() => { editUser(item.id) }}>
                                    <Text style={styles.buttonText}>Edit</Text>

                                </TouchableOpacity>

                            </View>

                        </View>


                    )}
                />

            </View>

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
        marginRight: 10,
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        width:400,
        
        
        // shadowOffset: { width: 0, height: 4 },
        // shadowRadius: 5,
        // marginLeft: 50,
        // marginTop: 50,

    },

    formContainer:{
        flex: 1,  // Isso faz com que o componente ocupe toda a tela
        justifyContent: 'center', // Centraliza verticalmente
        alignItems: 'center',
    },


    itemContainer: {
        padding: 15,
        marginBottom: 5,
        borderRadius: 30,
        backgroundColor: 'white',
        borderColor: 'purple',
        borderWidth: 0.1,
        shadowColor: 'purple',
        shadowOffset: { width: 1, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 50,
        width: 500

    },

    itemText: {
        color: 'black',
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 30,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingLeft: 10,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },

    buttonsContainer: {
        flexDirection: 'row',
        gap: 20
    },

    deleteButton: {
        backgroundColor: 'red', // Cor do botão de editar
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30, // Bordas arredondadas
        marginBottom: 10,
        alignItems: 'center',
    },

    editButton: {
        backgroundColor: '#281259',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
        marginBottom: 10,
        alignItems: 'center',

    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
})