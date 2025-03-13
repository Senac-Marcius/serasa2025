import React, {useState} from 'react';
import { View , Text, StyleSheet, FlatList, TextInput, Button } from 'react-native';

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


    return(
        <View>
            {/* aqui é typescript dentro da front*/}
            <Text>Hello world</Text>
            <View style={style.row}>
                <View style={style.form}>
                    <TextInput
                        placeholder='Pefril do likendin:'
                        value={req.urls}
                        onChangeText={(text) => SetReq({...req , urls:text})}
                    />
                    {req.urls}
                    <TextInput
                        placeholder='Nome:'
                        value={req.name}
                        onChangeText={(text) => SetReq({...req , name:text})}
                    />
                    {req.name}
                    <TextInput
                        placeholder='Idade:'
                        value={req.datebirth}
                        onChangeText={(int) => SetReq({...req , datebirth:int})}
                    />
                    {req.datebirth}
                    <TextInput
                        placeholder='Telefone:'
                        value={req.tell}
                        onChangeText={(int) => SetReq({...req , tell:int})}
                    />
                    {req.tell}
                    <TextInput
                        placeholder='Email:'
                        value={req.email}
                        onChangeText={(text) => SetReq({...req , email:text})}
                    />
                    {req.email}
                    <TextInput
                        placeholder='Endereço:'
                        value={req.address}
                        onChangeText={(text) => SetReq({...req , address:text})}
                    />
                    {req.address}
                    <TextInput
                        placeholder='Nacionalidade:'
                        value={req.nationality}
                        onChangeText={(text) => SetReq({...req , nationality:text})}
                    />
                    {req.nationality}
                    <TextInput
                        placeholder='Personalidade:'
                        value={req.discPersonality}
                        onChangeText={(text) => SetReq({...req , discPersonality:text})}
                    />
                    {req.discPersonality}
                    <TextInput
                        placeholder='C.P.F:'
                        value={req.cpf}
                        onChangeText={(int) => SetReq({...req , cpf:int})}
                    />
                    {req.cpf}
                    <TextInput
                        placeholder='Genêro:'
                        value={req.sex}
                        onChangeText={(text) => SetReq({...req , sex:text})}
                    />
                    {req.sex}
                    <TextInput
                        placeholder='Estado civil:'
                        value={req.martinalStatus}
                        onChangeText={(text) => SetReq({...req , martinalStatus:text})}
                    />
                    {req.martinalStatus}
                    <TextInput
                        placeholder='Cargo:'
                        value={req.position}
                        onChangeText={(text) => SetReq({...req , position:text})}
                    />
                    {req.position}
                    <TextInput
                        placeholder='Etnia:'
                        value={req.ethnicity}
                        onChangeText={(text) => SetReq({...req , ethnicity:text})}
                    />
                    {req.ethnicity}
                    <TextInput
                        placeholder='Deficiência:'
                        value={req.deficiency}
                        onChangeText={(text) => SetReq({...req , deficiency:text})}
                    />
                    {req.deficiency}
                    <TextInput
                        placeholder='Está ativo:'
                        value={req.isActive}
                        onChangeText={(bool) => SetReq({...req , isActive:bool})}
                    />
                    {req.isActive}
                </View>
                <View style ={style.button}>
                    <Button title='Cadastrar Funcionário' color = '#800080'  onPress={() => handleRegister}/>
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