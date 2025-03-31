import React, { useState } from 'react'; 
import { Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, View  } from 'react-native';
import MySelect from '../src/components/Myselect' 
import MyView from '../src/components/MyView';
import MyList from '../src/components/mylist';
import Myiten from '../src/components/myItenlist';
import { Myinput, MyCheck, MyTextArea } from '../src/components/Myinputs';

export default function LocalScreen(){

    //onde vou criar a variavel do useState:            é const pq a usestate so aceita const
    const [req, setReq] = useState({
    
        id: -1,
        name: '',
        area: '',
        description: '', 
        adress:'',
        createAt: new Date().toISOString(),
    });      

    const [locals, setLocals] = useState<{
        id: number,
        name: string,
        area: string,
        description: string,
        adress: string,
        createAt: string,
    }[]>([])        //  '< >' -> recebe um tipo. torna-se tipada   -> 

    function handleRegister(){
        if(req.id == -1){
            const newId = locals.length ? locals[locals.length - 1].id + 1 : 0;
            const newLocal = { ...req, id: newId };

            setLocals([...locals, newLocal]);
        }else{
             
            setLocals(locals.map(l => (l.id == req.id) ? req : l));          //map = for it, percorre a lista
        }
        setReq({ 
            id: -1,
            name: '',
            area: '',
            description: '', 
            adress:'',
            createAt: new Date().toISOString(),

        })
    }

    function editLocal(id:number){
        const local = locals.find(l => l.id == id)
        if(local)
            setReq(local) 
    }

    function delLocal(id:number){
        const list = locals.filter(l => l.id != id)
        if(list)
            setLocals(list)           
    }

    const [unity, setUnit] = useState("metros")              /* exemplo do código de SELECT para copiar */
    

    return (

            <MyView style={styles.container}>

            

                <View style={styles.row}>
                    <View style={styles.formContainer}>
                        <Text style={styles.title}>LOCAL</Text>
                       
                        <Myinput
                        iconName='name'
                        placeholder= "Digite o nome do local:"                                 
                        value={req.name}
                          label='Nome:'
                        onChangeText={(t) => setReq({...req, name: t })}                    
                        />                                                                     
                                                                                                        
                        <Myinput
                        iconName='wolrd'
                        placeholder={ `Digite a sua dimensão em ${unity}:`}
                        value={req.area}
                        label='Dimensão:'
                        onChangeText={(n) => setReq({...req, area: n })}  
                                    
                        />
                      

                        <MySelect label={unity} setLabel={setUnit}  
                        list={            
                            [
                                {key:0, option: 'metros'},             /* exemplo do código de SELECT para copiar */
                                {key:1, option: 'cm'},
                            ]
                        } />  



                        <Myinput
                        iconName='description'
                        placeholder= "Digite a sua descrição:" 
                        value={req.description}
                          label='Descrição:'
                        onChangeText={(t) => setReq({...req, description: t })}
                        /> 

                        <Myinput 
                        iconName='adress'
                        placeholder= "Digite o seu endereço:"
                        value={req.adress}
                          label='Endereço:'
                        onChangeText={(t) => setReq({...req, adress: t })}
                        />

                        <Button title='Cadastrar' onPress={ handleRegister } />         

                    </View>

                    <MyList                         
                        data={locals}                   
                        keyItem={(item) => item.id.toString()}                
                        renderItem={({ item }) => (
                            <Myiten
                                style={styles.formContainer}
                                onEdit={ () => {editLocal(item.id)} }
                                onDel={ () => (delLocal(item.id))}
                            >
                                <Text style={styles.label} > {item.name} </Text>
                                <Text style={styles.label} > {item.adress} </Text>
                                <Text style={styles.label} > {item.area} </Text>
                                <Text style={styles.label} > {item.description} </Text>
                                <Text style={styles.label} > {item.createAt} </Text>
                            

                            </Myiten>
                        ) }
                    />

                </View>
                    
               
                                        
                   
                    
                         
            </MyView>  
       
        
    )   
}               

     

const styles = StyleSheet.create({            //ESTILIZAÇÃO: aqui convidamos funções que criam estilos para fontes

    edit: {
        flex: 5,
        marginRight: 15,
        padding: 10,
        backgroundColor: '#F2F2F2',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 8, height: 4 },
        shadowRadius: 7,
    },
     del: {
        flex: 5,
        marginRight: 15,
        padding: 10,
        backgroundColor: '#F2F2F2',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 8, height: 4 },
        shadowRadius: 7,
    },
    container: {
        flex: 1000,
        padding: 15,
        backgroundColor: "gray", 
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: "black",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
       
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: "white"

    },

    formContainer: {
        flex: 1,
        marginRight: 50,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 10,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 7,
        marginBottom: 10
    },
    input: {
        borderBottomWidth: 1,
        borderColor: "black",
        marginBottom: 10,
        paddingVertical: 4,
    },
    buttonsContainer: {
        flex: 100,
        padding: 50,
        backgroundColor: "white",
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        
    },
    buttonsTitle: {
        backgroundColor: "puple",
    },
    item:{

    },
    label:{
        color: "black",
    }

}) 

