import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, FlatList } from 'react-native';



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
        id: 0,
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
        setUsers([...users, req])
        setReq({
            name: '',
            password: '',
            cpf: '',
            age: '',
            contact: '',
            email: '',
            address: '',
            createAt: new Date().toISOString(),
            id: req.id + 1,
            Userid: 0
        })

    }

    //criar outras funções, sempre retorna html
    //aqui é typescript
    return (
        <View>
            
            <View style={styles.row}>
            
                <View style={styles.form}>

                    <TextInput
                        placeholder="Nome:"
                        value={req.name} //O atributo value vincula o campo de texto ao estado name
                        onChangeText={(text) => setReq({ ...req, name: text })} //Ele recebe o texto digitado pelo usuário como argumento e o passa para a função setName

                    />
                    


                    <TextInput
                        placeholder="Senha:"
                        value={req.password} //O atributo value vincula o campo de texto ao estado name
                        onChangeText={(text) => setReq({ ...req, password: text })} //Ele recebe o texto digitado pelo usuário como argumento e o passa para a função setName

                    />


                    <TextInput
                        placeholder="CPF:"
                        value={req.cpf} //O atributo value vincula o campo de texto ao estado name
                        onChangeText={(text) => setReq({ ...req, cpf: text })}
                    />


                    <TextInput
                        placeholder="Idade:"
                        value={req.age} //O atributo value vincula o campo de texto ao estado name
                        onChangeText={(text) => setReq({ ...req, age: text })}
                    />


                    <TextInput
                        placeholder="Contato:"
                        value={req.contact} //O atributo value vincula o campo de texto ao estado name
                        onChangeText={(text) => setReq({ ...req, contact: text })}
                    />


                    <TextInput
                        placeholder="Email:"
                        value={req.email} //O atributo value vincula o campo de texto ao estado name
                        onChangeText={(text) => setReq({ ...req, email: text })}

                    />


                    <TextInput
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
                            <Text>Nome: {item.name}</Text>
                            <Text>CPF: {item.cpf}</Text>
                            <Text>Email: {item.email}</Text>
                            <Text>Idade: {item.age}</Text>
                            <Text>Endereço: {item.address}</Text>
                            <Text>Contato: {item.contact}</Text>
                            <Text>Criação: {item.createAt}</Text>

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
        marginLeft:50,
        marginTop:50
    },

    button: {
        backgroundColor: 'purple',
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 20,

    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

    itemContainer: {
    padding: 15,
    marginBottom: 5,
    borderRadius: 30, 
    backgroundColor: '#ffffff', 
    borderColor: 'purple', 
    borderWidth: 0.1, 

    shadowColor: 'purple', // Cor da sombra
    shadowOffset: { width: 1, height: 10 }, 
    shadowOpacity: 0.5, 
    shadowRadius: 10, 
    marginLeft:50,
    marginRight:50,
    marginTop:50,
    width:500
    

    }
    



})
