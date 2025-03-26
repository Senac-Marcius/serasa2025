import React, { Children, useState } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import { TextInput, Text} from 'react-native-paper';
import { useRouter } from 'expo-router';
import { DatePickerModal } from 'react-native-paper-dates';
import Perfil from '../src/components/Myperfil'

export default function productScreen(){
//aqui é typescript

    const [req, setReq] = useState({
        description:'',
        name:'',
        id: -1,
        createAt:  new Date().toISOString(),
        userId: 0,
    });
    
    const [products, setProducts] = useState<{ 
        description: string,
        name: string,
        id: number,
        userId: number,
        createAt: string
        }[]>([]);

        function handleRegister(){  
            if(req.id == -1){

                const newId = products.length ? products[products.length - 1].id+1:0;
                const newProduct = { ...req, id: newId}
                
                setProducts([...products, newProduct]); 
                
                
            }else{ 
                setProducts ( products.map ( p => (p.id == req.id) ? req : p));
            }
            setReq({
                description:'',
                name:'',
                id: -1,
                createAt:  new Date().toISOString(),
                userId: 0,})  
        }

        function editProduct(id:number){
            const product = products.find(p => p.id == id)
            if(product)
            setReq(product)
        }
        function dellProduct(id:number){
            const list = products.filter(p => p.id != id)
            if(list)
                setProducts(list)
        }
    return (
        <View>
            
            <Text style={styles.h1}> Produtos </Text>
                {/*aqui é typescript dentro do front */ }
            <Text style={styles.h2}>Minha tela dos Produtos</Text>
                <View style={styles.row}>
                    <View style={styles.form}>
                            
                        <TextInput style={styles.input}
                        placeholder="Digite o nome"
                        value={req.name}
                        onChangeText={(text)=> setReq({...req, name: text})}
                        />
                            
                        <TextInput style={styles.input}
                        placeholder="Digite a descrição" 
                        value={req.description}
                        onChangeText={(text)=> setReq({...req, description: text})}
                        />
                        

                        <TouchableOpacity style={styles.cadastrar} onPress={()=>{handleRegister()}}>Cadastrar</TouchableOpacity>

                    </View>

            
                    <FlatList
                        data={products}
                        keyExtractor={(item) => item.id.toString() }
                        renderItem={({item}) => (
                            <View  style={styles.cadastroForm}>
                                <Text>{item.description}</Text>
                                <Text>{item.name}</Text>
                                <Text>{item.createAt}</Text>
                                <Text>{item.userId}</Text>
                                <View style={styles.buttonsContainer}>
                                    
                                    <TouchableOpacity style={styles.edit} onPress={()=>{editProduct(item.id)}}>Edit</TouchableOpacity>
                                    <TouchableOpacity style={styles.delete}onPress={()=>{dellProduct(item.id)}}>Delete</TouchableOpacity>
                                </View>  
                            </View>  
                                
                        )
                        
                        }
                    />
                </View> 
        </View> 
            
    );
}


const styles = StyleSheet.create({
    edit: {
        fontSize: 15,
        padding: 10,
        backgroundColor: '#FFDB58',
        borderRadius: 100,
        fontFamily: 'arial'
    },
    delete: {
            fontSize: 15,
            padding: 10,
            backgroundColor: '#BC544B',
            borderRadius: 100,
            fontFamily: 'arial',
    },
    row: {
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
    h2: {
        fontSize: 25,
        textAlign: 'center', 
    },
    h1: {
        fontSize: 25,
        textAlign: 'center',
        marginRight: 10,
        padding: 20,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        
        
    },
    cadastroForm: {
        flex: 1,
        marginRight: 10,
        marginBottom: 20,
        padding: 20,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        fontSize: 15,
        padding: 40,
        


    },
    input: {
        fontSize: 15,
        textAlign: 'left',
        marginRight: 10,
        padding: 10,
        borderRadius: 10,  
        margin: 10,
        borderStyle: 'solid' ,
        borderWidth: 2,
        borderColor:'#ADD8E6',
        
    },
    cadastrar:{
        fontFamily: 'Arial',
        fontSize: 15,
        textAlign: 'center',
        flex: 1,
        color:'9400D3',
        borderRadius: 5,
        backgroundColor: '#ADD8E6',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        marginRight: 10,
        marginTop: 80,
        marginBottom: 10,
        padding: 20,
    }
})
    












