import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

export default function PostScreen() {
    const [description, setDescription] = useState('');

    return (
        <View>
            <Text>Tela de Postagens</Text>

            <TextInput
                placeholder="Digite a descrição"
                value={description}
                onChangeText={setDescription}
            />
        </View>
    );
}
