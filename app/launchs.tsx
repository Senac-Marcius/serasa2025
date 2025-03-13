import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';

export default function LaunchScreen() {
    const [req, setReq] = useState({
        observation:'',
        presence:'',
        indicator:'',
        note: '',
        createAt: new Date().toISOString(),
        userId: 0,
    });

    const [launchs, setLaunchs] = useState<{
        observation: string,
        presence: string,
        indicator: string,
        note: string,
        createAt: string,
        userId: number,
    
    }[]>([]);

    function handleRegister() {
        setLaunchs([...launchs, req])
        setReq({ 
            observation:'',
            presence:'',
            indicator:'',
            note: '',
            createAt: new Date().toISOString(),
            userId: 0,

    })

    }
    return(
        <View>
            <Text>Lançamentos de Alunos:</Text>
           
                    <TextInput 
                        placeholder="Digite a Observação:"      
                        value={req.observation}
                        onChangeText={(text) => setReq({...req, observation: text})} 
                    />
                    {req.observation}

                    <TextInput 
                     placeholder="Digite a Nota:"      
                     value={req.note}
                     onChangeText={(text) => setReq({...req, note: text})} 
                 />
                 {req.note}

                    <TextInput
                     placeholder="Presença:"   
                     value={req.presence}
                     onChangeText={(text) => setReq({...req, presence: text})} 
                 />
                 {req.presence}

                    <TextInput 
                    placeholder="Indicador"
                    value={req.indicator}
                    onChangeText={(text) => setReq({...req, indicator: text})} 

                    />

                    <Button title="CADASTRAR" onPress={ handleRegister } color="purple" />

                </View>
    );

}
const style = StyleSheet.create({
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