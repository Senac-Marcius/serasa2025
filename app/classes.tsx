import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button } from 'react-native';

export default function ClassScreen() {

    const [Req, setReq] = useState({
        name: '',
        id: 0,
        date: '',
        start_date: '',
        end_date: '',       
        createAt: new Date(),
    });



    return (
        <View>
            Olá mundo
            <Text>
                Minha tela das classes</Text>
                <View style={styles.row}>
                    <View style={styles.form}>
                        <TextInput
                        placeholder="Nome da Turma"
                        value={Req.name}
                        onChangeText={(text) => setReq({...Req, name: text})}
                        />
                        {Req.name}
                        <TextInput
                        placeholder="Quantidade de Alunos"
                        value={Req.quant}
                        onChangeText={(text) => setReq({...Req, quant: text})}
                        />
                        {Req.quant}
                        <TextInput
                        placeholder="ID da Turma"
                        value={Req.id}
                        onChangeText={(text) => setReq({...Req, id: text})}
                        />
                        {Req.id}
                        <TextInput
                        placeholder="Data de criação da Turma"
                        value={Req.date}
                        onChangeText={(text) => setReq({...Req, date: text})}
                        />
                        {Req.date}
                        <TextInput
                        placeholder="Data de Inicio"
                        value={Req.start_date}
                        onChangeText={(text) => setReq({...Req, start_date: text})}
                        />
                        {Req.start_date}
                        <TextInput
                        placeholder="Data de Finalização"
                        value={Req.end_date}
                        onChangeText={(text) => setReq({...Req, end_date: text})}
                        
                        />
                        {Req.end_date}

                        <Button title="Cadastrar Turma" color= 'purple'/>

                    </View>
                    

                </View>
        </View>
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