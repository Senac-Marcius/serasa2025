import React, {useState, useEffect} from "react";
import{View,Text, StyleSheet} from "react-native";
import MyView from "../src/components/MyView";
import MyList from "../src/components/MyList";
import {MyItem} from "../src/components/MyItem";
import { Myinput } from "../src/components/MyInputs";
import MyButton from "../src/components/MyButtons";
import { useRouter } from 'expo-router';
import MyTimePicker from "../src/components/MyTimerPiker";
import {setPosition, deletePosition, updatePosition, iPosition} from "../src/controllers/positions";
import {supabase} from '../src/utils/supabase';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";


export default function PositionScreen(){
/*Aqui é TypeScript*/
    const [positions, setPositions] = useState<iPosition[]>([]);
    const[req, setReq] = useState({
        id: -1,
        name:"",
        description:"",
        salary: 0,
        work_hours: "",
        departament:"",
        supervisor:"",
        creat_at: new Date().toISOString(),    
    });

   

    useEffect(() => {
        (async () => {
            const { data: todos } = await supabase.from("positions").select()

            if(todos && todos.length > 0){
                setPositions(todos);
            }
        }) ();
    }, [])

    async function handleRegister() {
        if (req.id === -1) {
          const newId = positions.length ? positions[positions.length - 1].id + 1 : 0;
          const newPosition = { ...req, id: newId };
      
          const result = await setPosition(newPosition);
          if (result) setPositions([...positions, newPosition]);
        } else {
          const updated = await updatePosition(req);
          if (updated) {
            setPositions(positions.map(p => (p.id === req.id ? req : p)));
          }
        }
      
        setReq({
          id: -1,
          name: "",
          description: "",
          salary: 0,
          work_hours: "",
          departament: "",
          supervisor: "",
          creat_at: new Date().toISOString()
        });
      }
      

    async function editPosition (id:number){
        const position = positions.find(p => p.id == id)
        if(position)
            setReq(position)

    }

    async function delPosition(id: number) {
        const success = await deletePosition(id);
        if (success) {
          const list = positions.filter(p => p.id !== id);
          setPositions(list);
        }
      }
      
    
    const router = useRouter();
    

    return (
        <MyView style={{flex: 1}} title="Cargos" router={router}>
            {/*Aqui é TypeScript dentro do front*/}
            <Text></Text>
            <View style = {styles.row}>
                <View style = {styles.form}>
                    <Myinput
                        label="Cargo"
                        placeholder="Insira um Cargo"
                        iconName="briefcase"
                        value = {req.name}
                        onChangeText={(text)=> setReq({...req ,name: text })}/>
 
                    <Myinput 
                        label="Descrição"
                        placeholder="Insira uma descrição"
                        iconName="briefcase"
                        value = {req.description}
                        onChangeText={(text)=> setReq({...req ,description: text })}/>

                    <Myinput 
                        label="Salário"
                        placeholder="Insira o salário"
                        iconName="briefcase"
                        value = {(req.salary).toString()}
                        onChangeText={(text)=> setReq({...req ,salary: Number(text) })}/> 

                    <MyTimePicker 
                    onTimeSelected={(time) => setReq({ ...req, work_hours: time })}
                    initialTime={req.work_hours}
                    />

                    <Myinput 
                        label="Departamento"
                        placeholder="Insira um departamento"
                        iconName="briefcase"
                        value = {req.departament}
                        onChangeText={(text)=> setReq({...req ,departament: text })}/>

                    <Myinput 
                        label="Supervisor"
                        placeholder="Insira um supervisor"
                        iconName="briefcase"
                        value = {req.supervisor}
                        onChangeText={(text)=> setReq({...req ,supervisor: text })}/>

                  

                    <MyButton  title = "Cadastrar" onPress={handleRegister}/>
                </View> 
                    <MyList
                        data = {positions}
                        keyItem = {(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <MyItem style={styles.card}
                                onEdit={() => editPosition(item.id)}
                                onDel={() => delPosition(item.id)}>
                                <Text>{item.name}</Text>
                                <Text>{item.description}</Text>
                                <Text>{item.salary}</Text>
                                <Text>{item.work_hours}</Text>
                                <Text>{item.departament}</Text>
                                <Text>{item.supervisor}</Text>
                                <Text>{item.creat_at}</Text>

                                {/*<View style = {styles.buttonsContanier}>
                                    <TouchableOpacity onPress={()=> { editPosition(item.id) }}>Edit</TouchableOpacity>
                                    <TouchableOpacity onPress={()=> { delPosition(item.id) }}>Delete</TouchableOpacity>
                                </View>  MINHA FUNÇÃO DEL E EDIT*/}
                                   
                            </MyItem>
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