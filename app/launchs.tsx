import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import MySupport from '../src/components/MySupport';
import MyView from '../src/components/MyView';
import { ScrollView } from 'react-native-gesture-handler';
import {MyItem, MyCorrelated} from '../src/components/MyItem';
import MyList from '../src/components/MyList';
import { Myinput, MyCheck } from '../src/components/MyInputs';
import Mybutton from '../src/components/MyButtons';
import MyCalendar from '../src/components/MyCalendar';




export default function LaunchScreen() {
    const [isChecked, setIsChecked] = useState(true);
    const [req, setReq] = useState({
        id: -1,
        observation: '',
        presence: true,
        indicator: '',
        note: '',
        createAt: new Date().toString(),
        userId: 0,
    });

    const [launchs, setLaunchs] = useState<{
        id: number,
        observation: string,
        presence: boolean,
        indicator: string,
        note: string,
        createAt: string,
        userId: number,

    }[]>([]);

    function handleRegister() {
        if (req.id == -1) {
            const newId = launchs.length ? launchs[launchs.length - 1].id + 1 : 0;
            const newLaunch = { ...req, id: newId };


            setLaunchs([...launchs, newLaunch])
        } else {
            setLaunchs(launchs.map(l => (l.id == req.id ? req : l)));



        }
        setReq({
            id: -1,
            observation: '',
            presence: true,
            indicator: '',
            note: '',
            createAt: new Date().toISOString(),
            userId: 0,

        })

    }

    function editLaunch(Id: number) {
        const launch = launchs.find(l => l.id == Id)
        if (launch)
            setReq(launch)

    }

    function delLaunch(Id: number) {
        const list = launchs.filter(l => l.id != Id)
        setLaunchs(list)

    }


    return (
        <MyView>

            <Mybutton title="turma" onPress={handleRegister} /> {/*simulando select que tenho que pegar da giovana*/}
            <Mybutton title="disciplina" onPress={handleRegister} />
            
            {/*aqui chamar o calendario*/}
            <MyCalendar
                    date='2021-10-10'
                    setDate={(date) => console.log(date)}
            />

            <Text>Alunos:</Text>

            <View style={styles.form}>

               

    


                <Mybutton title="Salvar" onPress={handleRegister} /> {/*Mybutton*/}



            </View>

            <MyList //Mylist
                data={launchs}
                keyItem={(item) => item.id.toString()}
                renderItem={({ item }) => (

                    <MyCorrelated //Mylistitem
                    showEditButton={false} 
                   showDeleteButton={false}
                        style={styles.card}
                    >
                        <Text>{item.userId}</Text>
                        
                        <MyCheck
                            label={isChecked ? "Presente" : "Faltou"} checked={isChecked}
                            onToggle={() => setIsChecked(!isChecked)}
                        />

                        <Myinput //Myinput
                            placeholder="Digite a Observação:"
                            value={req.observation}
                            onChangeText={(text) => {
                                setReq({ ...req, observation: text });
                                setLaunchs(launchs.map(l => (l.id == item.id ? req : l)));
                            }}
                            label=""
                            iconName=""
                        />


                        <Myinput
                            placeholder="Digite a Nota:"
                            value={req.note}
                            onChangeText={(text) => {
                                setReq({ ...req, note: text });
                                setLaunchs(launchs.map(l => (l.id == item.id ? req : l)));
                            }}
                            label=""
                            iconName=""
                        />



                        <Myinput
                            placeholder="Indicador"
                            value={req.indicator}
                            onChangeText={(text) => {
                                setReq({ ...req, indicator: text });
                                setLaunchs(launchs.map(l => (l.id == item.id ? req : l)));
                            }}
                            label=""
                            iconName=""
                        />


                    </MyCorrelated>


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
        marginRight: 10,
        padding: 20,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        height: 800,
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