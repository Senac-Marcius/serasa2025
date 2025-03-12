import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Input, Datepicker, Select, SelectItem, IndexPath, Toggle, RadioGroup, Radio, CheckBox } from '@ui-kitten/components';
import { useRouter } from 'expo-router';

export default function PostScreen() {
    const router = useRouter();

    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [date, setDate] = useState(new Date());
    const [selectedIndex, setSelectedIndex] = useState<IndexPath>(new IndexPath(0));
    const [toggleChecked, setToggleChecked] = useState(false);
    const [selectedRadio, setSelectedRadio] = useState(0);
    const [checked, setChecked] = useState(false);

    return (
        <ScrollView style={styles.container}>
            <Button onPress={() => router.back()}>Voltar</Button>

            <View style={styles.formContainer}>
                <Input
                    label="Descrição"
                    placeholder="Digite a descrição"
                    value={description}
                    onChangeText={setDescription}
                />
                <Input
                    label="URL"
                    placeholder="https://exemplo.com"
                    value={url}
                    onChangeText={setUrl}
                />

                <Datepicker
                    label="Data da Postagem"
                    date={date}
                    onSelect={nextDate => setDate(nextDate)}
                />

                <Select
                    label="Categoria"
                    selectedIndex={selectedIndex}
                    onSelect={(index) => setSelectedIndex(index as IndexPath)}
                >
                    <SelectItem title="Notícia" />
                    <SelectItem title="Blog" />
                    <SelectItem title="Dicas" />
                </Select>

                <Toggle
                    checked={toggleChecked}
                    onChange={setToggleChecked}
                >
                    Marcar como Destaque
                </Toggle>

                <RadioGroup
                    selectedIndex={selectedRadio}
                    onChange={index => setSelectedRadio(index)}
                >
                    <Radio>Opção 1</Radio>
                    <Radio>Opção 2</Radio>
                </RadioGroup>

                <CheckBox
                    checked={checked}
                    onChange={nextChecked => setChecked(nextChecked)}
                >
                    Concordo com os Termos
                </CheckBox>

                <Button onPress={() => console.log("Post enviado!")}>
                    Cadastrar
                </Button>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    formContainer: {
        marginTop: 20,
    },
});
