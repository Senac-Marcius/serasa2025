import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import MyView from '../src/components/MyView';
import MyButton from '../src/components/MyButtons';
import { IconButton } from 'react-native-paper';
import { Myinput, MyCheck, MyTextArea } from '../src/components/MyInputs';
import { MyItem, MyCorrelated } from '../src/components/MyItem';
import MyList from '../src/components/MyList';
import { useRouter } from 'expo-router';
import {setRecord, records, setRecords} from '../src/controllers/records'


export default function RecordScreen() {
    const router = useRouter();
    


    const [req, setReq] = useState({
        id: 0,
        name: '',
        description: '',
        sick: '',
        health: '',
        allergy: '',
        medication: '',
        user_id: 0,
        create_at: new Date().toISOString(),
    });

    /*RETIRAR ISSO AQUI DEPOIS ATTENCION PICKET POCKET
    //const [records, setRecords] = useState<{
        id: number
        name: string,
        description: string,
        sick: string,
        health: string,
        allergy: string,
        medication: string,
        userId: number,
       createAt: string,
    RETIRAR ISSO AQUI DEPOIS ATTENCION PICKET POCKET
    
    }[]>([]);*/

   async function handleRegister() {
        if (req.id == -1) {
            const newId = records.length ? records[records.length - 1].id + 1 : 0;
            const newRecord = { ...req, id: newId };
            setRecords([...records,newRecord]);
            const resp = await setRecord(newRecord)
            console.log (resp)
            
        } else {
            setRecords(records.map(r => (r.id == req.id ? req : r)));
        }

        setReq({
            id: -1,
            name: '',
            description: '',
            sick: '',
            health: '',
            allergy: '',
            medication: '',
            user_id: 0,
            create_at: new Date().toISOString(),
        })
    }

    function editRecord(id: number) {
        const record = records.find(r => r.id == id)
        if (record)
            setReq(record)
    }

    function delRecord(id: number) {
        const list = records.filter(r => r.id != id)
        if (list)
            setRecords(list)
    }

    return (

        <MyView router={router}>


            <View style={styles.row}>


                <View style={styles.form}>



                    <Myinput
                        placeholder="Digite"
                        value={req.name}
                        onChangeText={(text) => setReq({ ...req, name: text })}
                        label='Nome do Aluno:'
                        iconName='person'
                    />

                    < MyTextArea
                        value={req.description}
                        onChangeText={(text) => setReq({ ...req, description: text })}
                        placeholder='Descrição'
                        label='Descreva a situação:'
                        iconName='book'
                    />

                    < Myinput
                        value={req.sick}
                        onChangeText={(text) => setReq({ ...req, sick: text })}
                        placeholder='Doença'
                        label='Coloque a doença:'
                        iconName='sick'
                    />

                    <MyTextArea
                        value={req.health}
                        onChangeText={(text) => setReq({ ...req, health: text })}
                        placeholder="Saúde"
                        label='Descreva o estado da saúde do aluno:'
                        iconName='book'
                    />

                    < Myinput
                        value={req.sick}
                        onChangeText={(text) => setReq({ ...req, allergy: text })}
                        placeholder='Alergia'
                        label='Coloque as alergias do aluno:'
                        iconName='biotech'
                    />

                    < Myinput
                        value={req.sick}
                        onChangeText={(text) => setReq({ ...req, medication: text })}
                        placeholder='Medicação'
                        label='Coloque as medicações de uso do aluno:'
                        iconName='medication'
                    />

                    <MyButton
                        title="CADASTRAR"
                        onPress={handleRegister}
                        button_type="round"
                        style={styles.button_round}
                    />

                </View>


                <MyList
                    data={records}
                    keyItem={(item) => item.id.toString()}
                    renderItem={({ item }) => (

                        <MyCorrelated
                        showDeleteButton = {false}
                        showEditButton = {false}

                        style={styles.itemText}  /*MyItem */>
                            <Text style={styles.itemText}>Nome: {item.name}</Text>
                            <Text style={styles.itemText}>Descrição: {item.description}</Text>
                            <Text style={styles.itemText}>Doença: {item.sick}</Text>
                            <Text style={styles.itemText}>Saúde: {item.health}</Text>
                            <Text style={styles.itemText}>Alergias: {item.allergy}</Text>
                            <Text style={styles.itemText}>Medicações: {item.medication}</Text>
                            <Text style={styles.itemText}>Usuário Id: {item.user_id}</Text>

                            <View style={styles.button_round}>

                                <MyButton
                                    title="EXCLUIR"
                                    onPress={() => { delRecord(item.id) }}
                                    button_type="round"
                                    style={styles.button_round}
                                />

                                <MyButton
                                    title=" EDITAR"
                                    onPress={() => { editRecord(item.id) }}
                                    button_type="round"
                                    style={styles.button_round}
                                />


                            </View>
                        </MyCorrelated>
                    )}
                />
            </View>
        </MyView>
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
        padding: 30,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
    },

    button_round: {
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",

    },

    itemText: {
        color: 'black',
        fontSize: 16,
        marginBottom: 5,
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }

})