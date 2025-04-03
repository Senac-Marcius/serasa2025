import React, {useState} from 'react';
import { ScrollView, View } from 'react-native';
import { Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Button } from 'react-native';
import MyTimerPicker  from '../src/components/MyTimerPiker'
import MyButton from '../src/components/MyButtons';
import MyView from '../src/components/MyView';
import {MyItem} from '../src/components/MyItem';
import MyList from '../src/components/MyList';
import { Myinput,MyCheck } from '../src/components/MyInputs';
import { useRouter } from 'expo-router';


export default function EmployeeScreen(){
//aqui é typescript 
    const [req, SetReq] = useState({
        id:0,
        urls:'',
        name:'',
        datebirth:'',
        tell:'',
        email:'',
        address:'',
        nationality:'',
        discPersonality:'',
        cpf:'',
        sex:'',
        martinalStatus:'',
        position:'',
        ethnicity:'',
        deficiency:'',
        createAt: new Date().toISOString(),
        isActive: false,
        
    });
    const [employees, setEmployees]= useState<{
        id: number,
        urls: string,
        name: string,
        datebirth: string,
        tell: string,
        email: string,
        address: string,
        nationality: string,
        discPersonality: string,
        cpf: string,
        sex: string,
        martinalStatus: string,
        position: string,
        ethnicity: string,
        deficiency: string,
        createAt: string,
        isActive: boolean,}[]>([])

        function handleRegister(){
            setEmployees([...employees,req])
            
        }

        const router = useRouter();


    return(
        <View>
            {/* aqui é typescript dentro da front*/}
            <Text>Hello world</Text>
            <View style={style.row}>
                <View style={style.form}>
                    
                    
                   <MyButton title='Cadastrar Funcionário' button_type ='round'  onPress={handleRegister}/>
                </View>
                

            </View>
        </View>
    );

    
}
const style = StyleSheet.create({
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
    button:{
        flex: 1,
        marginRight: 10,
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
    }     
})