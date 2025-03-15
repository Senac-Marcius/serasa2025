import { List } from '@ui-kitten/components';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function PostScreen() {
    const [req, setReq] = useState({
        description: '',
        url: '',
        id: -1,
        createAt: new Date().toISOString(),
        userId: 0,
    });

    const [posts, setPosts ] = useState<{
        description: string,
        url: string,
        id: number,
        createAt: string,
        userId: number,
    }[]>([])

    function handleRegister(){
        if(req.id == -1){
            const newId = posts.length ? posts[posts.length - 1].id + 1 : 0;
            const newPost = { ...req, id: newId };
            
            setPosts([...posts, newPost]);
        }else{
            setPosts(posts.map(jTNL =>  (jTNL.id == req.id)? req : jTNL  ));
        }

        setReq({ 
            id: -1,
            description: '',
            url: '',
            createAt: new Date().toISOString(),
            userId: 0,
        })
    }

    function editPost(id:number){
        const post = posts.find(p => p.id == id)
        if(post)
            setReq(post)
    }

    function delPost(id:number){
        const list = posts.filter(p => p.id != id)
        setPosts(list)
    }

    return (
        <View>
            <Text>Minha tela de Posts</Text>
            <View style={styles.row}>
                <View style={styles.form}>

                    <TextInput
                        placeholder="Digite a descrição"
                        value={req.description}
                        onChangeText={ (t) => setReq({...req, description: t}) }
                    />


                    <TextInput
                        placeholder="Digite a url"
                        value={req.url}
                        onChangeText={ (t) => setReq({...req ,url: t }) }
                    />

                    <Button title='CADASTRAR' onPress={ handleRegister } />
                </View>

                <FlatList 
                    style={styles.list}
                    data={posts}
                    keyExtractor={ (item) => item.id.toString() }
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                                <Text>Description: {item.description} </Text>
                                <Text>Url: {item.url} </Text>
                                <Text>Data de Criação: {item.createAt} </Text>
                                <Text>Userid: {item.userId} </Text>

                                <View style={styles.buttonsContanier}>
                                    <TouchableOpacity onPress={ () => { editPost(item.id) } } >EDIT</TouchableOpacity>
                                    <TouchableOpacity onPress={ () => { delPost(item.id) } }>DELETE</TouchableOpacity>
                                </View>
                        </View>
                    )}
                />
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',
        alignItems: 'flex-start',
        alignContent: 'space-between',
    },
    form:{
        flex: 1,
        width: '98%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,

        elevation: 5,
    },
    list:{
        flex: 1,
        margin: 10,
        marginTop: 0
    },
    item:{
        alignItems: 'flex-start',
        alignContent: 'space-between',

        width: '98%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,

        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,

        elevation: 5,
    },
    label:{
        color: '#ff0000',
    },
    buttonsContanier:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        alignContent: 'space-around',        
    }
});
