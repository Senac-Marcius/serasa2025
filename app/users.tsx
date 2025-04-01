import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, FlatList } from 'react-native';
import { Myinput, MyCheck, MyTextArea } from '../src/components/Myinputs'
import MyView from '../src/components/MyView';
import MyList from '../src/components/mylist';
import { ScrollView } from 'react-native-gesture-handler';
import MyButton from '../src/components/Mybuttons';
import { Image } from 'react-native';
import Myiten from '../src/components/myItenlist'

// Define o estado inicial como false
//isChecked = valor atual da váriavel, SetIsChecked ele altera o valor da isChecked
//useState(false), define o valor inicial do isChecked como true

export default function UserScreen() {

    const [isChecked, setIsChecked] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [showUsers, setShowUsers] = useState(false);


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


                <View style={styles.form}>
                    <Text style={styles.TextIntroducao}>Cadastro de usuários</Text>
                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/8307/8307575.png' }} style={styles.image} />
                    
 
                    {/* Botão para abrir o formulário */}
                    {!showForm && (
                        <TouchableOpacity style={styles.startButton} onPress={() => setShowForm(true)}>
                            <Text style={styles.buttonText}>INICIAR CADASTRO</Text>
                        </TouchableOpacity>
                    )}

                    {/* Botão para mostrar registro de usuários */}

                    <TouchableOpacity style={styles.startRegistros} onPress={() => setShowUsers(!showUsers)}>
                        <Text style={styles.buttonText}>{showUsers ? "Ocultar Registro de Usuários" : "REGISTRO DE USERS"}</Text>
                    </TouchableOpacity>


                    {/* Exibir o formulário somente se showForm for true */}
                    {showForm && (
                        <View style={styles.formContainer}>
                            <View style={styles.form}>
                                <Myinput value={req.name} onChangeText={(text) => setReq({ ...req, name: text })} placeholder="Digite seu nome..." label="Login" iconName='person' />
                                <Myinput value={req.password} onChangeText={(text) => setReq({ ...req, password: text })} placeholder="Digite a sua senha..." label="Password" iconName='password' />
                                <Myinput value={req.cpf} onChangeText={(text) => setReq({ ...req, cpf: text })} placeholder="Digite o seu CPF" label="CPF:" iconName='article' />
                                <Myinput value={req.age} onChangeText={(text) => setReq({ ...req, age: text })} placeholder="Digite a sua idade" label="Idade:" iconName='celebration' />
                                <Myinput value={req.contact} onChangeText={(text) => setReq({ ...req, contact: text })} placeholder="(XX) XXXXX-XXXX" label="Contato:" iconName='phone' />
                                <Myinput value={req.email} onChangeText={(text) => setReq({ ...req, email: text })} placeholder="domain@domain.com" label="Email:" iconName='mail' />
                                <Myinput value={req.address} onChangeText={(text) => setReq({ ...req, address: text })} placeholder="Digite o seu endereço" label="Endereço" iconName='house' />

                                <MyButton
                                    title="CADASTRAR"
                                    onPress={handleRegister}
                                    button_type="round"
                                    style={styles.button_round}
                                />

                                {/* Botão para fechar o formulário */}
                                <TouchableOpacity style={styles.closeButton} onPress={() => setShowForm(false)}>
                                    <Text style={styles.buttonText}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {/* Lista de usuários cadastrados */}
                    {showUsers && (
                        <MyList
                            data={users}
                            keyItem={(item) => item.id.toString()}
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
                                        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteUser(item.id)}>
                                            <Text style={styles.buttonText}>X</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.editButton} onPress={() => editUser(item.id)}>
                                            <Text style={styles.buttonText}>Edit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}


                        />
                    )}

                </View>

            </MyView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    myView: {
        backgroundColor: 'purple',

    },
    formContainer: {
        //formulário que contém os itens
        backgroundColor: '#D2BBF2',
        borderWidth: 2,
        borderColor: 'purple',
        shadowColor: 'purple',
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        alignItems: 'center',
        // Ocupa toda a largura disponível
    },
    form: {
        //engloba a imagem e o forms
        padding: 20,
        backgroundColor: '',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        width: '100%', // Para evitar que fique muito estreito
        maxWidth: 500, // Define um limite máximo
        alignSelf: 'center', // Garante que fique centralizado
    },

    itemContainer: {
        padding: 20,
        marginBottom: 5,
        borderRadius: 10,
        backgroundColor: '#fffff',
        borderColor: 'purple',
        borderWidth: 0.1,
        shadowColor: 'purple',
        shadowOffset: { width: 1, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        width: 450,
    },
    startButton: {
        backgroundColor: '#813AB1',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 20,
    },
    startRegistros: {
        backgroundColor: '#BFBFBF',
        padding: 10,
        color: '',
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 2,
    },
    closeButton: {
        backgroundColor: '#d9534f',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    button_round: {
        backgroundColor: "#813AB1",
        padding: 10,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    TextIntroducao: {
        color: '#6A1B9A',
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: 20,
        backgroundColor: 'white',
        borderColor: 'purple',
        borderWidth: 0.5,
        shadowColor: 'purple',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 4,
    },

    itemText: {
        color: 'black',
        fontSize: 16,
        marginBottom: 5,
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 20,
    },
    deleteButton: {
        backgroundColor: 'red',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
        alignItems: 'center',
    },
    editButton: {
        backgroundColor: '#281259',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
        alignItems: 'center',
    },
    image: {
        width: '100%', // Ajusta a largura para 100% do contêiner
        height: 300, // Ajusta a altura conforme necessário
        resizeMode: 'contain', // Ajusta a imagem para caber no espaço
        marginBottom: 20, // Adiciona um espaço entre a imagem e o formulário
    }

});








