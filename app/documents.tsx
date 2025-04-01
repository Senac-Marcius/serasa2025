import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList,  ScrollView, TouchableOpacity } from 'react-native';
//import MySwitch from '../src/components/MySwitch' //nome do arquivo
import MyView from '../src/components/MyView';
//nome da variavel

export default function RecordScreen() {
    
    

    // Função para cancelar o envio
    const handleCancel = (id: number) => {
    };

    // Função para fazer o envio
    const handleUpload = (id: number) => {
        
    };

    //const[isEnabled, setIsEnabled] = useState(false) ---- useState do Upload
    
    return (
        
        <MyView style={styles.container}>
              

            <View style={styles.row}>

                <View style={styles.formContainer}>

                    <Text style={styles.title}>Documentos</Text>
                    
                        
                    <Button title={"Escolha um arquivo para fazer Upload"} color={'#813AB1'} /*onPress={handleUpload}*/ />
                </View>

                <View style={styles.formContainer}>
                <Button title={"Cancelar"} color={'#813AB1'} /*onPress={}*/ />
                <Button title={"Fazer Upload"} color={'#813AB1'} /*onPress={}*/ />
                </View>
                

                <View style={styles.listContainer}>
                    <Text style={styles.title}>Documentos Cadastrados</Text>
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




