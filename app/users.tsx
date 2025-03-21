import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, FlatList } from 'react-native';
import Myinput from '../src/components/Myinputs';



export default function UserScreen() {
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
        if(req.id == -1){
            const newId = users.length ? users[users.length - 1].id +1:0
            const newUser = {...req, id:newId}
            setUsers([...users, newUser])

        }else{
            setUsers(users.map(p=>(p.id == req.id ? req:p)))

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
    function editUser(id:number){
        let user = users.find(u => u.id == id)
        if(user)
            setReq(user)


    }

    function deleteUser(id:number){
        const list = users.filter(u => u.id != id)
        if(list)
            setUsers(list)

    }

    //criar outras funções, sempre retorna html
    //aqui é typescript
    return (
        <View>
            

            <View style={styles.row}>

                <View style={styles.form}>
               

                    <TextInput
                    
                        style={styles.input}
                        placeholder="Nome:"
                        value={req.name} //O atributo value vincula o campo de texto ao estado name
                        onChangeText={(text) => setReq({ ...req, name: text })} //Ele recebe o texto digitado pelo usuário como argumento e o passa para a função setName

                    />



                    <TextInput
                    
                        style={styles.input}
                        placeholder="Senha:"
                        value={req.password} //O atributo value vincula o campo de texto ao estado name
                        onChangeText={(text) => setReq({ ...req, password: text })} //Ele recebe o texto digitado pelo usuário como argumento e o passa para a função setName

                    />


                    <TextInput
                        style={styles.input}
                        placeholder="CPF:"
                        
                        value={req.cpf} //O atributo value vincula o campo de texto ao estado name
                        onChangeText={(text) => setReq({ ...req, cpf: text })}
                       
                    />


                    <TextInput
                        style={styles.input}
                        placeholder="Idade:"
                        value={req.age} //O atributo value vincula o campo de texto ao estado name
                        onChangeText={(text) => setReq({ ...req, age: text })}
                    />


                    <TextInput
                        style={styles.input}
                        placeholder="Contato:"
                        value={req.contact} //O atributo value vincula o campo de texto ao estado name
                        onChangeText={(text) => setReq({ ...req, contact: text })}
                    />


                    <TextInput
                        style={styles.input}
                        placeholder="Email:"
                        value={req.email} //O atributo value vincula o campo de texto ao estado name
                        onChangeText={(text) => setReq({ ...req, email: text })}

                    />


                    <TextInput
                        style={styles.input}
                        placeholder="Endereço:"
                        value={req.address} //O atributo value vincula o campo de texto ao estado name
                        onChangeText={(text) => setReq({ ...req, address: text })}
                    />


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

                                <TouchableOpacity style={styles.deleteButton} onPress={() => {deleteUser(item.id)}}>
                                <Text style={styles.buttonText}>X</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.editButton} onPress={() => {editUser(item.id)}}>
                                <Text style={styles.buttonText}>Edit</Text>

                                </TouchableOpacity>

                            </View>

                        </View>


                    )}
                />

            </View>

        </View>

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
        marginRight: 10,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        marginLeft: 50,
        marginTop: 50,

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
