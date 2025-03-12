import React, {useState} from 'react';//cria uma var que att sozinha qualquer obj que criarmos dentro dela 
import { View, Text, StyleSheet, FlatList, TextInput, Button, ScrollView } from 'react-native';//como se fosse a div do html, ele agrupa as coisas 

export default function RecordScreen(){//função que será exportada



    return (
        <View>
            {/* isso é um comentário em typescrispt dentro do front */}

            <Text style = {styles.title}>Solicitação de Documentos</Text>
            <View style = {styles.row}>{/* variavel.parametro da Function */}
                <View style = {styles.form}>
                    <TextInput placeholder= "Histórico Escolar"/>
                    <TextInput placeholder= "Declarações"/>
                    <TextInput placeholder= "Atestado de frequência"/>
                    <TextInput placeholder= "Certificado de Conclusão"/>
                    <TextInput placeholder= "Descrição"/>
                    <Button title = "Solicitar"/>   
                </View>
                {/*<FlatList/>*/}

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
        flex: 1,//primeiro item
        marginRight: 10,
        padding: 20,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },

});
