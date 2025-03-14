import React, {useState} from "react";
import{View,Text, StyleSheet, FlatList, TextInput, Button} from "react-native";
import CurrencyInput from 'react-native-currency-input';
import {TimeInput} from "@heroui/date-input";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function PositionScreen(){
/*Aqui é TypeScript*/

    const[req, setReq] = useState({
        id:0,
        name:"",
        description:"",
        salary: 0,
        workHours:"",
        departament:"",
        supervisor:"",
        creatAt: new Date().toISOString(),
    });

    const [positions, setPositions] = useState <{name: string, description: string, salary: number, id: number, workHours: string, departament: string, supervisor: string, creatAt: string }[]> ([])
    
    function handleRegister (){
        setPositions([...positions,req])
        setReq ({
            id: req.id +1,
            name:"",
            description:"",
            salary: 0,
            workHours:"",
            departament:"",
            supervisor:"",
            creatAt: new Date().toISOString()
        })
    }

    return (
        <View>
            {/*Aqui é TypeScript dentro do front*/}
            <Text>Minha tela dos cargos</Text>
            <View style = {styles.row}>
                <View style={styles.form}>
                    <TextInput 
                        placeholder="Cargo"
                        value = {req.name}
                        onChangeText={(text)=> setReq({...req ,name: text })}/>
 
                    <TextInput 
                        placeholder="Digite a descrição"
                        value = {req.description}
                        onChangeText={(text)=> setReq({...req ,description: text })}/>

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

                    <TextInput 
                        placeholder="Departamento"
                        value = {req.departament}
                        onChangeText={(text)=> setReq({...req ,departament: text })}/>

                    <TextInput 
                        placeholder="Supervisor"
                        value = {req.supervisor}
                        onChangeText={(text)=> setReq({...req ,supervisor: text })}/>

                    {/*<DateTimePickerModal 
                        placeholder="Data de cadastro" />*/}

                    <Button title = "Cadastrar" onPress={handleRegister}/>
                </View> 
                    <FlatList
                        data={positions}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <View style={styles.form}>
                                <Text>{item.name}</Text>
                                <Text>{item.description}</Text>
                                <Text>{item.salary}</Text>
                                <Text>{item.workHours}</Text>
                                <Text>{item.departament}</Text>
                                <Text>{item.supervisor}</Text>
                                <Text>{item.creatAt}</Text>
                                   
                            </View>
                        )}  />                
                    </View>

        </View>
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
})