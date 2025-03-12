import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
 
export default function CalendarScreen(){
//aqui é typescript


return (
    <View>
        Olá Mundo 
        {/*aqui é typescript dentro do front*/}
        <Text>Minha tela das postagens</Text>
        <View style={styles.row}>
            <View style ={styles.form}>
                
                <TextInput placeholder="Nome do aluno:"/>
                <TextInput placeholder="Curso:"/>
                <TextInput placeholder="Data da Matrícula:"/>
                <TextInput placeholder="Período:"/>

            <Button title='Acessar'/>
            </View> 
            
        </View> 

    </View>

    );
}

const styles = StyleSheet.create({ 
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
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