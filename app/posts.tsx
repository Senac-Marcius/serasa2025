import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, Input, Select, Text, VStack, HStack, Checkbox, Radio } from 'native-base';
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
            <VStack space={4} padding={5}>
                <Button onPress={() => router.back()}>Voltar</Button>

                <Text fontSize="lg" fontWeight="bold">Cadastro de Postagem</Text>

                <Input
                    placeholder="Digite a descrição"
                    value={description}
                    onChangeText={setDescription}
                />

                <Input
                    placeholder="Digite a URL"
                    value={url}
                    onChangeText={setUrl}
                />

                {/* Select corrigido */}
                <Select selectedValue={category} onValueChange={setCategory}>
                    <Select.Item label="Notícia" value="Notícia" />
                    <Select.Item label="Blog" value="Blog" />
                    <Select.Item label="Dicas" value="Dicas" />
                </Select>

                {/* Checkbox agora tem um valor correto */}
                <Checkbox value="destaque" isChecked={isChecked} onChange={setIsChecked}>
                    Destaque
                </Checkbox>

                {/* Radio Group corrigido */}
                <Radio.Group name="radioGroup" value={selectedRadio} onChange={setSelectedRadio}>
                    <HStack space={4}>
                        <Radio value="0">Opção 1</Radio>
                        <Radio value="1">Opção 2</Radio>
                    </HStack>
                </Radio.Group>

                <Button onPress={() => console.log("Post enviado!")}>
                    Cadastrar
                </Button>
            </VStack>
        </ScrollView>
    );
}