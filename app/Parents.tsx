import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList,TouchableOpacity} from 'react-native';
import MyView from '../src/components/MyView';
import MyUpload from '../src/components/MyUpload';
import { useRouter } from 'expo-router';
import{parents, setParentController, setParents} from '../src/controllers/parentsController';
import MyButton from '../src/components/MyButtons';
import MyList from '../src/components/MyList';
import { Myinput, MyCheck, MyTextArea } from '../src/components/MyInputs';
import { MyItem,MyCorrelated } from '../src/components/MyItem';
import MyMenu from '../src/components/MyButtons';


//import dateTimepicker
//npm run web → chamar pagina web pelo terminal
//batatinha
export default function ParentScreen (){
//Aqui é TypeScript
    const [req, setReq] = useState({
        id:0,
        name: '',
        rg:'',
        cpf:'',
        age:'',
        phone:'',
        e_mail:'',
        kinship:'',
        create_at: new Date().toDateString(),
        user_id: 0,

    });
    


    /*Dados movidos para o controlador ↓↓↓
        const [parents,setParents] = useState<{
        Nome: string,
        Email: string,
        parentesco: string,
        id: number,
        createAt: string,
        userId: number,
    
    }[]>([])/* <> → usado para tipar uma função */
    /*Dados movidos para o controlador ↑↑↑*/

    function handleRegister() {
        if(req.id == -1){
            const newId = parents.length ? parents [parents.length -1].id +1 : 0;
            const newParent = {...req, id: newId}
            setParents([...parents, newParent])
            setParentController(newParent)
        }else{
            setParents(parents.map( p =>(p.id == req.id ? req : p)))
        }

        //setParents([...parents, req])
        setReq({
            id:-1,
            name: '',
            rg:'',
            cpf:'',
            age:'',
            phone:'',
            e_mail:'',
            kinship:'',
            create_at: new Date().toDateString(),
            user_id: 0,
        })
    }
     function editParent(id:number){
        const parent = parents.find (p => p.id == id)
        if(parent)
            setReq(parent)
     }
     function delParent(id:number){
        const list = parents.filter (p=> p.id != id)
        if (list)
            setParents(list)
     }
    
    const router = useRouter();
    const[urlDocument, setDocument]= useState('')

    return (
        <MyView router={router} > {/*aqui é typeScript dentro do Front*/}
            {/*View → esse view é diferente do HTML ele contém DIVs e outros atributos,*/}
            
            <View style = {styles.row}>
                <View style={styles.form}>{/*View no Type pode ser usado para substituir o Form */}
                {/*<FlatList/> → atibuto para possivel criação de lista */}
                    <Myinput 
                        placeholder="Digite"
                        value={req.name}
                        onChangeText={(text) => setReq({ ...req, name: text })}
                        label='Nome do Aluno:'
                        iconName='person'
            
                    />
                    <Myinput
                        placeholder="Digite"
                        value={req.e_mail}
                        onChangeText={(text) => setReq({ ...req, e_mail: text })}
                        label='Email:'
                        iconName='person'
                    />
                    <Myinput
                        placeholder="Digite"
                        value={req.kinship}
                        onChangeText={(text) => setReq({ ...req, kinship: text })}
                        label='Parentesco:'
                        iconName='person'
                    />
                
                    <MyButton
                        title="CADASTRAR"
                        onPress={handleRegister}
                        button_type="round"
                        style={styles.button_round}
                    />
                   {/*foi aberto uma area de codigo chamar a variavel, equivale o inder do html*/}
                   {/*<Button 
                        title='Editar'
                        color='red'
                        onPress={editParent}/>
                    <Button
                        title='Deletar'
                        color='red'
                        onPress={delParent}/>*/}
                    <View>
                        <MyUpload setUrl={setDocument} url={urlDocument}/>
                    </View>
                </View>
                

                <FlatList
                    data={parents}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <View style={styles.parentsItem}>

                            <Text>{item.id}</Text>
                            <Text>{item.name}</Text>
                            <Text>{item.rg}</Text>
                            <Text>{item.cpf}</Text>
                            <Text>{item.age}</Text>
                            <Text>{item.phone}</Text>
                            <Text>{item.e_mail}</Text>
                            <Text>{item.kinship}</Text>
                            <Text>{item.create_at}</Text>
                            <Text>{item.user_id}</Text>
                                <View style ={styles.buttonContainer}>
                                    <TouchableOpacity onPress={()=> {editParent(item.id)}}>EDIT</TouchableOpacity>
                                    <TouchableOpacity onPress={()=> {delParent(item.id)}}>DELETE</TouchableOpacity>
                                </View>
                        </View>
                    )}
                />
                {/*parâmetro FlatList é parecido com o forEach do html. */}
                
            </View>

        </MyView>
        
    );
}

// smepre que for criado um objeto deve-se adicionar o mesmo no Import
const styles = StyleSheet.create({/*StyleSheet é um atributo que permite criar estilos personalizados */
    row: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
    },
    form: {
        flex: 1,
        marginRight: 20,
        marginLeft:20,
        padding: 20,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
    },
    parentsItem: {
        flex: 1,
        marginRight: 20,
        marginLeft:20,
        marginBottom:20,
        padding: 30,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
    },
    buttonContainer: {
        flexDirection:'row',
        alignItems: 'center',
        gap: 20,
        alignContent: 'space-around'
    },
    button_round: {
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 10,
    },
})