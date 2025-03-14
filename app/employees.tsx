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
        isActive: '',
        
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
    isActive: string,}[]>([])

        function handleRegister(){
            setEmployees([...employees,req])
            SetReq({
                id: req.id+1,
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
                createAt: '',
                isActive: '0',
                })
            
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
                    
                    <TextInput
                        placeholder='Nome:'
                        value={req.name}
                        onChangeText={(text) => SetReq({...req , name:text})}
                    />
                   
                    <TextInput
                        placeholder='Idade:'
                        value={req.datebirth}
                        onChangeText={(int) => SetReq({...req , datebirth:int})}
                    />
                    
                    <TextInput
                        placeholder='Telefone:'
                        value={req.tell}
                        onChangeText={(int) => SetReq({...req , tell:int})}
                    />
                    
                    <TextInput
                        placeholder='Email:'
                        value={req.email}
                        onChangeText={(text) => SetReq({...req , email:text})}
                    />
                    
                    <TextInput
                        placeholder='Endereço:'
                        value={req.address}
                        onChangeText={(text) => SetReq({...req , address:text})}
                    />
                    
                    <TextInput
                        placeholder='Nacionalidade:'
                        value={req.nationality}
                        onChangeText={(text) => SetReq({...req , nationality:text})}
                    />
                    
                    <TextInput
                        placeholder='Personalidade:'
                        value={req.discPersonality}
                        onChangeText={(text) => SetReq({...req , discPersonality:text})}
                    />
                    
                    <TextInput
                        placeholder='C.P.F:'
                        value={req.cpf}
                        onChangeText={(int) => SetReq({...req , cpf:int})}
                    />
                    
                    <TextInput
                        placeholder='Genêro:'
                        value={req.sex}
                        onChangeText={(text) => SetReq({...req , sex:text})}
                    />
                    
                    <TextInput
                        placeholder='Estado civil:'
                        value={req.martinalStatus}
                        onChangeText={(text) => SetReq({...req , martinalStatus:text})}
                    />
                    
                    <TextInput
                        placeholder='Cargo:'
                        value={req.position}
                        onChangeText={(text) => SetReq({...req , position:text})}
                    />
                    
                    <TextInput
                        placeholder='Etnia:'
                        value={req.ethnicity}
                        onChangeText={(text) => SetReq({...req , ethnicity:text})}
                    />
                    
                    <TextInput
                        placeholder='Deficiência:'
                        value={req.deficiency}
                        onChangeText={(text) => SetReq({...req , deficiency:text})}
                    />
                    
                    <TextInput
                        placeholder='Está ativo:'
                        value={req.isActive}
                        onChangeText={(text) => SetReq({...req , isActive:text})}
                    />
                   <Button title='Cadastrar Funcionário' color = '#800080'  onPress={() => handleRegister()}/>
                </View>
                
                
            </View>
            <FlatList
                data={employees}
                keyExtractor={(item)=> item.id.toString() }
                renderItem = {({item}) => {
                    return <View style={style.form}>
                    <Text>Nome:{item.name} / Cargo:{item.position}</Text>
                    <Text>{item.isActive}</Text>
                    </View>}}
            />
            
        </View>
    );

    
}
const style = StyleSheet.create({
    row: { 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        maxWidth: 300*9,  // Máximo de 300px
        maxHeight: 50*9,  // Máximo de 50px
    },
    form: {
        width: 700, 
        height: 500, 
        flex: 2,
        marginRight: 10,
        padding: 20,
        backgroundColor: '#D3D3D3',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
    },
    button:{
        flex: 1,
        marginRight: 10,
        marginHorizontal: 10,
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
    }     
})