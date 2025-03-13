import React, { useState } from 'react'; 
import { View, Text,StyleSheet, FlatList, TextInput, Button  } from 'react-native';

export default function CategoryScreen(){
    const [req, setReq] = useState({
        name: '',
        description:'', 
        category:'',
        color:'',
    });
    const [categories, setCategories] = useState<{
        name: string,
        description:string, 
        category:string,
        color:string,
    }[]>([]);

    function handleRegister(){
        setCategories([...categories, req])
        setReq({
            name: '',
            description:'', 
            category:'',
            color:'',
        })
    }

    return (
        <View>
           {/*Aqui é typescript dentro do front*/}
            <Text>Minha tela das postagens</Text>
            <View style={styles.row}>

                <View  style={styles.form}>
                    <TextInput placeholder="Nome"
                        value={req.name}
                        onChangeText={(text) => setReq({...req,name:text})}
                    />
                    {req.name}

                    <TextInput placeholder="Descrição"
                         value={req.description}
                         onChangeText={(text) => setReq({...req,description:text})}
                    />
                    {req.description}

                    <TextInput placeholder="Categoria"
                       value={req.category}
                       onChangeText={(text) => setReq({...req,category:text})}
                    />
                    {req.category}

                    <TextInput placeholder="cor"
                        value={req.color}
                        onChangeText={(text) => setReq({...req,color:text})}
                    />
                    {req.color}

                     <Button title="Cadastrar" onPress={handleRegister}/> 
                    
                </View>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
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
})