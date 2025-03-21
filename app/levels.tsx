import React, { useState } from 'react';
import { View,Text, StyleSheet,FlatList, Button,TextInput, Touchable, TouchableOpacity} from 'react-native';
import MyLevels from '../src/components/Mylevels';

export default function categoryScreen(){
    const [req, setReq] = useState({
        name: '',
        description : '',
        color: '',
        id: 0,
        createAt: new Date().toISOString(),
        userId : 0,
        
 });
 
    const[leves, setleves] = useState<{ 
        name: string,
        description: string,
        color: string,
        id: number,
        createAt: string,
        userId: number,
        }[]>([])
    
    function handleRegister (){


        
        setleves([...leves, req])
        setReq({name:'',
            description:'',
            color: '',
            id: 0,
            createAt: new Date().toISOString(),
            userId : 0,

        })
    }

    function editLevels (id:number){
        const notification = leves.find( l => l.id == id)
        if(notification)
            setReq(notification)

    }

    function deleteLevels (id:number){
        

    }


    return (
        <View>
            < MyLevels style={styles.row}>
                <text></text>
            </MyLevels>
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

                    <TextInput placeholder="color" 
                        value={req.color}
                        onChangeText={(text) => setReq({...req ,color: text})}
                    />
                        
                      
                   <Button title= 'Cadastrar' onPress= {handleRegister}/>
                                 
                </View>
                <FlatList
                    data={leves}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) =>(
                        <View>
                            <text>{item.name}</text>
                            <text>{item.createAt}</text> 
                            <text>{item.name}</text>
                            <text>{item.color}</text>
                            <text>{item.userId}</text>  

                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity 
                                style={styles.editButton}
                                onPress={() => {editLevels(item.id)}}>

                                    <Text style={styles.buttonText}>EDIT</Text>

                                </TouchableOpacity>

                                <TouchableOpacity 
                                style={styles.delButton}
                                onPress={() => {deleteLevels(item.id)}}>

                                    <Text style={styles.buttonText}>DELETE</Text>

                                </TouchableOpacity>
                               
                            </View>
                        </View>

                        
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
    buttonText:{
        color:'#000000',
        fontWeight: 'bold'
    },
    buttonsContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        gap:20,
        alignContent:'space-around',
    },
    editButton:{

    },
    delButton:{

    },

});
