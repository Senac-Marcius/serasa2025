import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity} from 'react-native';
import MyView from '../src/components/MyView';
import { useRouter } from 'expo-router';


export default function CalendarsScreen(){
//aqui é typescript


const [calendars, setCalendars] = useState<{studentname:string, course: string, registrationdate: string, period:string, id:number, creadAt:string }[]>([])

function handleRegister(){ //apaga o estado de req para um objeto padrão e adiciona um novo objeto 
    if(req.id == -1){
        const newId =calendars.length ? calendars[calendars.length - 1]. id + 1 :0; 
        const newcalendar = {...req, id:newId}

        setCalendars([...calendars, req]);

    }else{
        setCalendars(calendars.map(c=>( c.id == req.id ? req : c) ) ); 

    }

    setCalendars([...calendars,req])
    setReq({studentname: '',
        course: '',
        registrationdate: '',
        period: '',
        id: -1,
        creadAt: new Date().toISOString(), 
    })
}

function editCalendar (id:number){
    const edit = calendars.find (c => c.id == id)
    if(edit)
        setReq(edit);
}

function delCalendar (id:number){
    const item = calendars.filter (c => c.id != id)
    if(item) 
        setCalendars(item)
}

const router = useRouter();

return (
    <MyView router={router} >

        {/*aqui é typescript dentro do front*/}
        <Text>Tela de Cronograma</Text>
        <View style={styles.row}>
            <View style ={styles.form}>
                
                <TextInput placeholder="Nome do aluno:" value={req.studentname} onChangeText={(text) => setReq({... req , studentname: text }) } />
                
                <TextInput placeholder="Curso:" value={req.course} onChangeText={(text) => setReq({... req , course:text }) } />
                
                <TextInput placeholder="Data da Matrícula:"value={req.registrationdate} onChangeText={(text) => setReq({... req , registrationdate:text }) } />
                
                <TextInput placeholder="Período:"value={req.period} onChangeText={(text) => setReq({... req , period:text }) } />
                   

            <Button title='Acessar' onPress={ handleRegister } />

        
            </View> 
            <View style={styles.listContainer}>
            <FlatList
                data={calendars}
                keyExtractor= { (item) => item.id. toString ()}
                
                renderItem={({item})=> (
                    <View style ={styles.list}>
                    
                        <Text style ={styles.item}>Nome do aluno:  {item.studentname}</Text>
                        <Text style ={styles.item}>Curso: {item.course}</Text>
                        <Text style ={styles.item}>Data da matricula: {item.registrationdate}</Text>
                        <Text style ={styles.item}>Periodo: {item.period}</Text>
                    
                        <View style={styles.buttonsI}>
                            <TouchableOpacity onPress={ () => {editCalendar(item.id)} }>EDIT</TouchableOpacity>
                            <TouchableOpacity onPress={ () => {delCalendar(item.id)} }>DELET</TouchableOpacity>
                        </View>  
                   
                    </View>
                )}
        />
        </View>
        </View> 
    </MyView>

    );
}

const styles = StyleSheet.create({ 
    row:{
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

 
    list: {
        flex: 1,
        marginRight: 10,
        padding: 20,
        marginBottom: 10,
        borderWidth: 1, 
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
    },

    listContainer: {
        flex: 1,
    },
    
    item:{
        fontSize: 14,
        color: '#007BFF',
        marginBottom: 5,
        
    },

    buttonsI: {
        flexDirection: 'row',
        marginTop: 5,
      },
    
      buttonText: {
        color: '#007BFF',
        fontWeight: 'bold',
      },


    
})