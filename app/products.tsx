import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text} from 'react-native';
import MyView from '../src/components/MyView';
import { useRouter } from 'expo-router';
import {iProduct, setProduct, updateProduct, deleteProduct, getProducts} from '../src/controllers/products';
import MyButton from '../src/components/MyButtons';
import Mytext from '../src/components/MyText';
import {Myinput} from '../src/components/MyInputs';
import { MyItem } from '../src/components/MyItem';
import MyList from '../src/components/MyList';



export default function productScreen(){
//aqui é typescript

    const [req, setReq] = useState({
        description:'',
        name:'',
        amount: 0,
        id: -1,
        create_at:  new Date().toISOString(),
        user_id: 6,
    });
    
    const [products, setProducts] = useState<iProduct[]>([]);

    useEffect(()=> {
        async function getTodos(){
            const retorno = await getProducts({})
            if (retorno.status && retorno.data && retorno.data.length > 0){
                setProducts(retorno.data);
            }
        }
             getTodos 
            
            
    }, []);
       

    
    async function handleRegister() {

        //se for um item editado, ele deve chamar o registro existente
        if (req.id == -1) {
            const newid = products.length? products[products.length - 1].id + 1 : 0;
            const newProduct = {...req, id: newid}
    
            setProducts([...products, newProduct]);
            await setProduct(newProduct)
    
        } else{ //senão, ele deve criar um novo registro
            await updateProduct(req)//aqui vc vai chamada sua função de editar do controlador
            setProducts(products.map((d) => (d.id == req.id)? req: d));
        }
        setReq({
            description: '',
            name: '',
            amount: 0,
            id: -1,
            create_at: new Date().toISOString(),
            user_id: 6
        });
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
        <MyView>
       
            <Mytext style={styles.h2}>Cadastro de Produtos</Mytext>
        
            <View style={styles.row}>
                <View style={styles.form}>

                    <Myinput 
                    placeholder="Digite o Nome"
                    value={req.name}
                    onChangeText={(text) => setReq({ ...req, name:text })}
                    label="Produto"
                    iconName='storefront' 
                
                    />
            
                    <Myinput 
                    placeholder= "Descrição"
                    value={req.description}
                    onChangeText={(text)=>setReq({...req, description:text})}
                    label= 'Descrição'
                    iconName='description' 
                    />

                    <Myinput 
                    placeholder= "Quantidade"
                    value={ String(req.amount) }
                    onChangeText={(text)=>setReq({...req, amount: Number(text) })}
                    label= 'Quantidade'
                    iconName='123' 
                    />
                    <MyButton style={styles.cadastrar} onPress={handleRegister} title='Cadastrar'/>
                </View>

                <MyList
                    data={products}
                    keyItem={(item) => item.id.toString()}
                    renderItem={({item})=>(
                        <MyItem
                            onEdit={() => editProduct(item.id)}
                            onDel={async () => {
                                await deleteProduct(item.id);
                                dellProduct(item.id);
                            }}
                        >
                            <Text>{item.name}</Text>
                            <Text>{item.description}</Text>
                            <Text>{item.amount}</Text>
                            <Text>{new Date(item.create_at).toLocaleString()}</Text>
                            <Text>{item.user_id}</Text>
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
        fontSize: 40,
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
    












