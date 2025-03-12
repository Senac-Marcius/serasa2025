import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button } from 'react-native';

export default function ClassScreen() {





    return (
        <View>
            Olá mundo
            <Text>
                Minha tela das classes</Text>
                <View style={styles.row}>
                    <View style={styles.form}>
                        <TextInput
                        placeholder="Nome da Turma"/>
                        <TextInput
                        placeholder="Quantidade de Alunos"/>
                        <TextInput
                        placeholder="ID da Turma"/>
                        <TextInput
                        placeholder="Data de criação da Turma"/>
                        <TextInput
                        placeholder="Data de Inicio"/>
                        <TextInput
                        placeholder="Data de Finalização"/>

                        <Button title="Cadastrar Turma"/>

                    </View>
                    

                </View>
        </View>
    );

} 

const styles = StyleSheet.create({
    row : {
        flexDirection: 'row',   
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },    
    form:{
        flex: 1,
        marginRight: 10,
        padding: 20,
        backgroundColor: 'F2F2F2',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 4},
        shadowRadius: 5,


    },
})