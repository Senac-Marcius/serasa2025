import React, {useState} from 'react';//cria uma var que att sozinha qualquer obj que criarmos dentro dela 
import { View, Text, StyleSheet, FlatList, TextInput, Button, ScrollView, } from 'react-native';//como se fosse a div do html, ele agrupa as coisas 

export default function RecordScreen(){//função que será exportada
    const[req,setReq] = useState({
        id:0,
        name: '',
        email: '',                   
        rg: '',
        dateBirth:'',
        cpf: '',                   
        createAt: new Date().toString(),
    })

    const [records, setRecord] = useState<{
        id: number,
        name: string,
        email: string,                  
        rg: string,
        dateBirth:string,
        cpf: string,                   
        createAt: string,
    }[]>([])

    function handleRegister(){
        setRecord([...records, req, ])
        setReq({
            id: 0,
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
                    <TextInput placeholder= "Nome" value={req.name} onChangeText= { (text) => setReq({...req,name: text})}/>
                    
                    <TextInput placeholder= "Email" value={req.email} onChangeText= { (text) => setReq({...req,email: text})}/>
                    
                    <TextInput placeholder="RG" value={req.rg} onChangeText={(text) => setReq({ ...req, rg: text.replace(/[^0-9]/g, '') })} keyboardType="numeric"/>
                    
                    <TextInput placeholder= "Data de Nascimento" value={req.dateBirth} onChangeText= { (text) => setReq({...req,dateBirth: text})}/>
                    
                    <TextInput placeholder="CPF" value={req.cpf} onChangeText={(text) => setReq({ ...req, cpf: text.replace(/[^0-9]/g, '') })} keyboardType="numeric"/>
                    

                    <Button title='CADASTRAR'  onPress={ handleRegister }/>
                        
                </View>
                <ScrollView>
                    <FlatList
                        data={records}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <View style = {styles.itemContainer}>
                                <Text>Nome: {item.name}</Text>
                                <Text>Email: {item.email}</Text>
                                <Text>RG: {item.rg}</Text>
                                <Text>Data de Nascimento: {item.dateBirth}</Text>
                                <Text>CPF: {item.cpf}</Text>
                                <Text>Criado em:{item.createAt}</Text>

                            </View>                            
                        )}
                        showsVerticalScrollIndicator={true}
                        contentContainerStyle={{ paddingBottom: 50 }}
                    
                    />
                </ScrollView>
                

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    itemContainer: {
        backgroundColor: "#F2F2F2",
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
      },
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
        paddingBottom: 20,
    },
    formContainer: {
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
    listContainer: {
        flex: 1, 
        padding: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    /*subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    postItem: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
    },
    postText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    postUrl: {
        fontSize: 14,
        color: '#007BFF',
        marginBottom: 5,
    },*/
});