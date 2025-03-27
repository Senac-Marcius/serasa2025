import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import MySwitch from '../src/components/MySwitch' //nome do arquivo
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
import MyView from '../src/components/MyView';
//nome da variavel

export default function RecordScreen() {
    // Estados individuais para os inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [rg, setRg] = useState('');
    const [dateBirth, setDateBirth] = useState('');
    const [cpf, setCpf] = useState('');
    const[editingID, setEditingId] = useState<number | -1>(-1);


    // Estado para armazenar os registros e definir seus tipos
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

        //se for um item editado, ele deve chamar o registro existente
        if (editingID !== -1) {
            setRecords(records.map(record =>
                record.id === editingID ? {...record, name, email, rg, dateBirth, cpf} : record
            ));
            setEditingId(-1);//reset
        } else{ //senão, ele deve criar um novo registro
            const newRecord = {
                id: records.length ? records[records.length - 1].id + 1 : 1,
                name,
                email,
                rg,
                dateBirth,
                cpf,
                createAt: new Date().toString(),
            };

            setRecords([...records, newRecord]);//armazena o novo registro

        }       

        
        // Resetando os campos após editar, cadastrar, etc..
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

    const editRecord = (id: number) => {
        const record = (records.find((record => record.id === id)));
        if (record){//vai colocar as informações salvas no vetor de volta no input para editar
            setName(record.name);
            setEmail(record.email);
            setRg(record.rg);
            setDateBirth(record.dateBirth);
            setCpf(record.cpf);
            setEditingId(id);// qual id eu quero editar
        }
    };

    const[isEnabled, setIsEnabled] = useState(false)
    
    return (
        
        <MyView style={styles.container}>

            <MySwitch isEnabled={isEnabled} onToggle={setIsEnabled} />
                

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
                    <Button title={editingID !== -1 ? "Atualizar":"Cadastrar"} color={'#813AB1'} onPress={handleRegister} />
                </View>
                

                <View style={styles.listContainer}>
                    <Text style={styles.title}>Registros Cadastrados</Text>
                    <ScrollView style={{ flex: 1 }}>
                        <FlatList
                            data={records}
                            keyExtractor={(item) => item.id.toString()}//tratamento
                            renderItem={({ item }) => (
                                <View style={styles.recordItem}>
                                    <Text style={styles.recordText}>Nome: {item.name}</Text>
                                    <Text style={styles.recordText}>Email: {item.email}</Text>
                                    <Text style={styles.recordText}>RG: {item.rg}</Text>
                                    <Text style={styles.recordText}>Data de Nascimento: {item.dateBirth}</Text>
                                    <Text style={styles.recordText}>CPF: {item.cpf}</Text>
                                    <Text style={styles.recordText}>Criado em: {item.createAt}</Text>
                                    
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity style={styles.editButton} onPress={() => editRecord(item.id)}> 
                                            <Text style={styles.buttonText}>
                                                Editar
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteRecord(item.id)}> 
                                            <Text style={styles.buttonText}>
                                                Excluir
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                            showsVerticalScrollIndicator={true}
                            contentContainerStyle={{ paddingBottom: 20 }}
                        />
                    </ScrollView>
                </View>
            </View>
        </MyView>
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
        backgroundColor: '#FFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
    },
    listContainer: {
        flex: 1, 
        padding: 10,
        backgroundColor:'#FFF',
        borderRadius: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },   
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    recordItem: {
        backgroundColor: '#E6E6FA',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        borderLeftWidth: 5,
        borderLeftColor: '#813AB1',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,

    },
    recordText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center' 
    },
    buttonContainer: { 
        flexDirection: 'row', 
        justifyContent: 'center', 
        marginTop: 10,
        backgroundColor: '#E6E6FA'
    },
    editButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginRight: 5,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5 ,
    },
    

});




