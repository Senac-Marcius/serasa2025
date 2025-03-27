import React, {useState} from 'react';
import { ScrollView, View } from 'react-native';
import { Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Button } from 'react-native';
import MyTimePicker  from '../src/components/MyTimePicker'
import MyButton from '../src/components/Mybuttons';
import MyView from '../src/components/MyView';
import Myiten from '../src/components/myItenlist';
import MyList from '../src/components/mylist';
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
        isActive: ''
        
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
                isActive: '',
                })
            
        }
        function editEmployee(id:number){
            let employee = employees.find(e => e.id == id)
            if(employee)SetReq(employee)
        }
        function deleteEmployee(id:number){
            const list = employees.filter(e=> e.id != id)
            if(list) setEmployees(list);
            
    
        }

    

    return(
    <ScrollView>
        <MyView>
            {/* aqui é typescript dentro da front*/}
            <Text>Cadastro de Funcionários</Text>
            
            <View style={style.row}>
                <View style={style.form}>
                    <Text style={style.label}>Perfil do likendin:</Text>
                    <TextInput
                        style={style.inputs}
                        placeholder='insira uma url valida'
                        value={req.urls}
                        onChangeText={(text) => SetReq({...req , urls:text})}
                    />
                    <Text style={style.label}>Nome:</Text>
                    <TextInput
                        style={style.inputs}
                        placeholder='Digite seu nome'
                        value={req.name}
                        onChangeText={(text) => SetReq({...req , name:text})}
                    />
                    <Text style={style.label}>Data de Nascimento:</Text>
                    <TextInput
                        style={style.inputs}
                        placeholder='Insira a data ANO/MES/DIA'
                        value={req.datebirth}
                        onChangeText={(int) => SetReq({...req , datebirth:int})}
                    />
                    <Text style={style.label}>Telefone:</Text>
                    <TextInput
                        style={style.inputs}
                        placeholder='(XX) XXXXX-XXXX'
                        value={req.tell}
                        onChangeText={(int) => SetReq({...req , tell:int})}
                    />
                    <Text style={style.label}>Telefone:</Text>
                    <TextInput
                        style={style.inputs}
                        placeholder='Email:'
                        value={req.email}
                        onChangeText={(text) => SetReq({...req , email:text})}
                    />
                    <Text style={style.label}>Endereço/Cep:</Text>
                    <TextInput
                        style={style.inputs}
                        placeholder='Endereço:'
                        value={req.address}
                        onChangeText={(text) => SetReq({...req , address:text})}
                    />
                    <Text style={style.label}>Nacionalidade:</Text>
                    <TextInput
                        style={style.inputs}
                        placeholder='Nacionalidade:'
                        value={req.nationality}
                        onChangeText={(text) => SetReq({...req , nationality:text})}
                    />
                    <Text style={style.label}>Personalidade:</Text>
                    <TextInput
                        style={style.inputs}
                        placeholder='Personalidade:'
                        value={req.discPersonality}
                        onChangeText={(text) => SetReq({...req , discPersonality:text})}
                    />
                    <Text style={style.label}>C.P.F:</Text>
                    <TextInput
                        style={style.inputs}
                        placeholder='C.P.F:'
                        value={req.cpf}
                        onChangeText={(int) => SetReq({...req , cpf:int})}
                    />
                    <Text style={style.label}>Genêro:</Text>
                    <TextInput
                        style={style.inputs}
                        placeholder='Genêro:'
                        value={req.sex}
                        onChangeText={(text) => SetReq({...req , sex:text})}
                    />
                    <Text style={style.label}>Estado civil:</Text>
                    <TextInput
                        style={style.inputs}
                        placeholder='Estado civil:'
                        value={req.martinalStatus}
                        onChangeText={(text) => SetReq({...req , martinalStatus:text})}
                    />
                    <Text style={style.label}>Cargo:</Text>
                    <TextInput
                        style={style.inputs}
                        placeholder='Cargo:'
                        value={req.position}
                        onChangeText={(text) => SetReq({...req , position:text})}
                    />
                    <Text style={style.label}>Etnia:</Text>
                    <TextInput
                        style={style.inputs}
                        placeholder='Etnia:'
                        value={req.ethnicity}
                        onChangeText={(text) => SetReq({...req , ethnicity:text})}
                    />
                    <Text style={style.label}>Deficiência:</Text>
                    <TextInput
                        style={style.inputs}    
                        placeholder='Deficiência:'
                        value={req.deficiency}
                        onChangeText={(text) => SetReq({...req , deficiency:text})}
                    />
                    <Text style={style.label}>Está ativo:</Text>
                    <MyTimePicker 
                        onTimeSelected={(time) => SetReq({ ...req, isActive: time })}
                        initialTime={req.isActive}
                    />

                    
                   <MyButton title='Cadastrar Funcionário' button_type ='round'  onPress={handleRegister}/>
                </View>
                
                
                <MyList
                    data={employees}
                    keyItem={(item)=> item.id.toString() }
                    renderItem = {({item}) => (
                
                        <Myiten style={style.itemText}
                         onDel={() => {deleteEmployee(item.id)}}
                         onEdit={() => {editEmployee(item.id)}}
                        >
                        Nome:{item.name} / Cargo:{item.position}
                        ativo desde de:{item.isActive}
                        </Myiten>
                    )}
                />
                
            </View>      
        </MyView>
        </ScrollView>
        
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
    },
    inputContainer: {
        marginBottom: 15, // Espaço entre os campos
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5, // Espaço entre o nome do campo e o input
        color: '#333', // Cor escura para o texto
    },
    inputs: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    }     
})