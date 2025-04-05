import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TextInputBase, FlatList, TouchableOpacity } from 'react-native';
import MyView from '../src/components/MyView';
import { useRouter } from 'expo-router';
import MyCalendar from '../src/components/MyCalendar'; 
import MySearch from '../src/components/MySearch';
import {setTimeline, iTimeline} from '../src/controllers/timelines';
import { supabase } from '../src/utils/supabase';
import MyButton from '../src/components/MyButtons';


export default function TimelineScreen(){
// aqui é typescript
    const [req, setReq] = useState({
            id: -1,
            url: '',
            class_id: 2,
            discipline: '',
            local_id: 1,
            start_time: '',
            end_time: '',
            created_at: new Date().toISOString(),
        
    });

    const [timelines, setTimelines] = useState<iTimeline[]>([]);

    useEffect(() => {
        (async () => {

            const{ data: todos}= await supabase.from('timelines').select()

            if (todos && todos.length > 1){
                setTimelines(todos)
            }

        }) ()
    },[])
   

    async function handleRegister() {
        if(req.id == -1){
            const newId = timelines.length ? timelines[timelines.length -1].id + 1 : 0;
            const newTimeline = {...req, id: newId};
            setTimelines([...timelines, newTimeline]);
            const result = await setTimeline(newTimeline)
            console.log(result)
        }else{
            setTimelines(timelines.map(s =>(s.id == req.id) ? req : s));
        }
        setReq({ 
            id: -1,
            url: '',
            class_id: 2,
            discipline: '',
            local_id: 1,
            start_time: '',
            end_time: '',
            created_at: new Date().toISOString(),
        })
    }
    
    function editTimelines(id:number){
        const timeline = timelines.find(s => s.id == id) 
        if(timeline)
        setReq(timeline)
    }

    function delTimelines(id:number){
        const list = timelines.filter(s => s.id != id)
            setTimelines(list)
    }

    const router = useRouter();

    
    function buscar(){
        
    }

    const [busca, setBusca] = useState('')



    return (
        <MyView router={router} > 


        <MySearch
            style={{marginTop:20}}
            onChangeText={setBusca}
            onPress={buscar}
            busca={busca}
        />


        
         {/*aqui chamar o calendario*/}
         <MyCalendar
                    date='2021-10-10'
                    setDate={(date) => console.log(date)}
                    icon=''
            />

            {/* aqui é typescript dentro do front */}
            <text>Meu Cronograma</text>
            <View style={styles.row}>
                <View style={styles.form}>

                     <TextInput placeholder="Digite a url:" value={req.url} onChangeText={(text) => setReq({...req, url:text})} /> 
                     <TextInput placeholder="Digite a disciplina:" value={req.discipline} onChangeText={(text) => setReq({...req, discipline:text})} /> 
                     <TextInput placeholder="Digite o horário de início:" value={req.start_time} onChangeText={(text) => setReq({...req, start_time:text})} /> 
                     <TextInput placeholder="Digite o horário do fim:" value={req.end_time} onChangeText={(text) => setReq({...req, end_time:text})} /> 
                     
                     <Button title="CADASTRAR" onPress={ handleRegister } color="purple" />
                </View>

                <FlatList 
                    data={timelines}
                    keyExtractor={ (item) => item.id.toString()}
                    renderItem={({item}) => (
                        <View style={ styles.item}>
                        
                         
                            <Text> {item.discipline} </Text>
                            <Text> {item.url} </Text>
                            <Text> {item.start_time} </Text>
                            <Text> {item.end_time} </Text>
               
                            <View style={styles.buttonsContanier}>
                                <TouchableOpacity style={styles.buttonedit} onPress={ () => { editTimelines (item.id) } } >EDIT</TouchableOpacity>
                                <TouchableOpacity style={styles.buttondel} onPress={() => {delTimelines (item.id)}}>DELETE</TouchableOpacity>

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

    button: {
        flexDirection: 'row',
        alignContent: 'space-between',
        alignItems: 'center',
        gap: 10,
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





