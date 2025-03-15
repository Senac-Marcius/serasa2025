import { setStatusBarBackgroundColor } from 'expo-status-bar';
import React,{ useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button } from 'react-native';

export default function CoursesScreen(){
    const [req, setReq] = useState({
        description: '',
        Courseplan: '',
        Orientationplan: '',
        Workload: '',
        id: 0,
        userId: 0,

    });

    const [courses, setCourses] = useState<{description: string,
         Courseplan: string,
          Orientationplan: string,
           Workload: string,
           id: number,
           userId: number,
         }[]> ([]);

    function handleRegister(){
        setCourses([...courses, req])
        setReq({
        description: '',
        Courseplan: '',
        Orientationplan: '',
        Workload: '',
        id: 0,
        userId: 0,
        })
    }

    return (
      <View>
        <Text>Cursos</Text>
        <View style={styles.row}>
            <View style={styles.form}>
                <TextInput
                    placeholder='Descrição:'
                    value={req.description}
                    onChangeText={(text) => setReq({...req,description: text})}
                />
                {req.description}
                <TextInput
                    placeholder='Plano de curso:'
                    value={req.Courseplan}
                    onChangeText={(text) => setReq({...req,Courseplan: text})}
                />
                {req.Courseplan}
                <TextInput
                   placeholder='Plano de curso:'
                   value={req.Orientationplan}
                   onChangeText={(text) => setReq({...req,Orientationplan: text})}
                />
                {req.Orientationplan}
                <TextInput
                    placeholder='Carga horaria:' 
                    value={req.Workload}
                   onChangeText={(text) => setReq({...req,Workload: text})}
                />
                {req.Workload}
            </View>            
        </View>
        <button title='CADASTRAR' onProgress={handleRegister}/>  
      </View>  
    );
}

const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'flex-start'
    },
    form:{
       flex:1,
       marginRight:10,
       padding:20,
       backgroundColor: '#F2F2F2',
       borderRadius:10,
       shadowColor: '#000',
       shadowOpacity: 0.1,
       shadowOffset: {width: 0, height: 4},
       textShadowRadius: 5, 
    }, 
    button:{
        backgroundColor: '#1C1C1C',
        padding: 5,
        margin: 5,
        width: 2,
    }
})