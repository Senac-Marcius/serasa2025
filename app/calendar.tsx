import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
 
export default function CalendarScreen(){
//aqui é typescript
    const [req,setreq] = useState({
        studentname: '',
        course: '',
        registrationdate: '',
        period: '',
        id: 0,
        creadAt: new Date().toISOString(),

});

const [calendar, setCalendars] = useState<{studentname:string, course: string, registrationdate: string, period:string, id:number,  }[]>([])

function handleRegister(){ //apaga o estado de req para um objeto padrão e adiciona um novo objeto 
    setCalendars([...calendar,req])
    setreq({studentname: '',
        course: '',
        registrationdate: '',
        period: '',
        id: 0,
        creadAt: new Date().toISOString(), 
    })
}

return (
    <View>
        Olá Aluno! 
        {/*aqui é typescript dentro do front*/}
        <Text>Tela de Cronograma</Text>
        <View style={styles.row}>
            <View style ={styles.form}>
                
                <TextInput placeholder="Nome do aluno:" value={req.studentname} onChangeText={(text) => setreq({... req , studentname: text }) } />
                {req.studentname} 
                <TextInput placeholder="Curso:" value={req.course} onChangeText={(text) => setreq({... req , course:text }) } />
                {req.course} 
                <TextInput placeholder="Data da Matrícula:"value={req.registrationdate} onChangeText={(text) => setreq({... req , registrationdate:text }) } />
                {req.registrationdate} 
                <TextInput placeholder="Período:"value={req.period} onChangeText={(text) => setreq({... req , period:text }) } />
                {req.period}   

            <Button title='Acessar' onPress={ handleRegister } />

        
            </View> 
            
        </View> 

    </View>

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

    

})