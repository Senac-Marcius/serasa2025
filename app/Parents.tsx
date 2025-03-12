import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button} from 'react-native';
//import dateTimepicker
//npm run web → chamar pagina web pelo terminal
export default function ParentScreen (){
//Aqui é TypeScript


    return (
        <View>{/*aqui é typeScript dentro do Front*/}
            {/*View → esse view é diferente do HTML ele contém DIVs e outros atributos,*/}
            <Text>Minha tela das postagens </Text>
            <View style = {styles.form}>
                <View style={styles.form}>{/*View no Type pode ser usado para substituir o Form */}
                {/*<FlatList/> → atibuto para possivel criação de lista */}
                    <TextInput 
                        placeholder="Nome:"
                    />
                    <TextInput
                        placeholder="Email:"
                    />
                    <TextInput
                        placeholder="Parentesco:"
                    />
                    <Button title="Cadastrar" />
                </View>
            </View>
        </View>
        
    );
}

// smepre que for criado um objeto deve-se adicionar o mesmo no Import
const styles = StyleSheet.create({/*StyleSheet é um atributo que permite criar estilos personalizados */
    row: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
    },
    form: {
        flex: 1,
        marginRight: 30,
        marginLeft:30,
        padding: 20,
        backgroundColor: '#F2F2F2',
        borderRadius: 100,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
    },
    Button: { 
        backgroundColor: '#F2F2F2'
    }
})