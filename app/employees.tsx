import React, {useState, useEffect} from 'react';
import { ScrollView, View } from 'react-native';
import { Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Button } from 'react-native';
import MyTimePicker  from '../src/components/MyTimerPiker'
import MyButton from '../src/components/MyButtons';
import MyView from '../src/components/MyView';
import {MyItem} from '../src/components/MyItem';
import MyList from '../src/components/MyList';
import { Myinput,MyCheck } from '../src/components/MyInputs';
import { useRouter } from 'expo-router';
import { setEmployee,iEmployees,updateEmployee,dellEmployee } from '../src/controllers/employees';
import { supabase } from '../src/utils/supabase';


export default function EmployeeScreen(){
    const [employees, setEmployees] = useState<iEmployees[]>([])
    const router = useRouter();
//aqui é typescript 
    const [req, SetReq] = useState({
        id: -1,
        urls:'',
        name:'',
        date_birth:'',
        tell:'',
        email:'',
        address:'',
        nationality:'',
        disc_personality:'',
        cpf:'',
        sex:'',
        martinal_status:'',
        ethnicity:'',
        deficiency:'',
        created_at: new Date().toISOString(),
        is_active: '',
        user_id: 1,
        positions_id:1
        
    });

      useEffect(() => {
        
        (async () => {
          const { data: todos } = await supabase.from('employees').select()
          console.log(todos);
    
          if ( todos && todos.length > 0) {
            setEmployees(todos)
          }
        })();
      }, [])
   

       async function handleRegister(){
            if(req.id == -1){
                const newId = employees.length ? employees[employees.length - 1].id + 1:0
                const  newEmployee = {...req , id:newId}
                setEmployees([...employees,newEmployee])
                await setEmployee(newEmployee)
            }else{
                setEmployees(employees.map(e =>(e.id == req.id ? req:e))) 
                await updateEmployee(req.id,req);
                
                
            }
            SetReq({
                id: -1,
                urls:'',
                name:'',
                date_birth:'',
                tell:'',
                email:'',
                address:'',
                nationality:'',
                disc_personality:'',
                cpf:'',
                sex:'',
                martinal_status:'',
                ethnicity:'',
                deficiency:'',
                created_at: '',
                is_active: '',
                user_id : 1,
                positions_id:1
                })
            
        }
        async function editEmployee(id:number){
            let employee = employees.find(e => e.id == id)
            if(employee){
            SetReq(employee)
            }   
        }
        async function deleteEmployee(id:number){
            const list = employees.filter(e=> e.id != id)
            if(list){
                setEmployees(list);
                await dellEmployee(id)
            } 
            
    
        }

    

    return(
        <MyView router={router}>
            {/* aqui é typescript dentro da front*/}
            <Text>Cadastro de Funcionários</Text>
            
            <View style={style.row}>
                <View  style={style.form}>
                    <Myinput
                        value={req.urls}
                        onChangeText={(text) => SetReq({...req , urls:text})}
                        placeholder='insira uma url valida'
                        label='Perfil do likendin:'
                        iconName = 'link'
                    />
                    <Myinput
                        label = 'Nome:'
                        placeholder='Digite seu nome'
                        value={req.name}
                        iconName='badge'
                        onChangeText={(text) => SetReq({...req , name:text})}
                    />
                    <Myinput
                        label = 'Data de Nascimento:'
                        iconName='event'
                        placeholder='Insira a data ANO/MES/DIA'
                        value={req.date_birth}
                        onChangeText={(int) => SetReq({...req , date_birth:int})}
                    />
                    <Myinput
                        label='Telefone:'
                        iconName='call'
                        placeholder='(XX) XXXXX-XXXX'
                        value={req.tell}
                        onChangeText={(int) => SetReq({...req , tell:int})}
                    />
                    <Myinput
                        placeholder='Email:'
                        iconName='email'
                        label='Email:'
                        value={req.email}
                        onChangeText={(text) => SetReq({...req , email:text})}
                    />
                    <Myinput
                        label='Endereço:'
                        iconName='home'
                        placeholder='Endereço:'
                        value={req.address}
                        onChangeText={(text) => SetReq({...req , address:text})}
                    />
                    <Myinput
                        label='Nacionalidade:'
                        iconName='person'
                        placeholder='Nacionalidade:'
                        value={req.nationality}
                        onChangeText={(text) => SetReq({...req , nationality:text})}
                    />
                    <Myinput
                        label='Personalidade:'
                        iconName='stack'
                        placeholder='Personalidade:'
                        value={req.disc_personality}
                        onChangeText={(text) => SetReq({...req , disc_personality:text})}
                    />
                    <Myinput
                        label='C.P.F:'
                        iconName='badge'
                        placeholder='XXX-XXX-XXX-XX'
                        value={req.cpf}
                        onChangeText={(int) => SetReq({...req , cpf:int})}
                    />
                    <Myinput
                        label='Gênero:'
                        iconName='badge'
                        placeholder='Insira seu gênero'
                        value={req.sex}
                        onChangeText={(text) => SetReq({...req , sex:text})}
                    />
                    <Myinput
                        label='Estado Civil:'
                        iconName='favorite'
                        placeholder='Estado civil:'
                        value={req.martinal_status}
                        onChangeText={(text) => SetReq({...req , martinal_status:text})}
                    />
                    <Myinput
                        label='Etnia'
                        iconName='face'
                        placeholder='Insira a etnia'
                        value={req.ethnicity}
                        onChangeText={(text) => SetReq({...req , ethnicity:text})}
                    />
                    <Myinput
                        label='Deficiência:'
                        iconName='diversity'    
                        placeholder='Insira algo'
                        value={req.deficiency}
                        onChangeText={(text) => SetReq({...req , deficiency:text})}
                    />
                    <MyTimePicker 
                        onTimeSelected={(time) => SetReq({ ...req, is_active: time.toString() })}
                        initialTime={req.is_active}
                    />

                    
                   <MyButton title='Cadastrar Funcionário' button_type ='round'  onPress={handleRegister}/>
                </View>
                
                
                <MyList
                    data={employees}
                    keyItem={(item)=> item.id.toString() }
                    renderItem = {({item}) => (
                
                        <MyItem style={style.itemText}
                         onDel={() => {deleteEmployee(item.id)}}
                         onEdit={() => {editEmployee(item.id)}}
                        >
                        Nome:{item.name} / Cargo:{item.positions_id}
                        ativo desde de:{item.is_active}
                        </MyItem>
                    )}
                />
                
            </View>      
        </MyView>
       
        
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
});