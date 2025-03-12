import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button} from 'react-native';


export default function UserScreen() {
    //criar outras funções, sempre retorna html
    //aqui é typescript


    return (
        <View>
            <Text>Minha tela de usuários</Text>
            <View style={styles.row}>
                <View style={styles.form}>
                    <TextInput
                        placeholder="Nome do usuário:"
                    />

                    <TextInput
                        placeholder="Senha:"
                    />

                    <TextInput
                        placeholder="CPF:"
                    />

                    <TextInput
                        placeholder="Idade:"
                    />

                    <TextInput
                        placeholder="Contato:"
                    />

                    <TextInput
                        placeholder="Email:"
                    />

                    <TextInput
                        placeholder="Endereço:"
                    />

                    <Button title='Cadastrar'/>


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


})
