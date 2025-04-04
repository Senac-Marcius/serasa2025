import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import { TextInput, Text} from 'react-native-paper';
import MyView from '../src/components/MyView';
import { useRouter } from 'expo-router';
import {products, setProduct} from '../src/controllers/products';
import MyButton from '../src/components/MyButtons';
import Mytext from '../src/components/MyText';
import {Myinput} from '../src/components/MyInputs';
import { MyItem } from '../src/components/MyItem';
import MyList from '../src/components/MyList';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';



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
                setProduct(newProduct)
                
                
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

    const router = useRouter();
    return (
        <MyView router={router} >
       
        <Mytext style={styles.h2}>Cadastro de Produtos</Mytext>
        
        <View style={styles.row}>
            <View style={styles.form}>

                <Myinput 
                placeholder="Digite o Nome"
                value={req.name}
                onChangeText={(text) => setReq({ ...req, name:text })}
                label="Produto"
                 iconName='product' 
            
                />
          
                <Myinput 
                   placeholder= "Descrição"
                   value={req.description}
                   onChangeText={(text)=>setReq({...req, description:text})}
                   label= 'Descrição'
                   iconName='description' 
                   />

                    <MyButton style={styles.cadastrar} onPress={handleRegister} title='Cadastrar'></MyButton>            
            </View>

            <MyList
                data={products}
                keyItem={(Item) => Item.id.toString()}
                renderItem={({item})=>(
                    <MyItem>
                        <text>{item.name}</text>
                        <text>{item.description}</text>
                        <text>{item.createAt}</text>
                        <text>{item.userId}</text>

                        
                        <MyButton style={styles.edit}title='Editar' onPress={() => {editProduct(item.id)}}/>
                        <MyButton style={styles.delete}title='Deletar' onPress={() => {dellProduct(item.id)}}/>
                    
                </MyItem>

            )}
            
            />
        </View>
    </MyView>

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
    },
})
    












