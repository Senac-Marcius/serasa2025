import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList} from 'react-native' ;

export default function ExpenseScreen(){
// aqui é typescript
    const [req, setReq] = useState({
            name: '',
            url: '',
            description: '',
            id: 0,
            cost: '',
            creatAt : new Date(). toISOString(),
            userId: 0,
    });
    const [expense, setExpense ] = useState<{
        name: string,
        url: string,
        description: string,
        id: number,
        cost: string,
        creatAt: string,
        userId: number,
    }[]>([]) 

    function handleRegister(){
        setReq({
            name: '',
            url: '',
            description: '',
            id: 0,
            cost: '',
            creatAt : new Date(). toISOString(),
            userId: 0,
        });
        setExpense([...expense, req]);
        
    }

    return (
        <View>
            {/* aqui é typecript dentro do front */}
            <Text>tela de despesas</Text>
            <View style={styles.row}>
                <View style={styles.form}>
                    <TextInput 
                        placeholder="nome" 
                        value={req.name}
                        onChangeText ={(text) => setReq({...req ,name: text}) }
                    />

                    <TextInput 
                        placeholder="url"
                        value={req.url}
                        onChangeText={(text)=>setReq({...req ,url: text})}
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

                    <Button title='Cadastrar' onPress= { handleRegister }/>
                </View>

                <FlatList
                    data={expense}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <View style={styles.card} >
                          <Text style={styles.name} >{item.name}</Text>
                          <Text style={styles.url} >{item.url}</Text> 
                          <Text style={styles.description} >{item.description}</Text>  
                          <Text style={styles.cost} >{item.cost}</Text> 
                          <Text style={styles.userId} >{item.userId}</Text>  
                        </View>
                    )}
                /> 
            </View>
        </View>
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
        marginVertical: 8,
        marginHorizontal: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3, // Sombra para Android
      },
      name: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
      },
      url: {
        fontSize: 14,
        color: "#1E90FF",
      },
      description: {
        fontSize: 14,
        color: "#555",
        marginVertical: 4,
      },
      cost: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#28a745",
      },
      userId: {
        fontSize: 12,
        color: "#888",
      },
    });