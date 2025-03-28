import React, { useState } from 'react';
import { View,Text, StyleSheet,FlatList, Button,TextInput} from 'react-native';
import MyList from '../src/components/mylist'
import Myiten from '../src/components/myItenlist'

export default function categoryScreen(){

    const [req, setReq] = useState({
        name: '',
        description : '',
        id: 0,
        createAt: new Date().toISOString(),
        userId : 0,
        
 });
 
    const[categories, setCategories] = useState<{ 
        name: string,
        description: string,
        id: number,
        createAt: string,
        userId: number,
        }[]>([])
    
    function handleRegister (){
        setCategories([...categories, req])
        setReq({name:'',
            description:'',
            id: 0,
            createAt: new Date().toISOString(),
            userId : 0,

        })
    }

    return (
        <View>
                                                         
    {/* aqui é typerscrypt dentro do front */}

            <View style={styles.row}>
                <View style={styles.form}>
                    <TextInput placeholder="nome" 
                        value={req.name}
                        onChangeText={(text) => setReq({...req ,name: text})}
                    /> 
                   

                    <TextInput placeholder="description" 
                        value={req.description}
                        onChangeText={(text) => setReq({...req ,description: text})}
                        />
                        
                    
                      
                   <Button title= 'Cadastrar' onPress= {handleRegister}/>
                                 
                </View>
                <MyList
                    data={categories}
                    keyItem={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <Myiten >
                            <Text >{item.name}</Text>
                            <Text >{item.description}</Text>  
                        </Myiten>
                    )}
                /> 
            </View>
        </View>
   
    );
}
// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    row: {
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
    postItem: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
    },
    postText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    postUrl: {
        fontSize: 14,
        color: '#007BFF',
        marginBottom: 5,
    },
});
