import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TextInputBase, FlatList, TouchableOpacity } from 'react-native';
import MyView from '../src/components/MyView';
import { useRouter } from 'expo-router';

export default function ScheduleScreen(){
// aqui é typescript
    const [req, setReq] = useState({
            id: -1,
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
        id: number,
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
        if(req.id == -1){
            const newId = schedules.length ? schedules[schedules.length -1].id + 1 : 0;
            const newSchedule = {...req, id: newId};

            setSchedules([...schedules, newSchedule]);
        }else{
            setSchedules(schedules.map(s =>(s.id == req.id) ? req : s));
        }
        setReq({ 
            id: -1,
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
    
    function editSchedules(id:number){
        const schedule = schedules.find(s => s.id == id) 
        if(schedule)
        setReq(schedule)
    }

    function delSchedules(id:number){
        const list = schedules.filter(s => s.id != id)
            setSchedules(list)
    }

    const router = useRouter();

    return (
        <MyView router={router} > 
        
            {/* aqui é typescript dentro do front */}
            <text>Meu Cronograma</text>
            <View style={styles.row}>
                <View style={styles.form}>

                     <TextInput placeholder="Digite a url:" value={req.url} onChangeText={(text) => setReq({...req, url:text})} /> 
                     <TextInput placeholder="Digite a classe:" value={req.class} onChangeText={(text) => setReq({...req, class:text})} /> 
                     <TextInput placeholder="Digite a disciplina:" value={req.discipline} onChangeText={(text) => setReq({...req, discipline:text})} /> 
                     <TextInput placeholder="Digite a localização:" value={req.location} onChangeText={(text) => setReq({...req, location:text})} /> 
                     <TextInput placeholder="Digite o horário de início:" value={req.start_time} onChangeText={(text) => setReq({...req, start_time:text})} /> 
                     <TextInput placeholder="Digite o horário do fim:" value={req.end_time} onChangeText={(text) => setReq({...req, end_time:text})} /> 
                     
                     <Button title="CADASTRAR" onPress={ handleRegister } color="purple" />
                </View>

                <FlatList 
                    data={schedules}
                    keyExtractor={ (item) => item.id.toString()}
                    renderItem={({item}) => (
                        <View style={ styles.item}>
                        
                         
                            <Text> {item.discipline} </Text>
                            <Text> {item.userId} </Text>
                            <Text> {item.url} </Text>
                            <Text> {item.class} </Text>
                            <Text> {item.location} </Text>
                            <Text> {item.start_time} </Text>
                            <Text> {item.end_time} </Text>
                            <Text> {item.createAt} </Text>  
               
                            <View style={styles.buttonsContanier}>
                                <TouchableOpacity style={styles.buttonedit} onPress={ () => { editSchedules (item.id) } } >EDIT</TouchableOpacity>
                                <TouchableOpacity style={styles.buttondel} onPress={() => {delSchedules (item.id)}}>DELETE</TouchableOpacity>

                            </View>
                                


                        </View>
                    )}
                />
                
            </View>   
        </MyView>
        )             
}

const styles = StyleSheet.create({
    buttonsContanier: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20, 
        alignContent: 'space-around',
        padding: 20,
        borderRadius: 10,
    },


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

       item: {
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

        buttonedit: {
            alignItems: 'center',
            padding: 20,
            borderRadius: 10,
            backgroundColor: 'purple',
            textAlign: 'center',
        },
        
        buttondel:{
            alignItems: 'center',
            padding: 20,
            borderRadius: 10,
            backgroundColor: 'gray',
            textAlign: 'center',
           
            

        },
})





