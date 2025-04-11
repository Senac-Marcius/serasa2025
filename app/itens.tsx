import React ,{ useEffect, useState }from 'react';
import { Text, View, StyleSheet, FlatList, TextInput, Button, TouchableOpacity} from 'react-native';
import MyLink from '../src/components/MyLink';
import {MyItem} from '../src/components/MyItem';
import MyList from '../src/components/MyList';
import { Myinput } from '../src/components/MyInputs';
import MyButton from '../src/components/MyButtons';
import MyView from '../src/components/MyView';
import { useRouter } from 'expo-router';
import {setIten,dell, edit, iIten, getItens} from '../src/controllers/items'
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';


export default  function itemScreen(){
     const[req,setReq] = useState({ 
        id: -1,
        mark:'',
        asset_number:'',
        amount: 0,
        local_id: 1,
        category_id:1,
        product_id: 1,
        description:'',
        created_at: new Date().toISOString ()        
     });
     const[itens, setItens] = useState<iIten[]>([]);

     useEffect(() => {
        //aqui estamos carregando os lançamentos
        async function getTodos() {
            const retorno = await getItens({})
            if (retorno.status && retorno.data && retorno.data.length > 0) {
                setItens(retorno.data);
            }
        }
        getTodos();

    
    },[])


    async function handleRegister(){
       if(req.id == -1){
        const newid= itens.length ? itens[itens.length-1].id+1:0;
        const newItem = {... req,id: newid};
        setItens([...itens, newItem])
        await setIten(newItem)

       }else{
        setItens(itens.map(i =>(i.id == req.id? req: i)));
        await edit(req)
       }

        setReq({
            id: -1,
            mark:'',
            asset_number:'',
            amount: 0,
            local_id: 1,
            category_id:1,
            product_id: 1,
            description:'',
            created_at: new Date().toISOString ()        
        })
     }

     function editItem(id:number){
        let item= itens.find(i => i.id== id)
        if(item)
        setReq(item)
     }
    async function delItem(id:number){
        await dell(id)
        const list= itens.filter(i => i.id != id)
        if(list)
        setItens(list)
     }

    const router = useRouter();
     
    return (
        <MyView  >
       
        <Text>Minha tela de itens</Text>
        
        <View style={styles.row}>
            <View style={styles.form}>
            <Myinput 
                placeholder="Descrição"
                value={req.description}
                onChangeText={(text) => setReq({ ...req, description:text})}
                label="Descrição do item"
                 iconName='list' 
            
                />
                <Myinput 
                placeholder="Categoria"
                value={ String(req.category_id) }
                onChangeText={(text) => setReq({ ...req, category_id: Number(text) })}
                label="Categoria"
                 iconName='?' 
            
                />
                <Myinput 
                placeholder="Digite o nome do item"
                value={req.mark}
                onChangeText={(text) => setReq({ ...req, mark:text })}
                label="Item"
                 iconName='list' 
            
                />
                
                


                

                <Myinput 
                   placeholder= "N°"
                   value={ String(req.amount) }
                   onChangeText={(text)=>setReq({...req, amount: Number(text) })}
                   label=" Quantidade de items"
                   iconName='Pin' 
                />
                

                

                <MyButton title='Cadastrar' onPress={handleRegister}/>
            
            </View>

            <MyList
            data={itens}
            keyItem={(i) => i.id.toString()}
            renderItem={({item})=>(
                <MyItem 
                    onDel={()=>{delItem(item.id)}}
                    onEdit={()=>{editItem(item.id)}}
                >
                    <text >{item.name}</text>
                    <text >{item.mark}</text>
                    <text>{item.assetNumber}</text>
                    <text>{item.amount}</text>
                    <View style={styles.buttonsContainer}></View>

                </MyItem>

            )}
            
            />
        </View>
    </MyView>

    );
}

const styles= StyleSheet.create({
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
   
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        fontSize: 15,
        padding: 40,
        
    },
    
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
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
    subtitle: {
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
    form: { 
        flex:1

    }
})



