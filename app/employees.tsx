import React, {useState} from 'react';
import { View , Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Button } from 'react-native';

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
            if(req.id == -1){
                const newId = employees.length ? employees[employees.length - 1].id + 1:0
                const  newEmployee = {...req , id:newId}
                setEmployees([...employees,newEmployee])
            }else{
                setEmployees(employees.map(e =>(e.id == req.id ? req:e)))
            }
            SetReq({
                id: -1,
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
        function editEmployee(id:number){
            let employee = employees.find(e => e.id == id)
            if(employee)
                SetReq(employee)
        }
        function deleteEmployee(id:number){
            const list = employees.filter(e=> e.id != id)
            if(list)
                setEmployees(list)
    
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
                   <Button title='Cadastrar Funcionário' color = '#800080'  onPress={handleRegister}/>
                </View>
                
                
            </View>
            <FlatList
                data={employees}
                keyExtractor={(item)=> item.id.toString() }
                renderItem = {({item}) => {
                    return <View style={style.itemContainer}>
                    <Text style={style.itemText}>Nome:{item.name} / Cargo:{item.position}</Text>
                    <Text style={style.itemText}>{item.isActive}</Text>

                    <View style={style.buttonsContainer}>
                                <TouchableOpacity style={style.deleteButton} onPress={() => {deleteEmployee(item.id)}}>
                                <Text style={style.buttonText}>X</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={style.editButton} onPress={() => {editEmployee(item.id)}}>
                                <Text style={style.buttonText}>Edit</Text>

                                </TouchableOpacity>

                    </View>

                    </View>
                    }}
            />
            
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
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        marginLeft: 50,
        marginTop: 50,

    },


    itemContainer: {
        padding: 15,
        marginBottom: 5,
        borderRadius: 30,
        backgroundColor: 'white',
        borderColor: 'purple',
        borderWidth: 0.1,
        shadowColor: 'purple',
        shadowOffset: { width: 1, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 50,
        width: 500

    },

    itemText: {
        color: 'black',
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 30,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingLeft: 10,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },

    buttonsContainer: {
        flexDirection: 'row',
        gap: 20
    },

    deleteButton: {
        backgroundColor: 'red', // Cor do botão de editar
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30, // Bordas arredondadas
        marginBottom: 10,
        alignItems: 'center',
    },

    editButton: {
        backgroundColor: '#281259', // Cor do botão de editar
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30, // Bordas arredondadas
        marginBottom: 10,
        alignItems: 'center',

    },
    buttonText: {
        color: '#fff', // Texto branco
        fontSize: 16,
        fontWeight: 'bold',
    }     
})