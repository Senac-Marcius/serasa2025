import React, { useState } from 'react'; 
import { Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, View  } from 'react-native';
import MySelect from '../src/components/Myselect' 

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

    return (  //  *  sempre retornará um html.     * view com o "v" minúsculo é utilizado, apenas, no HTML puro.     * Para comentar no HYML, é necessário utilizar "{/* */}"
        <View>
            <MySelect style={{padding: 20}}>
                <></>
            </MySelect>

            

            <View style={styles.container}>

            <Text style={styles.title}>TELA DOS LOCAIS</Text>

                <View style={styles.row}>
                    <View style={styles.formContainer}>
                       
                        <TextInput 
                        placeholder= "Digite o nome do local:"                                 
                        value={req.name}
                        onChangeText={(t) => setReq({...req, name: t })}                    
                        />  

                        <TextInput 
                        placeholder= "Digite a área do local em metros:"
                        value={req.area}
                        onChangeText={(n) => setReq({...req, area: n })}                   
                        />                                                              
                        <TextInput 
                        placeholder= "Digite a sua descrição:"
                        value={req.description}
                        onChangeText={(t) => setReq({...req, description: t })}
                        /> 

                        <TextInput placeholder= "Digite o seu respectivo endereço:"
                        value={req.adress}
                        onChangeText={(t) => setReq({...req, adress: t })}
                        />

                        <Button title='Cadastrar' onPress={ handleRegister } />         

                    </View>
                                        
                    <FlatList                         
                        data={locals}                   
                        keyExtractor={(item) => item.id.toString()}                
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <Text style={styles.label} > {item.name} </Text>
                                <Text style={styles.label} > {item.adress} </Text>
                                <Text style={styles.label} > {item.area} </Text>
                                <Text style={styles.label} > {item.description} </Text>
                                <Text style={styles.label} > {item.createAt} </Text>
                            


                                <View style={styles.buttonsContainer}>
                                    <TouchableOpacity style={styles.edit} onPress={ () => {editLocal(item.id)} }>edit</TouchableOpacity>
                                    <TouchableOpacity style={styles.del} onPress={ () => (delLocal(item.id))}>del</TouchableOpacity>
                                </View>

                            </View>
                        ) }
                    />
                </View>    
            </View>  
        </View> 
        
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
        flex: 20,
        padding: 15,
        backgroundColor: '#F2F2F2',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',

    },
    formContainer: {
        flex: 5,
        marginRight: 50,
        padding: 25,
        backgroundColor: '#F2F2F2',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 7,
    },
    form: {
        flex: 6,
        marginRight: 15,
        padding: 50,
        backgroundColor: '#F2F2F2',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 7,
    },
    buttonsContainer: {
        flex: 100,
        padding: 50,
        backgroundColor: '#F2F2F2',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        
    },
    title:{
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: "green"
        
    },
    item:{

    },
    label:{
        color: "blue",
    }

}) 

