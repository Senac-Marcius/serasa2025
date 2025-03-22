import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ScrollView } from 'react-native';
import MyDocument from '../src/components/Mydocuments' //nome do arquivo
//nome da variavel

export default function RecordScreen() {
    // Estados individuais para os inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [rg, setRg] = useState('');
    const [dateBirth, setDateBirth] = useState('');
    const [cpf, setCpf] = useState('');


    // Estado para armazenar os registros
    const [records, setRecords] = useState<{ 
        id: number; 
        name: string; 
        email: string; 
        rg: string; 
        dateBirth: string; 
        cpf: string; 
        createAt: string; 
    }[]>([]);


    // Função para adicionar um novo registro
    const handleRegister = () => {
        if (!name.trim() || !email.trim() || !rg.trim() || !dateBirth.trim() || !cpf.trim()) {
            alert('Preencha todos os campos!');
            return;
        }


        const newRecord = {
            id: records.length ? records[records.length - 1].id + 1 : 1,
            name,
            email,
            rg,
            dateBirth,
            cpf,
            createAt: new Date().toString(),
        };


        setRecords([...records, newRecord]);


        // Resetando os campos
        setName('');
        setEmail('');
        setRg('');
        setDateBirth('');
        setCpf('');
    };


    // Função para excluir um registro
    const deleteRecord = (id: number) => {
        setRecords(records.filter((record) => record.id !== id));
    };


    return (
        
        <View style={styles.container}>

            <MyDocument style={{ padding: 0}}>
                <></>
            </MyDocument>

            <View style={styles.row}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Solicitação de Documentos</Text>
                    
                    <TextInput 
                        style={styles.input} 
                        placeholder="Nome" 
                        value={name} 
                        onChangeText={setName}
                    />


                    <TextInput 
                        style={styles.input} 
                        placeholder="Email" 
                        value={email} 
                        onChangeText={setEmail}
                    />


                    <TextInput 
                        style={styles.input} 
                        placeholder="RG" 
                        value={rg} 
                        onChangeText={(text) => setRg(text.replace(/[^0-9]/g, ''))} 
                        keyboardType="numeric"
                    />


                    <TextInput 
                        style={styles.input} 
                        placeholder="Data de Nascimento" 
                        value={dateBirth} 
                        onChangeText={setDateBirth}
                    />


                    <TextInput 
                        style={styles.input} 
                        placeholder="CPF" 
                        value={cpf} 
                        onChangeText={(text) => setCpf(text.replace(/[^0-9]/g, ''))} 
                        keyboardType="numeric"
                    />


                    <Button title="Cadastrar" onPress={handleRegister} />
                </View>


                <View style={styles.listContainer}>
                    <Text style={styles.subtitle}>Registros Cadastrados</Text>
                    <ScrollView style={{ flex: 1 }}>
                        <FlatList
                            data={records}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.recordItem}>
                                    <Text style={styles.recordText}>Nome: {item.name}</Text>
                                    <Text style={styles.recordText}>Email: {item.email}</Text>
                                    <Text style={styles.recordText}>RG: {item.rg}</Text>
                                    <Text style={styles.recordText}>Data de Nascimento: {item.dateBirth}</Text>
                                    <Text style={styles.recordText}>CPF: {item.cpf}</Text>
                                    <Text style={styles.recordText}>Criado em: {item.createAt}</Text>
                                    <Button title="Excluir" color="red" onPress={() => deleteRecord(item.id)} />
                                </View>
                            )}
                            showsVerticalScrollIndicator={true}
                            contentContainerStyle={{ paddingBottom: 20 }}
                        />
                    </ScrollView>
                </View>
            </View>
        </View>
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
    formContainer: {
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
    recordItem: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
    },
    recordText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});




