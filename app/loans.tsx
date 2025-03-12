import React, { useState } from 'react'; //react é uma biblioteca e essa função esta importando ela, puxando
import { FlatList, View, Text, StyleSheet, TextInput, Button} from 'react-native'; //react native é uma biblioteca dentro de react 
export default function LoanScreen() {

    //aqui é typescript

    return (
        <View>
             {/* comentario, tudo aq dentro é codigo, do lado de fora é html, aqui é typescript dentro do front */}
            <Text>Minha tela de Empréstimo</Text>
            <View style={styles.row}>
                <View style={styles.form}>
                    <TextInput placeholder="Nome do Livro:"/>

                    <TextInput 
                        placeholder="Status de Empréstimo:"
                    />

                    <TextInput 
                        placeholder="Data de Empréstimo:"
                    />

                     <TextInput 
                        placeholder="Data Prevista de Devolução:"
                    />

                     <TextInput 
                        placeholder="Data de Devolução Efetuada:"
                    />

                     <TextInput 
                        placeholder="Renovar:"
                    /> 
                    
                    <TextInput 
                        placeholder="Observação:"
                    />

                    <Button title="Emprestar" 
                    color="pink"
                     />
                </View> 
            
            
            </View>
        </View>
    ); //encapsulamento


}

const styles = StyleSheet.create({ 
    row: {
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




