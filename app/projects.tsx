
import React, { useState } from 'react'; // Esta importando da biblioteca do react para atualizar automaticamente 
import { StyleSheet, View, Text, TextInput} from 'react-native'; 


export default function ProjectScreen(){
// Aqui é typescript


    return ( // Esta sendo feito um emcapsulamento com a abertura da ()
        <View>
            {/* Aqui é typescript dentro do front */}
            <Text> Minha tela dos Projetos </Text>
            <View style={styles.row}>
                <View style={styles.form}>
                
                    <TextInput
                        placeholder="Criador do projeto" placeholder="CPF" placeholder="E-mail"
                    />
                    <TextInput
                        placeholder="Nome do Projeto" placeholder="URL"
                    />
                    <TextInput
                        placeholder="Previsão de inicio"
                    />
                    <TextInput
                        placeholder="Qual o periodo esperado"
                    />
                    <TextInput 
                        placeholder="Descrição" // Criando o textinput para receber e exibir o texto "placeholder" para o usuario
                    />
                    <TextInput
                        placeholder="Objetivo"
                    />
                    <TextInput
                        placeholder="Recursos" 'Aproximadamente'
                    />
                    <TextInput
                        placeholder="Qual a atividade proposta pelo projeto"
                    />
                    <TextInput
                        placeholder="Quais suas metodologias"
                    />
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