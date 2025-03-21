import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity} from 'react-native';
import MyMore from '../src/components/Mymore'

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
        if(req.id ==-1){
            const newId = records.length ? records[records.length -1].id +1 : 0;
            const newRecord = {...req, id: newId};

            setRecords([...records, req]);
        }else{
            setRecords(records.map(r =>(r.id == req.id ? req : r))); 
        }
        
        setReq({
            id: -1,
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

    function editRecord(id:number){ 
        const record = records.find (r => r.id == id)
        if(record)
            setReq(record)
    }

    function delRecord(id:number){
        const list = records.filter (r => r.id != id)
        if(list)
            setRecords(list)
    }

    return (

        <View>

            <MyMore style = {{padding: 20}}> 
                <></>
            </MyMore>

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
                            <Text>Nome: {item.name}</Text>
                            <Text>Descrição: {item.description}</Text>
                            <Text>Doença: {item.sick}</Text>
                            <Text>Saúde: {item.health}</Text>
                            <Text>Alergias: {item.allergy}</Text>
                            <Text>Medicações: {item.medication}</Text>
                            <Text>Usuário Id: {item.userId}</Text>

                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity onPress={( ) => {editRecord(item.id)}}>EDIT</TouchableOpacity>
                                <TouchableOpacity onPress={ ( ) => {delRecord(item.id)}}>DELETE</TouchableOpacity>
                            </View>
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
        padding: 10,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
    },

    buttonsContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        alignContent: 'space-around',
  
    },
})