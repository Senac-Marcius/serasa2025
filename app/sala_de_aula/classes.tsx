import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button } from 'react-native';
import MyView from '../../src/components/MyView'
import { useRouter } from 'expo-router';


export default function ClassScreen() {

    const [req, setReq] = useState({
        name: '',
        id: 0,
        date: '',
        quant: '',
        start_date: '',
        end_date: '',       
        createAt: new Date(),
    });

    const router = useRouter();

    return (
        <MyView router={router} >
            Olá mundo
            <Text>
                Minha tela das classes</Text>
                <View style={styles.row}>
                    <View style={styles.form}>
                        <TextInput
                        placeholder="Nome da Turma"
                        value={req.name}
                        onChangeText={(text) => setReq({...req, name: text})}
                        />

                        <TextInput
                        placeholder="Quantidade de Alunos"
                        value={req.quant}
                        onChangeText={(text) => setReq({...req, quant: text})}
                        />
                        
                        <TextInput
                        placeholder="Data de Inicio"
                        value={req.start_date}
                        onChangeText={(text) => setReq({...req, start_date: text})}
                        />

                        <TextInput
                        placeholder="Data de Finalização"
                        value={req.end_date}
                        onChangeText={(text) => setReq({...req, end_date: text})}
                        
                        />

                        <Button title="Cadastrar Turma" color= 'purple'/>

                    </View>
                    

                </View>
        </MyView>
    );

} 

const styles = StyleSheet.create({
    row : {
        flexDirection: 'row',   
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },    
    form:{
        flex: 1,
        marginRight: 10,
        padding: 20,
        backgroundColor: 'F2F2F2',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 4},
        shadowRadius: 5,


    },
})