import React, {useState} from "react";
import{View,Text, StyleSheet, FlatList, TextInput, Button, TouchableOpacity} from "react-native";
import MyView from "../src/components/MyView";
import MyList from "../src/components/mylist";
import Myiten from "../src/components/myItenlist";

export default function PositionScreen(){
/*Aqui é TypeScript*/

    const[req, setReq] = useState({
        id:-1,
        name:"",
        description:"",
        salary: 0,
        workHours: "",
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
            workHours: "",
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

    return (
        <MyView style={styles.container}>
            {/*Aqui é TypeScript dentro do front*/}
            <Text>Minha tela dos cargos</Text>
            <View style = {styles.row}>
                <View style = {styles.form}>
                    <TextInput 
                        placeholder="Cargo"
                        value = {req.name}
                        onChangeText={(text)=> setReq({...req ,name: text })}/>
 
                    <TextInput 
                        placeholder="Digite a descrição"
                        value = {req.description}
                        onChangeText={(text)=> setReq({...req ,description: text })}/>

                    <TextInput 
                        placeholder="Salário"
                        value = {(req.salary).toString()}
                        onChangeText={(text)=> setReq({...req ,salary: Number(text) })}/> 

                    <TextInput
                        placeholder="Horas de trabalho" 
                        value = {req.workHours}
                        onChangeText={(value:string)=> setReq({...req ,workHours: value })}/>

                    <TextInput 
                        placeholder="Departamento"
                        value = {req.departament}
                        onChangeText={(text)=> setReq({...req ,departament: text })}/>

                    <TextInput 
                        placeholder="Supervisor"
                        value = {req.supervisor}
                        onChangeText={(text)=> setReq({...req ,supervisor: text })}/>

                  

                    <Button  title = "Cadastrar" onPress={handleRegister}/>
                </View> 
                    <MyList
                        data = {positions}
                        keyItem = {(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <Myiten style={styles.card}
                                onEdit={() => editPosition(item.id)}
                                onDel={() => delPosition(item.id)}>
                                <Text>{item.name}</Text>
                                <Text>{item.description}</Text>
                                <Text>{item.salary}</Text>
                                <Text>{item.workHours}</Text>
                                <Text>{item.departament}</Text>
                                <Text>{item.supervisor}</Text>
                                <Text>{item.creatAt}</Text>

                                {/*<View style = {styles.buttonsContanier}>
                                    <TouchableOpacity onPress={()=> { editPosition(item.id) }}>Edit</TouchableOpacity>
                                    <TouchableOpacity onPress={()=> { delPosition(item.id) }}>Delete</TouchableOpacity>
                                </View>  MINHA FUNÇÃO DEL E EDIT*/}
                                   
                            </Myiten>
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