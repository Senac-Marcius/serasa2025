import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TextInputBase, FlatList, TouchableOpacity } from 'react-native';
import MyButton from '../src/components/Mybuttons';
import MyView from '../src/components/MyView';
import MySearch from '../src/components/Mysearch';
import MyCalendar from '../src/components/MyCalendar'
 

export default function TimelineScreen() {
    // aqui é typescript
    const [req, setReq] = useState({
        id: -1,
        url: '',
        class: '',
        userId: 0,
        discipline: '',
        location: '',
        start_time: '',
        end_time: '',
        createAt: new Date().toISOString(),

    });

    const [timelines, setTimelines] = useState<{
        id: number,
        url: string,
        class: string,
        userId: number,
        discipline: string,
        location: string,
        start_time: string,
        end_time: string,
        createAt: string,

    }[]>([]);

    function handleRegister() {
        if (req.id == -1) {
            const newId = timelines.length ? timelines[timelines.length - 1].id + 1 : 0;
            const newTimeline = { ...req, id: newId };

            setTimelines([...timelines, newTimeline]);
        } else {
            setTimelines(timelines.map(s => (s.id == req.id) ? req : s));
        }
        setReq({
            id: -1,
            url: '',
            class: '',
            userId: 0,
            discipline: '',
            location: '',
            start_time: '',
            end_time: '',
            createAt: new Date().toISOString(),
        })
    }

    function editTimelines(id: number) {
        const timeline = timelines.find(s => s.id == id)
        if (timeline)
            setReq(timeline)
    }

    function delTimelines(id: number) {
        const list = timelines.filter(s => s.id != id)
        setTimelines(list)
    }

    function buscar(){ 

    }

    const [buscar,setBusca] = useState('');


{/*MyView tela do rabelo */}    

    return (

        
        
        <MyView> 
            {/*pesquisa */}
            <MySearch icon="magnify" // Ícone de pesquisa do react-native-paper
                size={20}
                onPress={onPress}
                style={{ position: 'absolute', left: 10 }} >
            </MySearch> 
                
        


            </MyCalendar >
            

            </MyCalendar>


            {/* aqui é typescript dentro do front */}

            <text>Meu Cronograma</text>
            <View style={styles.row}>
                <View style={styles.form}>

                    <TextInput placeholder="Digite a url:" value={req.url} onChangeText={(text) => setReq({ ...req, url: text })} />
                    <TextInput placeholder="Digite a classe:" value={req.class} onChangeText={(text) => setReq({ ...req, class: text })} />
                    <TextInput placeholder="Digite a disciplina:" value={req.discipline} onChangeText={(text) => setReq({ ...req, discipline: text })} />
                    <TextInput placeholder="Digite a localização:" value={req.location} onChangeText={(text) => setReq({ ...req, location: text })} />
                    <TextInput placeholder="Digite o horário de início:" value={req.start_time} onChangeText={(text) => setReq({ ...req, start_time: text })} />
                    <TextInput placeholder="Digite o horário do fim:" value={req.end_time} onChangeText={(text) => setReq({ ...req, end_time: text })} />

                    <MyButton
                        button_type='capsule'
                        width={313}
                        height={50}
                        title='CONCLUÍDO'
                        icon='check-circle-outline'
                        style={styles.icon_left}
                    ></MyButton>
                </View>
            
                <FlatList
                    data={timelines}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.item}>



                            <Text> {item.userId} </Text>
                            <Text> {item.url} </Text>
                            <Text> {item.class} </Text>
                            <Text> {item.discipline} </Text>
                            <Text> {item.location} </Text>
                            <Text> {item.start_time} </Text>
                            <Text> {item.end_time} </Text>
                            <Text> {item.createAt} </Text>

                            <View style={styles.buttonsContanier}>
                                <TouchableOpacity style={styles.buttonedit} onPress={() => { editTimelines(item.id) }} >EDIT</TouchableOpacity>
                                <TouchableOpacity style={styles.buttondel} onPress={() => { delTimelines(item.id) }}>DELETE</TouchableOpacity>

                            </View>



                        </View>
                    )}
                />

            </View>
        </MyView>
    )
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
    icon_left: {
        display: "flex",
        flexDirection: 'row-reverse',    
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

    item: {
        flex: 1,
        marginRight: 10,
        padding: 40,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        marginBottom: 20,

    },

    buttonedit: {
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'purple',
        textAlign: 'center',
    },

    buttondel: {
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'gray',
        textAlign: 'center',



    },
})





