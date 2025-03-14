import React, { useState } from 'react'; 
import { View, Text,StyleSheet, FlatList, TextInput, Button,  } from 'react-native';

export default function CategoryScreen(){
    const [req, setReq] = useState({
        name: '',
        description:'', 
        category:'',
        color:'',
        id:0,
        createAt: new Date ().toISOString(),
        userId: 0,
    });
    const [categories, setCategories] = useState<{
        name: string,
        description:string, 
        category:string,
        color:string,
        id: number
        createAt: string,
        userId: number
    }[]>([]);

    function handleRegister(){
        setCategories([...categories, req])
        setReq({
            name: '',
            description:'', 
            category:'',
            color:'',
            id:0,
            createAt: new Date ().toISOString(),
            userId: 0,
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
                        onChangeText={(text) => setReq({...req, name:text})}
                    />

                    <TextInput placeholder="Descrição"
                         value={req.description}
                         onChangeText={(text) => setReq({...req, description:text})}
                    />

                    <TextInput placeholder="Categoria"
                       value={req.category}
                       onChangeText={(text) => setReq({...req, category:text})}
                    />                   

                    <TextInput placeholder="cor"
                        value={req.color}
                        onChangeText={(text) => setReq({...req, color:text})}
                    />

                     <Button title="Cadastrar" onPress={handleRegister}/> 
                </View>

                <FlatList
                    data={categories}
                    keyExtractor={ ( item ) => item.id.toString() }
                    renderItem={({ item }) => (
                        <View style={styles.categorieStyle}>

                            <Text>{item.name}</Text>
                            <Text>{item.description}</Text>
                            <Text>{item.category}</Text>
                            <Text>{item.createAt}</Text>

                        </View> 
                   
                    )}
                />

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
        backgroundColor: '#faeeff ',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
    },
    categorieStyle:{
        flex: 1,
        marginRight: 20,
        padding: 20,
        backgroundColor: '#faeeff ',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 5.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 5,
        margin: 10
    }
})