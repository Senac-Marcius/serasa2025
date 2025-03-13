import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';


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
        userId: 0

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
        userId: number
    }[]>([])

    function handleRegister(){
        setUsers([...users, req])
        

    }

    //criar outras funções, sempre retorna html
    //aqui é typescript
    return (
        <View>
            <Text>Minha tela de usuários</Text>
            <View style={styles.row}>
                <View style={styles.form}>

                    <TextInput
                        placeholder="Nome:"
                        value={req.name} //O atributo value vincula o campo de texto ao estado name
                        onChangeText={(text) => setReq({ ...req, name: text })} //Ele recebe o texto digitado pelo usuário como argumento e o passa para a função setName

                    />
                    {req.name}




                    <TextInput
                        placeholder="Senha:"
                        value={req.password} //O atributo value vincula o campo de texto ao estado name
                        onChangeText={(text) => setReq({ ...req, password: text })} //Ele recebe o texto digitado pelo usuário como argumento e o passa para a função setName

                    />
                    {req.password}

                    <TextInput
                        placeholder="CPF:"
                        value={req.cpf} //O atributo value vincula o campo de texto ao estado name
                        onChangeText={(text) => setReq({ ...req, cpf: text })}
                    />
                    {req.cpf}

                    <TextInput
                        placeholder="Idade:"
                        value={req.age} //O atributo value vincula o campo de texto ao estado name
                        onChangeText={(text) => setReq({ ...req, age: text })}
                    />
                    {req.age}

                    <TextInput
                        placeholder="Contato:"
                        value={req.contact} //O atributo value vincula o campo de texto ao estado name
                        onChangeText={(text) => setReq({ ...req, contact: text })}
                    />
                    {req.contact}

                    <TextInput
                        placeholder="Email:"
                        value={req.email} //O atributo value vincula o campo de texto ao estado name
                        onChangeText={(text) => setReq({ ...req, email: text })}

                    />
                    {req.email}

                    <TextInput
                        placeholder="Endereço:"
                        value={req.address} //O atributo value vincula o campo de texto ao estado name
                        onChangeText={(text) => setReq({ ...req, address: text })}
                    />
                    {req.address}

                    <Button title='CADASTRAR' color="purple" onPress={ handleRegister} />


                </View>


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
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
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

})
