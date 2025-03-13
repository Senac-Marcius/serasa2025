import React, {useState} from 'react';//cria uma var que att sozinha qualquer obj que criarmos dentro dela 
import { View, Text, StyleSheet, FlatList, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';//como se fosse a div do html, ele agrupa as coisas 

export default function RecordScreen(){//função que será exportada
    const[req,setReq] = useState({

        name: '',
        email: '',                   
        rg: '',
        dateBirth:'',
        cpf: '',                   
        createAt: new Date().toString(),
    })

    const [records, setRecord] = useState<{
        name: string,
        email: string,                  
        rg: string,
        dateBirth:string,
        cpf: string,                   
        createAt: string,
    }[]>([])

    function handleRegister(){
        setRecord([...records, req])
        setReq({
            name: '',
            email: '',                   
            rg: '',
            dateBirth:'',
            cpf: '',                   
            createAt: new Date().toString(),
        })
    }



    return (
        <View>
            {/* isso é um comentário em typescrispt dentro do front */}

            <Text style = {styles.title}>Solicitação de Documentos</Text>
            <View style = {styles.row}>{/* variavel.parametro da Function */}
                <View style = {styles.form}>
                    <TextInput aria-label='Nomeee' placeholder= "Nome" value={req.name} onChangeText= { (text) => setReq({...req,name: text})}/>
                    {req.name}
                    <TextInput placeholder= "Email" value={req.email} onChangeText= { (text) => setReq({...req,email: text})}/>
                    {req.email}
                    <TextInput placeholder="RG" value={req.rg} onChangeText={(text) => setReq({ ...req, rg: text.replace(/[^0-9]/g, '') })} keyboardType="numeric"/>
                    {req.rg}
                    <TextInput placeholder= "Data de Nascimento" value={req.dateBirth} onChangeText= { (text) => setReq({...req,dateBirth: text})}/>
                    {req.dateBirth}
                    <TextInput placeholder="CPF" value={req.cpf} onChangeText={(text) => setReq({ ...req, cpf: text.replace(/[^0-9]/g, '') })} keyboardType="numeric"/>
                    {req.cpf}

                    <Button title='CADASTRAR' onPress={ handleRegister }/>

   
                </View>
                

            </View>
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
        flex: 1,//primeiro item
        marginRight: 10,
        padding: 20,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5, // Sombra no Android
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

});
