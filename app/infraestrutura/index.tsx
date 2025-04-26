import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text} from 'react-native';
import MyView from '../../src/components/MyView';
import { useRouter } from 'expo-router';
import {iProduct, setProduct, updateProduct, deleteProduct, getProducts} from '../../src/controllers/products';
import MyButton from '../../src/components/MyButtons';
import Mytext from '../../src/components/MyText';
import {Myinput} from '../../src/components/MyInputs';
import { MyItem, MyTb } from '../../src/components/MyItem';
import MyList from '../../src/components/MyList';
import { MyModal_mobilefullscreen } from '../../src/components/MyModal';
import { getCategories, toListCategorie } from '../../src/controllers/category';
import MySelect from '../../src/components/MySelect';



export default function infraScreen(){
//aqui é typescript

    const [req, setReq] = useState({
        description:'',
        name:'',
        amount: 0,
        id: -1,
        create_at:  new Date().toISOString(),
        category_id:-1
    });
    
    const [products, setProducts] = useState<iProduct[]>([]);

    const [cats, setCats] = useState<any[]>([]);

    const [visible, setVisible] = useState(false)

    useEffect(()=> {
        (async ()=> {
            const retorno = await getProducts({})
            if (retorno.status && retorno.data && retorno.data.length > 0){
                setProducts(retorno.data);
            }
        })();

        (async ()=> {
            const retorno = await getCategories({})
            if (retorno.status && retorno.data && retorno.data.length > 0){
                setCats( toListCategorie( retorno.data) );
            }
        })();
    }, []);
       

    
    async function handleRegister() {
        console.log('passou 1');
        //se for um item editado, ele deve chamar o registro existente
        if (req.id == -1) {
            console.log('passou 2');
            const newid = products.length? products[products.length - 1].id + 1 : 0;
            const newProduct = {...req, id: newid};
            console.log(newProduct);
    
            setProducts([...products, newProduct]);
            await setProduct(newProduct);
        } else{ //senão, ele deve criar um novo registro
            setProducts(products.map((p) => (p.id == req.id)? req: p));
            await updateProduct(req);//aqui vc vai chamada sua função de editar do controlador
        }

        setReq({
            description: '',
            name: '',
            amount: 0,
            id: -1,
            create_at: new Date().toISOString(),
            category_id:-1
        });

        setVisible(false);
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
        
            <MyModal_mobilefullscreen
                visible={visible}
                setVisible={setVisible}
            >

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


                <MySelect
                    caption="Selecione uma categoria"
                    label={cats.find(c => c.key == req.category_id)?.option || 'Categorias'}
                    list={cats}
                    setLabel={()=>{}}
                    setKey={(key) => { setReq({...req, category_id: key }) }}
                />

                <MyButton style={styles.cadastrar} onPress={() => { handleRegister()} } title='Cadastrar'/>
            </MyModal_mobilefullscreen>

            <MyList
                style={styles.table}
                data={products}
                keyItem={(item) => item.id.toString()}
                renderItem={({item})=>(
                    <MyTb
                        onEdit={() => editProduct(item.id)}
                        onDel={async () => {
                            await deleteProduct(item.id);
                            dellProduct(item.id);
                        }}
                    >
                        <Mytext  style={styles.td}>{item.name}</Mytext>
                        <Mytext  style={styles.td}>{item.description}</Mytext>
                        <Mytext  style={styles.td}>{item.amount}</Mytext>
                        <Mytext  style={styles.td}>{cats.find(c => c.key == item.category_id)?.option || 'Indefinido'}</Mytext>
                        <Mytext  style={styles.td}>{new Date(item.create_at).toLocaleString()}</Mytext>
                    </MyTb>

                )}

                header={(
                    <View style={styles.tableRowHeader}>
                        <Mytext style={styles.th}>Nome</Mytext>
                        <Mytext style={styles.th}>Descrição</Mytext>
                        <Mytext style={styles.th}>Quantidade</Mytext>
                        <Mytext style={styles.th}>Categoria</Mytext>
                        <Mytext style={styles.th}>Data</Mytext>
                        <Mytext style={styles.th}>Ações</Mytext>
                    </View>

                )}
            
            />
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
    table: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 8,
    },
    th: {
        flex: 1,
        fontWeight: '600',
        fontSize: 13,
        color: '#333',
        textAlign: 'center',
        
    },

    td: {
        flex: 1,
        fontSize: 13,
        color: '#444',
        textAlign: 'center'
    },
    tableRowHeader: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },

})
    




 