import React, { Children, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList,TouchableOpacity, } from 'react-native' ;
import Myiten from '../src/components/myItenlist';
import MyList from '../src/components/mylist';
import MyView from '../src/components/MyView'
export default function ExpenseScreen(){
// aqui é typescript
    const [req, setReq] = useState({
            name: '',
            email: '',
            description: '',
            id: -1,
            cost: '',
            creatAt : new Date(). toISOString(),
            userId: 0,
    });
    const [expense, setExpense ] = useState<{
        name: string,
        email: string,
        description: string,
        id: number,
        cost: string,
        creatAt: string,
        userId: number,
    }[]>([]) 

    function handleRegister(){
        if(req.id == -1){
            const newid = expense.length ? expense[postMessage.length - 1].id + 1 :0;
            const newExpense = {...req, id:newid};
            setExpense([...expense, newExpense]);
        }else{
            setExpense(expense.map(e => (e.id == req.id ? req : e)));
        }

        setReq({
            name: '',
            email: '',
            description: '',
            id: -1,
            cost: '',
            creatAt : new Date(). toISOString(),
            userId: 0,
        });
       
        
    }

    function editExpense(id:number){
        const expenses = expense.find(e => e.id == id )
        if(expenses)
            setReq(expenses)
    }

    function delExpense(id:number){
        const list = expense.filter(e => e.id != id)
        if(list)
            setExpense(list)
    }

    return (
        <MyView> 
            {/* aqui é typecript dentro do front */}
            <Text style={styles.title}>tela de despesas</Text>
            <View style={styles.row}>
                <View style={styles.form}>
                    <TextInput 
                        placeholder="nome" 
                        value={req.name}
                        onChangeText ={(text) => setReq({...req ,name: text}) }
                    />

                    <TextInput 
                        placeholder="Email"
                        value={req.email}
                        onChangeText={(text)=>setReq({...req ,email: text})}
                    />

                    <TextInput
                        placeholder="description"
                        value={req.description}
                        onChangeText={(text)=>setReq({...req ,description: text})}
                    />

                    <TextInput
                        placeholder="valor"
                        value={req.cost}
                        onChangeText ={(text) => setReq({...req ,cost: text}) }
                    />

                    <TouchableOpacity style={styles.buttonRegister} onPress= { handleRegister }>Cadastrar</TouchableOpacity>
                </View>

                <MyList
                    data={expense}
                    keyItem={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <Myiten style={styles.card} 
                            onEdit={()=> editExpense}
                            onDel={() => delExpense}
                        >
                            <Text style={styles.textlis} >{item.name}</Text>
                            <Text style={styles.textlis} >{item.email}</Text> 
                            <Text style={styles.textlis} >{item.description}</Text>  
                            <Text style={styles.textlis} >{item.cost}</Text> 
                            <Text style={styles.textlis} >{item.userId}</Text>
                            
    
                        </Myiten>
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
      },

      buttonRegister:{
        backgroundColor: "#ab66f9",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        color: '#ffffff'
      },
      
      buttonsContainer:{
       
        textAlign: 'center',
        fontSize: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
        alignContent: 'space-between',
        
      },
      editButton: {
        backgroundColor: "#9a47f8",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        color: '#ffffff'
     },
     delButton:{
        backgroundColor: "#36046e",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        color: '#ffffff'
     },
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
     titleBase: {
        backgroundColor: "#222", 
        paddingVertical: 12, 
        paddingHorizontal: 24,
        borderRadius: 8, 
      },
     
    });