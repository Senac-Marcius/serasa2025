import React,{useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, BackHandler} from 'react-native';

export default function ScheduleScreen(){
    const [req, setReq] = useState({
        id: 0,
        userId: 0,
        createAt: new Date().toISOString(),
        titles:'',
        description:''
    })

    const [posts, setPost] = useState<{
        titles: string, 
        description: string, 
        id: number,
        userId: number
    }[]>([])

    function handleRegister(){
        setPost([...posts, req])
        setReq({id: 0,
            userId: 0,
            createAt: new Date().toISOString(),
            titles:'',
            description:''})
    }
    
    return(
        <View style={styles.body}>
            <Text style={styles.title}>Agenda</Text>
        <View style={styles.container}>
                <Text>Titulo</Text>
                <TextInput  placeholder='Digite o titulo:'
                value={req.titles}
                onChangeText={(text) => setReq({...req ,titles:text})}/>

                {req.titles}

                <Text>Description</Text>
                <TextInput placeholder='Digite a descricao:'
                value={req.description}
                onChangeText={(text) => setReq({...req ,description:text})}/>
                <Button 
                title='Cadastre' onPress={handleRegister}/>

                {req.description}

        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
    width: '100%',
    height: '100%',  
},

container: {
    width: 700,
    height: 500,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto', 
    textAlign: 'center',
    backgroundColor: '#61dafb',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 6
},

title: {
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: '#20232a',
    backgroundColor: '#61dafb',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
}


    })