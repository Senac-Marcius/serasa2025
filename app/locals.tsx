import React, { useState } from 'react'; 
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'; 

export default function LocalScreen(){



    return (  //  *  sempre retornará um html.     * view com o "v" minúsculo é utilizado, apenas, no HTML puro.     * Para comentar no HYML, é necessário utilizar "{/* */}"
        <View>
            {/* aqui é typescript dentro do front */} 
            <Text>Minha tela dos Locais:</Text>
            <View style={styles.row}>
                <View style={styles.form}>
                    <TextInput placeholder= "name" />        {/*  "placeholder" é um texto   */}
                    <TextInput placeholder= "area"/>
                    <TextInput placeholder= "description"/> 
                    <TextInput placeholder= "adress"/>
                    <Button title='Cadastrar' />          {/*  o código que deve ser utilizado para criar o botão  */} 

                </View>
              {/*  <FlatList
                /> */}
            </View>
        </View> 
    );   
} 

const styles = StyleSheet.create({              //ESTILIZAÇÃO: aqui convidamos funções que criam estilos para fontes
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



