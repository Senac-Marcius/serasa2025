import React, { useState } from 'react';
import { View,Text, StyleSheet,FlatList, Button,TextInput} from 'react-native';
import MyList from '../src/components/MyList'
import {MyItem} from '../src/components/MyItem'
import MyView from '../src/components/MyView'
import { useRouter } from 'expo-router';
import {setCategories, categories,setCategory} from'../src/controllers/category'

export default function categoryScreen(){

    const [req, setReq] = useState({
        name: '',
        description : '',
        id: -1,
        created_at: new Date().toISOString(),
        user_id : 0,
        
 });
    
    function handleRegister(){
        if(req.id == -1){
            const newid= categories.length ? categories[categories.length-1].id=1:0;
            const newCategorie = {... categories,req};
            setCategories([...categories, req])
    
        }else{
            setCategories(categories.map(i =>(i.id == req.id)? req: i )  );
    
        }
    
        setReq({
            id: -1,
            name: '',
            description : '',
            created_at: new Date().toISOString(),
            user_id : 0,
        })
    }
    
    function editCategorie(id:number){
        let item= categories.find(i => i.id== id)
        if(item)
        setReq(item)
    }
    function delCategorie(id:number){
        const list= categories.filter(i => i.id != id)
        if(list)
        setCategories(list)
    }
    
    const router = useRouter();

    return (
        <MyView router={router} >
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
                        <MyItem 
                            onDel={()=>{delCategorie(item.id)}}
                            onEdit={()=>{editCategorie(item.id)}}
                        >
                                            <Text >{item.name}</Text>
                            <Text >{item.description}</Text>  
                        </MyItem>
                    )}
                /> 
            </View>
        </MyView>
   
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
    postCategorie: {
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
