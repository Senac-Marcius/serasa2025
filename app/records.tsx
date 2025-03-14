import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button, FlatList} from 'react-native';

export default function RecordScreen(){
{/*Aqui é typescript COMENTÁRIO dentro do front */}

    const [req, setReq] = useState ({
        id:0,
        name:'',
        description:'',
        sick:'',
        health:'',
        allergy:'',
        medication:'',
        userId:0,
        createAt: new Date().toISOString(),
    });

    const [records, setRecords] = useState<{
        id: number
        name: string,
        description: string, 
        sick: string, 
        health: string, 
        allergy: string, 
        medication: string,
        userId: number,
        createAt: string,

    }[]>([]);

    function handleRegister() {
        setRecords([...records, req])
        setReq({
            id: req.id + 1,
            name:'',
            description:'',
            sick:'',
            health:'',
            allergy:'',
            medication:'',
            userId:0,
            createAt: new Date().toISOString(),
        })
    }

    return (
        <View>
            <Text>Tela dos Registros</Text>

            <View style={styles.row}>

                <View style={styles.form}>


                    <TextInput
                        placeholder="Nome do Aluno:"
                        value={req.name}
                        onChangeText={(text) => setReq({...req, name: text }) }
                    />

                    <TextInput
                        placeholder="Descrição:"
                        value={req.description}
                        onChangeText={(text) => setReq({...req, description: text }) }
                    />

                    <TextInput
                        placeholder="Doença:"
                        value={req.sick}
                        onChangeText={(text) => setReq({...req, sick: text }) }
                    />

                    <TextInput
                        placeholder="Saúde:"
                        value={req.health}
                        onChangeText={(text) => setReq({...req, health: text }) }
                    />

                    <TextInput
                        placeholder="Alergia:"
                        value={req.allergy}
                        onChangeText={(text) => setReq({...req, allergy: text }) }
                    />

                    <TextInput
                        placeholder="Medicações:"
                        value={req.medication}
                        onChangeText={(text) => setReq({...req, medication: text }) }
                    />


                <Button title="Cadastrar:" onPress={ handleRegister } />
                
                </View>
                <FlatList
                    data={records}
                    keyExtractor={( item ) => item.id.toString()} 
                    renderItem={({ item }) => (
                        <View style={styles.recordsItem}>

                            <Text>{item.name}</Text>
                            <Text>{item.description}</Text>
                            <Text>{item.sick}</Text>
                            <Text>{item.health}</Text>
                            <Text>{item.allergy}</Text>
                            <Text>{item.medication}</Text>
                            <Text>{item.userId}</Text>
                        </View>
                    )}                                                                           
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
    },
    form: {
        flex: 1,
        marginRight: 20,
        marginLeft: 20,
        padding: 20,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
    },
    recordsItem:{
    flex: 1,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 20,
    padding: 60,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    }
})