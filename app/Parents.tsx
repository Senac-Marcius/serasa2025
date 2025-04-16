import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList,TouchableOpacity} from 'react-native';
import MyView from '../src/components/MyView';
import { useRouter } from 'expo-router';
import { setParent,iParent,delParent,editParent,getTimeParents,toListparent} from '../src/controllers/parents';
import MyButton from '../src/components/MyButtons';
import MyList from '../src/components/MyList';
import { Myinput, MyCheck, MyTextArea} from '../src/components/MyInputs';
import { MyItem,MyCorrelated } from '../src/components/MyItem';
import { supabase } from '../src/utils/supabase';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import itemScreen from './itens';
import { ListItem } from 'native-base';
import MyUpload from '../src/components/MyUpload';



//import dateTimepicker
//npm run web → chamar pagina web pelo terminal
//batatinha
export default function ParentScreen (){
    const [parents,setParents] = useState<iParent[]>([])

    const [req, setReq] = useState({
        id:-1,
        name: '',
        rg: '',
        cpf:'',
        age:'',
        phone:'',
        email:'',
        kinship:'',
        createat: new Date().toISOString(),
        userid: 0,

    });
   
    useEffect(() => {
        async function getTodos(){
            const retorno = await getTimeParents ({})
        
            if(retorno.status && retorno.data && retorno.data.length > 0){
                setParents(retorno.data)
            }

        }

        getTodos();

    })

    async function handleRegister() {

        if (req.id === -1) {
            const newId = parents.length ? parents[parents.length - 1].id + 1 : 0;
            const newParent = { ...req, id: newId };
            setParents([...parents, newParent]);
            const resp = await setParent(newParent);
            console.log (resp)
        } else {
                
            setParents(parents.map(p => (p.id == req.id ? req : p)));
            await editParent(req)
        }

        //setParents([...parents, req])
        setReq({
            id:-1,
            name: '',
            rg:'',
            cpf:'',
            age:'',
            phone:'',
            email:'',
            kinship:'',
            createat: new Date().toISOString(),
            userid: 0,
        })
    }

    async function delParentL(id: number) {
        const error = await delParent (id)
        if (!error) {
            const list = parents.filter(r => r.id != id)
            setParents(list)
        } else {
            console.error('Erro ao deletar:', error);
        }
    }
    
    function editParentL(id: number) {
        const parent = parents.find(r => r.id === id);
        if (parent) {
            setReq(parent);
        }
    }
        
    
    const router = useRouter();
    const[urlDocument, setDocument]= useState('')

    

    return (
        <MyView> {/*aqui é typeScript dentro do Front*/}
            {/*View → esse view é diferente do HTML ele contém DIVs e outros atributos,*/}
            <View style = {styles.row}>
                <View style={styles.form}>{/*View no Type pode ser usado para substituir o Form */}
                {/*<FlatList/> → atibuto para possivel criação de lista */}
                    <Myinput 
                        label="Nome"
                        iconName="badge"
                        placeholder="Nome:"
                        value={req.name}
                        onChangeText={(Text) => setReq({...req, name: Text})}
                    />
                    <Myinput 
                        label="Rg"
                        iconName="badge"
                        placeholder="RG:"
                        value={req.rg}
                        onChangeText={(Text) => setReq({...req, rg: Text})}
                    />
                    <Myinput 
                        label="cpf"
                        iconName="badge" 
                        placeholder="CPF:"
                        value={req.cpf}
                        onChangeText={(Text) => setReq({...req, cpf: Text})}
                    />
                    <Myinput 
                        label="age"
                        iconName="badge"
                        placeholder="Idade:"
                        value={req.age}
                        onChangeText={(Text) => setReq({...req, age: Text})}
                    />
                    <Myinput 
                        label="phone"
                        iconName="badge"
                        placeholder="Telefone:"
                        value={req.phone}
                        onChangeText={(Text) => setReq({...req, phone: Text})}
                    />
                    <Myinput 
                        label="email"
                        iconName="badge"
                        placeholder="Email:"
                        value={req.email}
                        onChangeText={(Text) => setReq({...req, email: Text})}
                    />
                    <Myinput 
                        label="kinship"
                        iconName="badge"
                        placeholder="Parentesco:"
                        value={req.kinship}
                        onChangeText={(Text) => setReq({...req, kinship: Text})}
                    />
                
                    <MyButton
                        title='Cadastrar'
                        onPress={handleRegister}
                        button_type='round'
                        style={styles.button_round}/>
                   {/*foi aberto uma area de codigo chamar a variavel, equivale o inder do html*/}
                   {/*<Button 
                        title='Editar'
                        color='red'
                        onPress={editParent}/>
                    <Button
                        title='Deletar'
                        color='red'
                        onPress={delParent}/>*/}
                        <MyUpload setUrl={setDocument} url={urlDocument}/>
                </View>
                

                <MyList
                    data={parents}
                    keyItem={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <MyItem 
                            style={styles.parentsItem}
                            onDel={()=> {delParentL(item.id)}}
                            onEdit={()=> {editParentL(item.id)}}
                        >
                            <Text>{item.id}</Text>
                            <Text>{item.name}</Text>
                            <Text>{item.rg}</Text>
                            <Text>{item.cpf}</Text>
                            <Text>{item.age}</Text>
                            <Text>{item.phone}</Text>
                            <Text>{item.email}</Text>
                            <Text>{item.kinship}</Text>
                            <Text>{item.createat}</Text>
                            <Text>{item.userid}</Text>
                        </MyItem>
                    )}
                />
                {/*parâmetro FlatList é parecido com o forEach do html */}
                
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
        display:"flex",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        
      },
})