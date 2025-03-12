import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';

export default function RecordScreen(){
{/*Aqui é typescript COMENTÁRIO dentro do front */}


    return (
        <View>
            <Text>Tela dos Registros</Text>

            <View style={styles.row}>

            <View style={styles.form}>

                    <TextInput
                        placeholder="ID:"
                    />

                    <TextInput
                        placeholder="Nome do Aluno:"
                    />

                    <TextInput
                        placeholder="Descrição:"
                    />

                    <TextInput
                        placeholder="Doença:"
                    />

                    <TextInput
                        placeholder="Saúde:"
                    />

                    <TextInput
                        placeholder="Medicações:"
                    />

                    <TextInput
                        placeholder="ID Usuário:"
                    />

                <Button title="Cadastrar:" />

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
        marginRight: 20,
        marginLeft: 20,
        padding: 20,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
    },

})