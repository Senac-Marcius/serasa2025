import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import MySupport from '../src/components/Mysupport';
import MyView from '../src/components/MyView';
import { ScrollView } from 'react-native-gesture-handler';
import Myiten from '../src/components/myItenlist';
import MyList from '../src/components/mylist';
import { Myinput, MyCheck } from '../src/components/Myinputs';
import Mybutton from '../src/components/Mybuttons';
import MyCalendar from '../src/components/MyCalendar';




export default function LaunchScreen() {
    const [isChecked, setIsChecked] = useState(true);
    const [req, setReq] = useState({
        Id: -1,
        observation: '',
        presence: true,
        indicator: '',
        note: '',
        createAt: new Date().toString(),
        userId: 0,
    });

    const [launchs, setLaunchs] = useState<{
        Id: number,
        observation: string,
        presence: boolean,
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
            presence: true,
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

                {/*aqui chamar o calendario*/}
                <MyCalendar
                    date='2021-10-10'
                    setDate={(date) => console.log(date)}
                />

                <Text>Lançamentos de Alunos:</Text>

                <MyCheck
                    label={isChecked ? "Presente" : "Faltou"} checked={isChecked}
                    onToggle={() => setIsChecked(!isChecked)}
                />

                <Myinput //Myinput
                    placeholder="Digite a Observação:"
                    value={req.observation}
                    onChangeText={(text) => setReq({ ...req, observation: text })}
                    label=""
                    iconName=""
                />


                <Myinput
                    placeholder="Digite a Nota:"
                    value={req.note}
                    onChangeText={(text) => setReq({ ...req, note: text })}
                    label=""
                    iconName=""
                />



                <Myinput
                    placeholder="Indicador"
                    value={req.indicator}
                    onChangeText={(text) => setReq({ ...req, indicator: text })}
                    label=""
                    iconName=""
                />

                <Mybutton title="CADASTRAR" onPress={handleRegister} /> {/*Mybutton*/}



            </View>

            <MyList //Mylist
                data={launchs}
                keyItem={(item) => item.Id.toString()}
                renderItem={({ item }) => (

                    <Myiten //Mylistitem
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


                    </Myiten>


                )}
            />

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