import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import MySupport from '../src/components/Mysupport';
import MyView from '../src/components/MyView';

export default function LaunchScreen() {
    const [req, setReq] = useState({
        Id: -1,
        observation: '',
        presence: '',
        indicator: '',
        note: '',
        createAt: new Date().toISOString(),
        userId: 0,
    });

    const [launchs, setLaunchs] = useState<{
        Id: number,
        observation: string,
        presence: string,
        indicator: string,
        note: string,
        createAt: string,
        userId: number,

    }[]>([]);

    function handleRegister() {
        if (req.Id == -1) {
            const newId = launchs.length ? launchs[launchs.length - 1].Id + 1 : 0;
            const newLaunch = { ...req, Id: newId };


            setLaunchs([...launchs, newLaunch])
        } else {
            setLaunchs(launchs.map(l => (l.Id == req.Id ? req : l)));



        }
        setReq({
            Id: -1,
            observation: '',
            presence: '',
            indicator: '',
            note: '',
            createAt: new Date().toISOString(),
            userId: 0,

        })

    }

    function editLaunch(Id: number) {
        const launch = launchs.find(l => l.Id == Id)
        if (launch)
            setReq(launch)

    }

    function delLaunch(Id: number) {
        const list = launchs.filter(l => l.Id != Id)
        setLaunchs(list)

    }


    return (
        <MyView>


            <View style={styles.form}>
                <Text>Lançamentos de Alunos:</Text>

                <TextInput
                    placeholder="Digite a Observação:"
                    value={req.observation}
                    onChangeText={(text) => setReq({ ...req, observation: text })}
                />


                <TextInput
                    placeholder="Digite a Nota:"
                    value={req.note}
                    onChangeText={(text) => setReq({ ...req, note: text })}
                />


                <TextInput
                    placeholder="Presença:"
                    value={req.presence}
                    onChangeText={(text) => setReq({ ...req, presence: text })}
                />


                <TextInput
                    placeholder="Indicador"
                    value={req.indicator}
                    onChangeText={(text) => setReq({ ...req, indicator: text })}

                />

                <Button title="CADASTRAR" onPress={handleRegister} color="purple" />



            </View>

            <FlatList
                data={launchs}
                keyExtractor={(item) => item.Id.toString()}
                renderItem={({ item }) => (
                    <View
                        style={styles.card}
                    >
                        <Text>{item.observation}</Text>
                        <Text>{item.note}</Text>
                        <Text>{item.presence}</Text>
                        <Text>{item.indicator}</Text>
                        <Text>{item.createAt}</Text>
                        <Text>{item.userId}</Text>

                        <View style={styles.buttonsContanier}>
                            <TouchableOpacity style={styles.buttonedit} onPress={() => { editLaunch(item.Id) }}>EDIT</TouchableOpacity>
                            <TouchableOpacity style={styles.buttondelete} onPress={() => { delLaunch(item.Id) }}>DELETE</TouchableOpacity>
                        </View>
                    

                    </View>


                )}
            />
            <MySupport label='dgsdgsd' />

        </MyView>
    );
}


const styles = StyleSheet.create({

    buttonsContanier: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        alignContent: 'space-around',
        padding: 20,
        borderRadius: 10,

    },

    buttondelete: {
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        backgroundColor: "red",
        textAlign: 'center',

    },

    buttonedit: {
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        backgroundColor: "yellow",
        textAlign: 'center',

    },


    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',


    },


    form: {
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

    card: {
        flex: 5,
        marginRight: 15,
        padding: 25,
        backgroundColor: '#F2F2F2',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.6,
        shadowOffset: { width: 2, height: 6 },
        shadowRadius: 6,
        marginBottom: 10,
    },


}
)