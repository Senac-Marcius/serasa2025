import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, TextInput, RadioButton, Checkbox } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { DatePickerModal } from 'react-native-paper-dates';
import { globalStyles } from '../styles/globalStyles';

export default function PostScreen() {
    const router = useRouter();

    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [selectedRadio, setSelectedRadio] = useState("0");

    // Estado para o calendário
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [open, setOpen] = useState(false);

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

                {/* Botão para abrir o calendário */}
                <Button mode="outlined" onPress={() => setOpen(true)}>
                    Selecionar Data
                </Button>

                {/* Modal do Calendário */}
                <DatePickerModal
                    locale="pt"
                    mode="single"
                    visible={open}
                    onDismiss={() => setOpen(false)}
                    date={date}
                    onConfirm={(params) => {
                        setOpen(false);
                        setDate(params.date);
                    }}
                />

                {/* Mostrando a data selecionada */}
                {date && (
                    <TextInput
                        label="Data Selecionada"
                        value={date.toLocaleDateString()}
                        mode="outlined"
                        editable={false}
                    />
                )}

                <Button mode="contained" onPress={() => console.log("Post enviado!")}>
                    Cadastrar
                </Button>
            </View>
        </ScrollView>
    );
}
