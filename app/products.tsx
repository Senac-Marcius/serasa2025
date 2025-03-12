import React, { useState }  from 'react';  //importando objeto react e useState da biblioteca do react
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';


export default function productScreen(){
//aqui é typescript


    return (
            <View>
                {/*aqui é typescript dentro do front */ }
                <Text>
                    Minha tela dos Produtos</Text>
                    <View style={styles.row}>
                        <View style={styles.form} style={styles.Button}>
                            <TextInput
                            placeholder="descrição"
                            />
                            <TextInput
                            placeholder="nome"
                            />
                            <Button title="Cadastrar" onPress={() => {}} />
                        </View>
                        
                    </View> 
            </View>
    );
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
    Button: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }
    
})
    












