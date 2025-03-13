import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function PostScreen() {
    const [req, setReq] = useState({
        description: '',
        url: '',
        id: 0,
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
        setPosts([...posts, req])
        setReq({
            description: '',
            url: '',
            id: 0,
            createAt: new Date().toISOString(),
            userId: 0,
        })
    }

    return (
        <View>
            <Text>Tela de Postagens</Text>

            <TextInput
                placeholder="Digite a descrição"
                value={req.description}
                onChangeText={ (t) => setReq({...req, description: t}) }
            />
            {req.description}

            <TextInput
                placeholder="Digite a url"
                value={req.url}
                onChangeText={ (t) => setReq({...req ,url: t }) }
            />
            {req.url}

            <Button title='CADASTRAR' onPress={ handleRegister } />
        </View>
    );
}
