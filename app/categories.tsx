import React, { useState } from 'react'; 
import { View, Text,StyleSheet, FlatList, TextInput, Button  } from 'react-native';

export default function CategoryScreen(){
//Aqui é typescript


    return (
        <View>
           {/*Aqui é typescript dentro do front*/}
            <Text>Minha tela das postagens</Text>
            <View style={styles.row}>

        <View  style={styles.form}>
            <TextInput placeholder="Nome"/>
            <TextInput placeholder="Categoria"/>
            <TextInput placeholder="Descrição"/>
            <TextInput placeholder="Cor"/>

            <Button title="Cadastrar"/> 

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