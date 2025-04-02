import React, {useState} from "react";
import{View,Text, StyleSheet, FlatList, TextInput, Button, TouchableOpacity} from "react-native";
import CurrencyInput from 'react-native-currency-input';
import {TimeInput} from "@heroui/date-input";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MyView from '../src/components/MyView';
import { useRouter } from 'expo-router';

export default function PositionScreen(){
/*Aqui é TypeScript*/

    const[req, setReq] = useState({
        id:-1,
        name:"",
        description:"",
        salary: 0,
        workHours:"",
        departament:"",
        supervisor:"",
        creatAt: new Date().toString(),
    });

    const [positions, setPositions] = useState <{name: string, description: string, salary: number, id: number, workHours: string, departament: string, supervisor: string, creatAt: string }[]> ([])
    
    function handleRegister (){
        if(req.id == -1){
            const newId = positions.length ? positions [positions.length - 1].id + 1 : 0;
            const newPosition = {...req, id: newId};

            setPositions([...positions,newPosition]);
        }else{
            setPositions(positions.map(p => (p.id == req.id ? req : p)));
        }
        setReq ({
            id: -1,
            name:"",
            description:"",
            salary: 0,
            workHours:"",
            departament:"",
            supervisor:"",
            creatAt: new Date().toString()
        })
    }

    function editPosition (id:number){
        const position = positions.find(p => p.id == id)
        if(position)
            setReq(position)

    }

    function delPosition (id:number){
        const list = positions.filter(p => p.id != id)
        setPositions(list)
    }

    const router = useRouter();

    return (
        <MyView router={router} >
            {/*Aqui é TypeScript dentro do front*/}
            <Text>Minha tela dos cargos</Text>
            <View style = {styles.row}>
                <View style={styles.form}>
                    <TextInput 
                        placeholder="Cargo"
                        value = {req.name}
                        onChangeText={(text)=> setReq({...req ,name: text })}/>
 
                    {/*<Myinput 
                        label="Descrição"
                        placeholder="Insira uma descrição"
                        iconName="briefcase"
                        value = {req.description}
                        onChangeText={(text)=> setReq({...req ,description: text })}/>
                        */}

                    {/*<CurrencyInput 
                        placeholder="Salário" />
                        value = {req.salary}
                        onChangeText={(text)=> setReq({...req ,salary: text })}/>

                        {req.salary}*/}

                    {/*<TimeInput 
                        placeholder="Horas trabalhadas" />
                        value = {req.workHours}
                        onChangeText={(text)=> setReq({...req ,workHours: text })}/>

                        {req.workHours}*/}

{/*
                    <Myinput 
                        label="Departamento"
                        placeholder="Insira um departamento"
                        iconName="briefcase"
                        value = {req.departament}
                        onChangeText={(text)=> setReq({...req ,departament: text })}/>
*/}

{/*
                    <Myinput 
                        label="Supervisor"
                        placeholder="Insira um supervisor"
                        iconName="briefcase"
                        value = {req.supervisor}
                     onChangeText={(text)=> setReq({...req ,supervisor: text })}/>
*/}

                    {/*<DateTimePickerModal 
                        placeholder="Data de cadastro" />*/}

                    <Button title = "Cadastrar" onPress={handleRegister}/>
                </View> 
                    <FlatList
                        data={positions}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <View style={styles.card}>
                                <Text>{item.name}</Text>
                                <Text>{item.description}</Text>
                                <Text>{item.salary}</Text>
                                <Text>{item.workHours}</Text>
                                <Text>{item.departament}</Text>
                                <Text>{item.supervisor}</Text>
                                <Text>{item.creatAt}</Text>

                                <View style = {styles.buttonsContanier}>
                                    <TouchableOpacity onPress={()=> { editPosition(item.id) }}>Edit</TouchableOpacity>
                                    <TouchableOpacity onPress={()=> { delPosition(item.id) }}>Delete</TouchableOpacity>
                                </View>
                                   
                            </View>
                        )}  />                
                    </View>

        </MyView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start"
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
        flex: 3,
        marginRight: 10,
        marginHorizontal: 8,
        marginVertical: 4,
        padding: 10,
        backgroundColor: '#F2F2F3',
        borderRadius: 20,
        shadowColor: '#0001',
        shadowOpacity: 0.2,
        shadowOffset: { width: 2, height: 6 },
        shadowRadius: 8
    },
    buttonsContanier: {
        flexDirection: "row",
        justifyContent: "space-around",
        gap: 20,
        alignItems: "center",
        backgroundColor: '#A020F0'
    }
})