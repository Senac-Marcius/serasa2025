import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';

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

    }[]>([]);

    function handleRegister() {
        setRecords([...records, req])
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

                {req.name}
                {req.description}
                {req.sick}
                {req.health}
                {req.allergy}
                {req.medication}
                
                </View>
              
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

})