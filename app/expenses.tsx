import React, { useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native' ;
import {MyItem} from '../src/components/MyItem';
import MyList from '../src/components/MyList';
import MyView from '../src/components/MyView';
import MyButton from '../src/components/MyButtons'
import {Myinput, MyTextArea} from '../src/components/MyInputs';
import { useRouter } from 'expo-router';
import { setExpense, delRegister, updateExpense, iexpenses, getExpense } from '../src/controllers/expenses';
import { supabase } from '../src/utils/supabase';
import Mytext from '../src/components/MyText'



export default function ExpenseScreen(){
// aqui é typescript
    const [req, setReq] = useState({
            id: -1,
            created_at : new Date(). toISOString(),
            name: '',
            emails: '',
            contacts:'',
            costs: '',
            descriptions: '',
            user_id: 1,
    });

    const [message, setMessage] = useState("")

    const [expense,setExpenses] = useState< iexpenses[]>([]);

    useEffect(()=>{
        async function getAll(){
            const retorno = await getExpense({})
            if(retorno.status && retorno.data && retorno.data.length > 0){
                setExpenses(retorno.data)}
        }

        getAll();
        
    },[])
    

    async function handleRegister(){
        if(req.id == -1){
            const newid = expense.length ? expense[ expense.length - 1].id + 1 :0;
            const newExpense = {...req, id:newid};
            setExpenses([...expense, newExpense]);
            await setExpense(newExpense)
        }else{
            setExpenses(expense.map(e => (e.id === req.id ? req : e)));
        await updateExpense(req); 
        setMessage("Existem campos que não aceitam esses tipos caracteres")
        }

        setReq({
            id:-1 ,
            created_at : new Date(). toISOString(),
            name: '',
            emails: '',
            contacts:'',
            costs: '',
            descriptions: '',
            user_id: 1,
        });
       
        
    }

    function editExpense(id:number){
        const expenses = expense.find(e => e.id == id )
        if(expenses)
            setReq(expenses)
    };

    async function delExpense(id:number){

       delRegister(id)
        const list = expense.filter(e => e.id != id);
        if(list)
            setExpenses(list)
    }

            const router = useRouter();
    

    return (
        
        <MyView router={router} > 
            {/* aqui é typecript dentro do front */}
            <Text style={styles.title}>tela de despesas</Text>
            <View style={styles.row}>
                <View style={styles.form}>
                    <Myinput value={req.name} onChangeText={(text) => setReq({ ...req, name: text })} placeholder="Nome" label="Nomes:" iconName='' />

                    <Myinput value={req.contacts} onChangeText={(text) => setReq({ ...req, contacts: text })} placeholder="(XX) XXXXX-XXXX" label="Contato:" iconName='phone' />    

                    <Myinput value={req.emails} onChangeText={(text) => setReq({ ...req, emails: text })} placeholder="domain@domain.com" label="Email:" iconName='mail' /> 

                    <MyTextArea value={req.descriptions} onChangeText={(text)=>setReq({...req ,descriptions: text})} iconName='' placeholder='Descrição'   label=''/>

                <Myinput value={req.costs} onChangeText={(text) => setReq({ ...req, costs: text })} placeholder="R$" label="Valores:" iconName='' /> 


                    <MyButton style={{justifyContent:'center'}} onPress={handleRegister} title='Cadastrar'></MyButton>
                </View>

                <MyList
                    data={expense}
                    keyItem={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <MyItem style={styles.card} 
                            onEdit={()=> editExpense(item.id)}

                            onDel={() => delExpense(item.id)}
                        >
                            <Mytext style={styles.textlis} >{item.name}</Mytext>
                            <Mytext style={styles.textlis} >{item.contacts}</Mytext>
                            <Mytext style={styles.textlis} >{item.emails}</Mytext> 
                            <Mytext style={styles.textlis} >{item.descriptions}</Mytext>  
                            <Mytext style={styles.textlis} >{item.costs}</Mytext>     
                        </MyItem>
                    )}
                /> 
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
    card: {
        backgroundColor: "#f8f9fa",
        padding: 16,
        marginBottom: 8,
        marginHorizontal: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3, // Sombra para Android
      },
      textlis: {
        fontSize: 14,
        color: "#555",
        marginVertical: 4,
      } ,
     
     title:{
        marginBottom: 8,
        fontSize: 30,
        fontWeight: "bold", 
        textAlign: "center",
        backgroundColor: "#ab66f9",
        borderRadius: 5,
        color:'#ffffff',
        letterSpacing: 1.5,
        textTransform: "uppercase",
        textShadowColor: "rgba(0, 0, 0, 0.2)",
        fontStyle: "italic",
     },
     
    });
    