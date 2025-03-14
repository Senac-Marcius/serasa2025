import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, Button, FlatList} from 'react-native';

export default function LaunchScreen() {
    const [req, setReq] = useState({
        Id: 0,
        observation:'',
        presence:'',
        indicator:'',
        note: '',
        createAt: new Date().toISOString(),
        userId: 0,
    });

    const [launchs, setLaunchs] = useState<{
        Id: number, 
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
            Id: req.Id + 1,
            observation:'',
            presence:'',
            indicator:'',
            note: '',
            createAt: new Date().toISOString(),
            userId: 0,

    })

    }
    
    return(
        <View style={styles.row}>
            <View style={styles.form}>
                <Text>Lançamentos de Alunos:</Text>
           
                    <TextInput 
                        placeholder="Digite a Observação:"      
                        value={req.observation}
                        onChangeText={(text) => setReq({...req, observation: text})} 
                    />
                    

                    <TextInput 
                     placeholder="Digite a Nota:"      
                     value={req.note}
                     onChangeText={(text) => setReq({...req, note: text})} 
                 />
                

                    <TextInput
                     placeholder="Presença:"   
                     value={req.presence}
                     onChangeText={(text) => setReq({...req, presence: text})} 
                 />
                

                    <TextInput 
                    placeholder="Indicador"
                    value={req.indicator}
                    onChangeText={(text) => setReq({...req, indicator: text})} 

                    />

                    <Button title="CADASTRAR" onPress={ handleRegister } color="purple" />


            </View>

            <FlatList 
            data={launchs}
            keyExtractor={(item) => item.Id.toString()}
            renderItem={({item}) => (
                <View
                style={styles.card}
             >


                  <Text>{item.observation}</Text> 
                  <Text>{item.note}</Text>
                  <Text>{item.presence}</Text>
                  <Text>{item.indicator}</Text>
                  <Text>{item.createAt}</Text>
                  <Text>{item.userId}</Text>
                </View>
                

                )}
             />
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

    card: {
        flex: 5,
        marginRight: 15,
        padding: 25,
        backgroundColor: '#F2F2F2',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.6,
        shadowOffset: { width: 2, height: 6 },
        shadowRadius: 6,
        marginBottom: 10,
    },

    }
)