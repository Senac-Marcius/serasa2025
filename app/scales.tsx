
import React, {useState} from 'react'; //Importa o react e atualiza a lista Automaticamente.
import { View, Text, StyleSheet, FlatList, TextInput, Button } from 'react-native';//Une  os objetos e o react-native faz a função de trasformar o codigo em multiplas plataformas.

export default function ScaleScreen(){



    return (
        <View> {/* Aqui é typecript dentro do html*/}
        {/*Aqui é HTML*/}
            <Text>Minha tela das escalas</Text>
            <View style={styles.row}>
                <View style={styles.form}>
                    <TextInput 
                        placeholder="Dia da Semana"
                    />
                    <TextInput 
                        placeholder="Horario de início"
                    />
                      <TextInput 
                        placeholder="Horario de termino"
                    />
                      <TextInput
                        placeholder="Data"
                    />
                    <Button 
                        title='Cadastrar'
                    />
                        
                </View>

            </View>
        {/*Só pode uma TAG por retorn, mas dentro dessa tag pode ter outras*/}        
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