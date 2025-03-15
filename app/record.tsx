import React, {useState} from 'react';//cria uma var que att sozinha qualquer obj que criarmos dentro dela 
import { View, Text, StyleSheet, FlatList, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';//como se fosse a div do html, ele agrupa as coisas 

export default function RecordScreen(){//função que será exportada
    const[req,setReq] = useState({
        id:-1,
        name: '',
        email: '',                   
        rg: '',
        dateBirth:'',
        cpf: '',                   
        createAt: new Date().toString(),
    })

    const [records, setRecord] = useState<{//cria o vetor records e coloca as informações nele
        id: number,
        name: string,
        email: string,                  
        rg: string,
        dateBirth:string,
        cpf: string,                   
        createAt: string,
    }[]>([])

    function handleRegister(){

        /*if (!name.trim() || !email.trim() || !rg.trim() || !dateBirth.trim() || !cpf.trim()) {
            alert('Preencha todos os campos!');
            return;
        }*/

        if(req.id == -1){
            const newId = records.length ? records[records.length - 1].id+1:0;
            const newPost = {...req, id: newId};
            setRecord([...records, newPost])//passa os dados de um novo registro em req para o vetor records
        }else{
            setRecord(records.map(item => (item.id == req.id ? req : item)));
        }

        setReq({//reseta os campos
            id: -1,
            name: '',
            email: '',                   
            rg: '',
            dateBirth:'',
            cpf: '',                   
            createAt: new Date().toString(),
        })
        
    }
    const editRecord = (id: number) => {
        const recordAtt = records.find(item => item.id == id)
        if(recordAtt)
            setReq(records);
    };

    const deleteRecord = (id: number) => {
        const recordIndex = records.filter(item => item.id != id)
        if(records)
            setReq(recordIndex);
    };



    return (
        <View>
            {/* isso é um comentário em typescrispt dentro do front */}

            <Text style = {styles.title}>Solicitação de Documentos</Text>
            <View style = {styles.row}>{/* variavel.parametro da Function */}
                <View style = {styles.form}>
                    <TextInput style={styles.input} placeholder= "Nome" value={req.name} onChangeText= { (text) => setReq({...req,name: text})}/>
                    
                    <TextInput style={styles.input} placeholder= "Email" value={req.email} onChangeText= { (text) => setReq({...req,email: text})}/>
                    
                    <TextInput style={styles.input} placeholder="RG" value={req.rg} onChangeText={(text) => setReq({ ...req, rg: text.replace(/[^0-9]/g, '') })} keyboardType="numeric"/>
                    
                    <TextInput style={styles.input} placeholder= "Data de Nascimento" value={req.dateBirth} onChangeText= { (text) => setReq({...req,dateBirth: text})}/>
                    
                    <TextInput style={styles.input} placeholder="CPF" value={req.cpf} onChangeText={(text) => setReq({ ...req, cpf: text.replace(/[^0-9]/g, '') })} keyboardType="numeric"/>
                    

                    <Button title='CADASTRAR'  onPress={ handleRegister }/>
                        
                </View>
                <ScrollView style={{flex:1}}>
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

                                <View style = {styles.buttonsContainer} >                                    
                                    <TouchableOpacity style={styles.button} onPress={()=>{editRecord(item.id)}}>
                                        <Text style={styles.buttonText}>EDIT</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button} onPress={()=>{deleteRecord(item.id)}}>
                                        <Text style={styles.buttonText}>DELETE</Text>
                                    </TouchableOpacity>
                                </View>
 
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
    buttonsContainer: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        marginTop: 10
        
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
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#3498db", // Cor de fundo do botão
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
      },
      buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
      },
    /*subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
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