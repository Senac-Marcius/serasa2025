import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, } from 'react-native';

export default function investmentScreen(){
 //aqui é typescript   
    const [req, setReq] = useState({
        description: '',
        name: '',
        url: '',
        id: 0,
        createAt: new Date().toISOString(),
        userId: '',
        value: '',
    });

    const [investments, setInvestments] = useState<{
        description: string,
        url: string,
        name: string,
        id: number,
        createAt: string,
        userId: string,
    }[]>([]);

    function handleRegister(){
        setInvestments([...investments, req]);
        setReq({
            description: '',
            name: '',
            url: '',
            id: 0,
            createAt: new Date().toISOString(),
            userId: '',
            value: '',
        });
    
    }

    return (
      <View>
        {/* Aqui é typescript dentro do fron */}
        <Text>Meus Investimentos</Text>
        <View style={styles.row}>
            <View style={styles.form}>
                <TextInput
                    placeholder='Descrição'
                    value={req.description}
                    onChangeText={(text) => setReq({...req, description: text })}
                />
                <TextInput
                    placeholder='Nome'
                    value={req.name}
                    onChangeText={(text) => setReq({...req, name: text })}
                />
                <TextInput
                    placeholder='URL'
                    value={req.url}
                    onChangeText={(text) => setReq({...req, url: text })}
                />
                <TextInput
                    placeholder='Valor'
                    value ={req.value}
                    onChangeText={(text) => setReq({...req, value: text })}
                />
                <TextInput
                    placeholder='UserId'
                    value={req.userId}
                    onChangeText={(text) => setReq({...req, userId: text })}
                />

                <Button title='Cadastrar' onPress={ handleRegister }/> 
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
    form : {
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