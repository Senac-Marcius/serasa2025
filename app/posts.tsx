import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, TextInput, RadioButton, Checkbox } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function PostScreen() {
    const router = useRouter();

    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [category, setCategory] = useState("Notícia");
    const [isChecked, setIsChecked] = useState(false);
    const [selectedRadio, setSelectedRadio] = useState("0");

    return (
        <ScrollView>
            <View style={{ padding: 20 }}>
                <Button mode="contained" onPress={() => router.back()}>
                    Voltar
                </Button>

                <TextInput
                    label="Descrição"
                    value={description}
                    onChangeText={setDescription}
                    mode="outlined"
                />

                <TextInput
                    label="URL"
                    value={url}
                    onChangeText={setUrl}
                    mode="outlined"
                />

                {/* Checkbox */}
                <Checkbox.Item
                    label="Destaque"
                    status={isChecked ? 'checked' : 'unchecked'}
                    onPress={() => setIsChecked(!isChecked)}
                />

                {/* Radio */}
                <RadioButton.Group onValueChange={setSelectedRadio} value={selectedRadio}>
                    <View>
                        <RadioButton.Item label="Opção 1" value="0" />
                        <RadioButton.Item label="Opção 2" value="1" />
                    </View>
                </RadioButton.Group>

                <Button mode="contained" onPress={() => console.log("Post enviado!")}>
                    Cadastrar
                </Button>
            </View>
        </ScrollView>
    );
}
