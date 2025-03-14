import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TextInputBase, FlatList } from 'react-native';


export default function ScheduleScreen(){
// aqui é typescript
    const [req, setReq] = useState({
            id: '',
            url: '',
            class: '',
            userId: 0,
            discipline: '',
            location: '',
            start_time: '',
            end_time: '',
            createAt: new Date().toISOString(),
        
    });

    const [schedules, setSchedules] = useState<{
        id: string,
        url: string,
        class: string,
        userId: number,
        discipline: string,
        location: string,
        start_time: string,
        end_time: string,
        createAt: string,
      
    }[]>([]);

    function handleRegister() {
        setSchedules([...schedules, req])
        setReq({
            id: req.id + 1,
            url: '',
            class: '',
            userId: 0,
            discipline: '',
            location: '',
            start_time: '',
            end_time: '',
            createAt: new Date().toISOString(),
        })
    }

    return (
        <View>
        
            {/* aqui é typescript dentro do front */}
            <text>Meu Cronograma</text>
            <View style={styles.row}>
                <View style={styles.form}>

                     <TextInput placeholder="url" value={req.url} onChangeText={(text) => setReq({...req, url:text})} /> 
                     <TextInput placeholder="class" value={req.class} onChangeText={(text) => setReq({...req, class:text})} /> 
                     <TextInput placeholder="discipline" value={req.discipline} onChangeText={(text) => setReq({...req, discipline:text})} /> 
                     <TextInput placeholder="location" value={req.location} onChangeText={(text) => setReq({...req, location:text})} /> 
                     <TextInput placeholder="start_time" value={req.start_time} onChangeText={(text) => setReq({...req, start_time:text})} /> 
                     <TextInput placeholder="end_time" value={req.end_time} onChangeText={(text) => setReq({...req, end_time:text})} /> 
                     
                     <Button title="CADASTRAR" onPress={ handleRegister } color="purple" />
                </View>

                <FlatList 
                    data={schedules}
                    keyExtractor={ (item) => item.id.toString()}
                    renderItem={({item}) => (
                        <View
                        style={styles.card}
                        > 
                            
                            


                            <text style={styles.form} > {item.discipline} </text>
                            <text> {item.userId} </text>
                            <text> {item.url} </text>
                            <text> {item.class} </text>
                            <text> {item.location} </text>
                            <text> {item.start_time} </text>
                            <text> {item.end_time} </text>
                            <text> {item.createAt} </text>
                        </View>
                    )}
                />
                
            </View>   
        </View>
        )             
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

       card: {
        flex: 1,
        marginRight: 10,
        padding: 40,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        marginBottom: 20,

        },



})





