import React, {useState,useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MyButton from '../src/components/MyButtons';
import MyList from '../src/components/MyList';
import  { Myinput} from '../src/components/MyInputs';
import MyView from '../src/components/MyView';
import Mytext from '../src/components/MyText';
import { MyItem } from '../src/components/MyItem';
import { useRouter } from 'expo-router';
import {iBudgets , setBudget, deleteBudget, updateBudget, getBudgets} from '../src/controllers/budgets';


export default function BudgetScreen(){
    const router = useRouter();

//aqui é typescriot 

    const [req, setReq] = useState({

        
        id: -1,
        name:'',
        url:'',
        created_at: new Date().toISOString(),
        value:'',
        user_id: 3,
        start_date: '',
        end_date:'',
        
    });
    const [budgets, setBudgets] = useState<iBudgets[]>([]);

    useEffect(()=> {
        async function getTodos(){
           const retorno = await getBudgets({})
            if( retorno.status  && retorno.data && retorno.data?.length > 0){
                setBudgets(retorno.data);
            }
        }
        
        getTodos();
    },[] )



    async function  handleRegister(){
        if(req.id == -1){
            const newId = budgets.length ? budgets[budgets.length -1].id + 1: 0;
            console.log(newId)

            const newBudget = {...req, id: newId};

            setBudgets([...budgets, newBudget]);
            console.log(newBudget)
           const resp = await setBudget(newBudget)
           console.log (resp)
        }else{
            setBudgets(budgets.map(b=> (b.id == req.id)? req: b));
            const result = await updateBudget(req);
        }
        
        setReq({ 
        id: -1,
        name:'',
        url:'',
        created_at: new Date().toISOString(),
        value:'',
        user_id: 3,
        start_date: '',
        end_date:'',
            })
    }

    function editBudget(id:number){
        const budget = budgets.find (b => b.id == id)
        if(budget)
        setReq(budget)
    }

    async function delBudget(id: number) {
        try {
            const { error } = await deleteBudget(id);
                
            
            if (!error) {
                // Só atualiza o estado se a operação no banco for bem sucedida
                setBudgets(budgets.filter(b => b.id !== id));
            } else {
                console.error('Erro ao deletar:', error);
            }
        } catch (err) {
            console.error("Erro inesperado:", err);
        }
    }

    
    return (
        <MyView  >
            {/* aqui é typescriot dentro do front*/}
            <Mytext>Minha tela das postagens</Mytext>
            <View style={styles.row}>
                <View style={styles.form}>
                    <Myinput
                            
                            value={req.name}
                            onChangeText={(text) => setReq({...req ,name: text})}
                            label="Nome"
                            iconName="person"
                   />
                    <Myinput 
                    
                    value={req.url}
                    onChangeText={(text) => setReq({...req ,url: text})} 
                    label="url"
                    iconName="link"
                     />
                     
                     <Myinput 
                    placeholder = "Digite o valor"
                    value={req.value}
                    onChangeText={(text) => setReq({...req ,value: text})} 
                    label="valor"
                    iconName="pin"
                     />
                    <Myinput 
                  
                    value={req.start_date}
                    onChangeText={(text) => setReq({...req ,start_date: text})} 
                    label="Data Inicial"
                    iconName="pin"
                     />
                    <Myinput 
                  
                    value={req.end_date}
                    onChangeText={(text) => setReq({...req ,end_date: text})}
                    label="Data Final"
                    iconName="pin"
                     />
                     


                    <MyButton title ='CADASTRAR' onPress={ handleRegister }/>
                </View>
                <MyList

                    data={budgets}
                    keyItem={(item) => item.id.toString()}
                    renderItem={({item}) => (
                    
                        <MyItem 
                       onEdit ={()=> editBudget(item.id)}
                       onDel ={()=> delBudget(item.id)}
                        >
                       
                       <Text> Nome: {item.name}</Text>
                       <Text> id: {item.id}</Text>
                           <Text> Url: {item.url}</Text>
                           <Text> CreateAt: {item.created_at}</Text>
                           <Text> Valor: {item.value}</Text>
                           <Text> UserId: {item.user_id}</Text>
                           <Text> Data Inicial: {item.start_date}</Text>
                           <Text> Data Final: {item.end_date}</Text>
    
                        </MyItem>
                    )}
                />
            </View>
        </MyView>
    );
}

const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
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
    budetStyle:{
        flex: 1,
        marginRight: 10,
        padding: 20,
        backgroundColor: '#F2F2F2',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        margin: 10,
        width: 400,

        },

        
        buttonsContanier:{
        flexDirection: 'row',
        alignItems: 'center',
        gap:20,
        alignContent:'space-around',

        },

        editButton:{
        backgroundColor:'#FFFF00',
        padding:10,
        borderRadius:5,
        alignItems: 'center',
        justifyContent:'center',
        },

        delButton:{
        backgroundColor:'#f44336',
        padding: 10,
        borderRadius:5,
        alignItems: 'center',
        justifyContent:'center',
        },

        buttonText:{
        color:'#000000',
        fontWeight:'bold',
         },


});


