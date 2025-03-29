import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity} from 'react-native';
import MyLogin from '../src/components/MyLogin';
import MyButton from '../src/components/Mybuttons';
import MyList from '../src/components/mylist';
import  { Myinput} from '../src/components/Myinputs';
import MyView from '../src/components/MyView';
import Mytext from '../src/components/Mytext';


export default function BudgetScreen(){

//aqui é typescriot

    const [req, setReq] = useState({

        name:'',
        url:'',
        id: -1,
        createAt: new Date().toISOString(),
        velue:'',
        userId: 0,
        startDate: '',
        endDate:'',
        
    });

    const [budgets, setBudgets]= useState<{
        name: string,
        url:string,
        id: number,
        createAt: string,
        velue: string,
        userId: number,
        startDate: string,
        endDate: string,

    }[]>([])

    function  handleRegister(){
        if(req.id == -1){
            const newId = budgets.length ? budgets[budgets.length -1].id +1: 0;
            const newBudget = {...req, id: newId};

            setBudgets([...budgets, newBudget]);
        }else{
            setBudgets(budgets.map(jTNL=> (jTNL.id == req.id)? req: jTNL));
        }
        
        setReq({ 
        id: -1,
        name:'',
        url:'',
        createAt: new Date().toISOString(),
        velue:'',
        userId: 0,
        startDate: '',
        endDate:'',
            })
    }

    function editBudget(id:number){
        const budget = budgets.find (b => b.id == id)
        if(budget)
        setReq(budget)
    }

    function delBudget(id:number){
        const list = budgets.filter(b => b.id != id)
        setBudgets(list)
    }


    return (
        <MyView>
            <MyLogin style={styles.row} email='Email' pass='Senha' changeEmail={() => {}}>

            <Mytext> </Mytext>
            </MyLogin>
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
                    value={req.velue}
                    onChangeText={(text) => setReq({...req ,velue: text})} 
                    label="valor"
                    iconName="pin"
                     />
                    <Myinput 
                  
                    value={req.startDate}
                    onChangeText={(text) => setReq({...req ,startDate: text})} 
                    label="Data Inicial"
                    iconName="pin"
                     />
                    <Myinput 
                  
                    value={req.endDate}
                    onChangeText={(text) => setReq({...req ,endDate: text})}
                    label="Data Final"
                    iconName="pin"
                     />
                     


                    <MyButton title ='CADASTRAR' onPress={ handleRegister }/>
                </View>
                <MyList

                    data={budgets}
                    keyItem={(item) => item.id.toString()}
                    renderItem={({item}) => (
                    
                        <View style={styles.budetStyle}>
                       
                       <Text> Nome: {item.name}</Text>
                           <Text> Url: {item.url}</Text>
                           <Text> CreateAt: {item.createAt}</Text>
                           <Text> Valor: {item.velue}</Text>
                           <Text> UserId: {item.userId}</Text>
                           <Text> Data Inicial: {item.startDate}</Text>
                           <Text> Data Final: {item.endDate}</Text>
                        
                        <View style={styles.buttonsContanier}>

                        <MyButton title ='Editar'
                        onPress={()=> {editBudget(item.id)}}>
                    
                        </MyButton>

                        <MyButton title='DELETAR'
                        onPress={()=> {delBudget(item.id)}}>
                        </MyButton>
                        </View>
 
                           
                        </View>
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

