import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MyView from '../../src/components/MyView';
import { MyCorrelated} from '../../src/components/MyItem';
import MyList from '../../src/components/MyList';
import { Myinput, MyCheck } from '../../src/components/MyInputs';
import MyButton from '../../src/components/MyButtons';
import MyCalendar from '../../src/components/MyCalendar';
import { useRouter } from 'expo-router';
import {setLaunch, iLaunch, getLaunchs} from '../../src/controllers/launchs';
import MySelect from '../../src/components/MySelect';


export default function LaunchScreen() {
    const [launchs, setLaunchs] = useState<iLaunch[]>([]);

    useEffect(() => {
        const listaAlunos = [
            { key: 1, option: "aluno 1" },
            { key: 2, option: "aluno 2" },
            { key: 3, option: "aluno 3" }
        ];
    
        setAlunos(listaAlunos);
    
        const novosLaunchs = listaAlunos.map((a) => ({
            id: -1,
            observation: '',
            presence: true,
            indicator: '',
            note: '',
            created_at: new Date().toString(),
            students_id: a.key,
            class_id: 0,
            employees_id: 0,
        }));
    
        setLaunchs(novosLaunchs);
    }, []);

   

    async function handleRegister() {
       

    }

    const [turmas, setTurmas] = useState([
        {key:1, option: "turma 1"},
        {key:2, option: "turma 2"},
        {key:3, option: "turma 3"},
    ]);

    const [disciplinas, setDisciplinas] = useState([
        {key:1, option: "disciplina 1"},
        {key:2, option: "disciplina 2"},
        {key:3, option: "disciplina 3"},
    ]);

    const [alunos, setAlunos] = useState([
        {key: 0, option: ""}
    ]);

    const [ turmaSelect, setTurmaSelect] = useState({key:-1, option: 'turmas'});
    const [ disciplinaSelect, setDisciplinaSelect] = useState({key:-1, option: 'disciplinas'});

    return (
        <MyView>

            <View style={styles.row}>
                <MySelect label={turmaSelect.option} list={turmas} setLabel={(item) => setTurmaSelect(turmas.find(t => t.option == item) || turmaSelect ) } setKey={(key) => setTurmaSelect(turmas.find(t => t.key == key) || turmaSelect ) } /> 
                <MySelect label={disciplinaSelect.option} list={disciplinas} setLabel={(item) => setDisciplinaSelect(disciplinas.find(t => t.option == item) || disciplinaSelect ) } setKey={(key) => setDisciplinaSelect(disciplinas.find(t => t.key == key) || disciplinaSelect ) } /> 
                
                {/*aqui chamar o calendario*/}
                <MyCalendar
                        date='2021-10-10'
                        setDate={(date) => console.log(date)}
                        icon=''
                />
            </View>

            <h1 style={{textAlign: 'center', marginTop: 50}} >Alunos</h1>

            <MyList
                data={launchs}
                keyItem={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MyCorrelated style={styles.card} showEditButton={false} showDeleteButton={false}>
                        <Text style={{marginTop: 20}}>{alunos.find(a => a.key === item.students_id)?.option || item.students_id}</Text>

                        <MyCheck
                            label={item.presence ? "Presente" : "Faltou    "}
                            checked={item.presence}
                            onToggle={() => {
                                const updated = launchs.map(r =>
                                    r.students_id === item.students_id ? { ...r, presence: !item.presence } : r
                                );
                                setLaunchs(updated);
                            }}
                        />

                        <Myinput
                            label='Observação'
                            iconName=''
                            placeholder="Digite a Observação:"
                            value={item.observation}
                            onChangeText={(text) => {
                                const updated = launchs.map(r =>
                                    r.students_id === item.students_id ? { ...r, observation: text } : r
                                );
                                setLaunchs(updated);
                            }}
                        />

                        <Myinput
                            label='Nota'
                            iconName=''
                            style={styles.campo}
                            placeholder="A"
                            value={item.note}
                            onChangeText={(text) => {
                                const updated = launchs.map(r =>
                                    r.students_id === item.students_id ? { ...r, note: text } : r
                                );
                                setLaunchs(updated);
                            }}
                        />

                        <Myinput
                            label='Indicador'
                            iconName=''
                            style={styles.campo}
                            placeholder="1"
                            value={item.indicator}
                            onChangeText={(text) => {
                                const updated = launchs.map(r =>
                                    r.students_id === item.students_id ? { ...r, indicator: text } : r
                                );
                                setLaunchs(updated);
                            }}
                        />

                    </MyCorrelated>
                )}
            />

            <MyButton title="Salvar" onPress={handleRegister} /> {/*Mybutton*/}


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
        gap: 20,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    campo:{width: 50}


}
)