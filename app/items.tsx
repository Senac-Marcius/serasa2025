import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import DateTimePicker 
//import { useRouter } from 'expo-router';
export default function ItemScreen(){
 // aqui é TS
    




    return (
      <View>
        {/* aqui é typescript dentro do front*/} 
        <Text>Minha tela de cadastro</Text>
        <View style={ styles.row }>
            <View style={styles.form}>
                    <TextInput placeholder="Título" />

                    <TextInput 
                        placeholder="Responsáveis"
                    />

                    <Button title= 'Cadastrar'/>

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