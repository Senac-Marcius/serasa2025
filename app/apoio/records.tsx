import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import MyView from '../../src/components/MyView';
import MyButton from '../../src/components/MyButtons';
import { IconButton } from 'react-native-paper';
import { Myinput, MyCheck, MyTextArea } from '../../src/components/MyInputs';
import { MyItem } from '../../src/components/MyItem';
import MyList from '../../src/components/MyList';
import {setRecord, iRecord, getRecords } from '../../src/controllers/records'
import { supabase } from '../../src/utils/supabase';
import Mytext from '../../src/components/MyText';
import { getLevels, tolevels } from '../../src/controllers/levels';
import MySelect from '../../src/components/MySelect';
import { getUsers, toListUser } from '../../src/controllers/users';

 
export default function RecordScreen(user_id:Number) {
    const [isChecked, setIsChecked] = useState(true);
 
    const [levels, setLevels] = useState<any[]>([]);
 
    const [users, setUsers] = useState<any[]>([]);
 
    const [records, setRecords] = useState<iRecord[]>([]);
   
    useEffect (() => {
        (async () => {
            const retorno = await  getRecords ({})
            if (retorno.status && retorno.data && retorno.data.length > 0){
                setRecords(retorno.data);
 
            }  
        })();
 
        (async () => {
            const retorno = await  getLevels ({})
            if (retorno.status && retorno.data && retorno.data.length > 0){
                setLevels(tolevels(retorno.data));
            }  
        })();
 
        (async () => {
            const retorno = await  getUsers ({})
            if (retorno.status && retorno.data && retorno.data.length > 0){
                setUsers(toListUser(retorno.data));
            }  
        })();
 
 
    })
 
 
    const [req, setReq] = useState({
        user_id: 0,
        id: -1,
        description: '',
        sick: '',
        health: '',
        allergy: '',
        medication: '',
        level_id: 0,
        create_at: new Date().toISOString(),
    });
 
    /* Já puxei esse código no controller
    useEffect(() => {
        async function getTodos () {
            const { data: todos } = await supabase.from ('records').select()
 
            if (todos && todos.length > 1) {
                setRecords (todos)
           
            }
        }
       
        getTodos()
 
    }, [])*/
 
   async function handleRegister() {
        if (req.id == -1) {

            if(req.user_id == -1){
                //CHAMAR O TOAST
                return
            }

            const newId = records.length ? records[records.length - 1].id + 1 : 0;

            const newRecord = { ...req, id: newId };
            setRecords([...records,newRecord]);
            const resp = await setRecord(newRecord)
            console.log (resp)
 
                } else {
                    const { error } = await supabase.from('records')
                        .update(req)
                        .eq('id', req.id);
           
                    if (!error) {
                        setRecords(records.map(r => (r.id === req.id ? req : r)));
                    } else {
                        console.error("Erro ao atualizar:", error);
                    }
                }
           
                // Limpa o formulário após salvar ou atualizar
                setReq({
                    user_id: 0,
                    id: -1,
                    description: '',
                    sick: '',
                    health: '',
                    allergy: '',
                    medication: '',
                    level_id: 0,
                    create_at: new Date().toISOString(),
                })
            }
       
 
   async function delRecord(id: number) {
        const { error } = await supabase.from('records').delete().eq('id', id);
        if (!error) {
            const list = records.filter(r => r.id != id)
            setRecords(list)
        } else {
            console.error('Erro ao deletar:', error);
        }
    }
 
    function editRecord(id: number) {
        const record = records.find(r => r.id === id);
        if (record) {
            setReq(record);
        }
    }
     
 
    return (
 
        <MyView >
 
 
            <View style={styles.row}>
 
 
                <View style={styles.form}>
 
                <MySelect
                        label={ users.find(l => l.key == req.user_id)?.option || 'Selecione um usuario'}
                        setLabel={ () => {}}
                        setKey={ (key)=> setReq ({...req, user_id: key }) }  
                        list={users}
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
                        value={req.allergy}
                        onChangeText={(text) => setReq({ ...req, allergy: text })}
                        placeholder='Alergia'
                        label='Coloque as alergias do aluno:'
                        iconName='biotech'
                    />
 
                    < Myinput
                        value={req.medication}
                        onChangeText={(text) => setReq({ ...req, medication: text })}
                        placeholder='Medicação'
                        label='Coloque as medicações de uso do aluno:'
                        iconName='medication'
                    />
 
 
                    <MySelect
                        label={ levels.find(l => l.key == req.level_id)?.option || 'Selecione um nível'}
                        setLabel={ () => {}}
                        setKey={ (key)=> setReq ({...req, level_id: key }) }  
                        list={levels}
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
 
                 <MyItem
                    style={styles.cardGridItem}
                    onEdit={() => editRecord(item.id)}
                    onDel={() => delRecord(item.id)}
                    >      
                    <Mytext style={styles.itemText}>Descrição: {item.description}</Mytext>
                    <Mytext style={styles.itemText}>Doença: {item.sick}</Mytext>
                    <Mytext style={styles.itemText}>Saúde: {item.health}</Mytext>
                    <Mytext style={styles.itemText}>Alergias: {item.allergy}</Mytext>
                    <Mytext style={styles.itemText}>Medicações: {item.medication}</Mytext>
                    <Mytext style={styles.itemText}>Usuário: {users.find(u => u.key == item.user_id).option} </Mytext>
                    <Mytext style={styles.itemText}>Nível: {levels.find(l => l.key == item.level_id).option}</Mytext>
                       
                    </MyItem>  
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
        alignSelf:"center",
       
    },
 
    form: {
        flex: 20,
        marginRight: 20,
        marginLeft: 20,
        padding: 30,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        alignItems: "center",
    },
 
    button_round: {
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        flex: 20,
 
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
    },
 
    cardGridItem: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 16,
        margin: 8,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 2,
      },
 
})
 