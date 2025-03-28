import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList,TouchableOpacity} from 'react-native';
import styled from 'styled-components'
//import dateTimepicker
//npm run web → chamar pagina web pelo terminal
//batatinha
import MyUpload from '../src/components/Myupload'
import { color } from 'native-base/lib/typescript/theme/styled-system';
export default function ParentScreen (){
//Aqui é TypeScript
    const [req, setReq] = useState({
        id:0,
        Nome: '',
        rg:'',
        cpf:'',
        phone:'',
        Email:'',
        parentesco:'',
        createAt: new Date().toISOString(),
        userId: 0,

    });

    const [parents,setParents] = useState<{
        id: number,
        Nome: string,
        rg:string,
        cpf:string,
        phone:string,
        Email: string,
        parentesco: string,
        createAt: string,
        userId: number,
    
    }[]>([])/* <> → usado para tipar uma função */

    function handleRegister() {
        if(req.id == -1){
            const newId = parents.length ? parents [parents.length -1].id +1 : 0;
            const newParents = {...req, id:newId}

            setParents([...parents, newParents])
        }else{
            setParents(parents.map(p =>(p.id == req.id?req:p)))
        }

        //setParents([...parents, req])
        setReq({
            id:-1,
            Nome: '',
            rg:'',
            cpf:'',
            phone:'',
            Email:'',
            parentesco:'',
            createAt: new Date().toISOString(),
            userId: 0,
             
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
    

    const[urlDocument, setDocument] = useState('')
    
    return (
        <View>{/*aqui é typeScript dentro do Front*/}
          {/*View → esse view é diferente do HTML ele contém DIVs e outros atributos,*/}  
          
            <Text>Minha tela das postagens </Text>
            <View style = {styles.row}>
                <View style={styles.form}>{/*View no Type pode ser usado para substituir o Form */}
                {/*<FlatList/> → atibuto para possivel criação de lista */}
                    <TextInput 
                        placeholder="Nome:"
                        value={req.Nome}
                        onChangeText={(Text) => setReq({...req, Nome: Text})}
                    />
                    <TextInput
                        placeholder="RG:"
                        value={req.rg}
                        onChangeText={(Text) => setReq({...req, rg: Text})}
                    />
                    <TextInput
                        placeholder="CPF:"
                        value={req.cpf}
                        onChangeText={(Text) => setReq({...req, cpf: Text})}
                    />
                    <TextInput
                        placeholder="Phone:"
                        value={req.phone}
                        onChangeText={(Text) => setReq({...req, phone: Text})}
                    />

                    <TextInput
                        placeholder="Email:"
                        value={req.Email}
                        onChangeText={(Text) => setReq({...req, Email: Text})}
                    />

                    <TextInput
                        placeholder="Parentesco:"
                        value={req.parentesco}
                        onChangeText={(Text) => setReq({...req, parentesco: Text})}
                    />
                    
                    <Button 
                        title='Cadastrar' 
                        color='blue'
                        onPress={handleRegister}/>
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

                <FlatList
                    data={parents}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <View style={styles.parentsItem}>
                            <Text style={styles.itemText}>Id: {item.id}</Text> 
                            <Text style={styles.itemText}>Nome: {item.Nome}</Text>
                            <Text style={styles.itemText}>RG: {item.rg}</Text>
                            <Text style={styles.itemText}>CPF: {item.cpf}</Text>
                            <Text style={styles.itemText}>Phone: {item.phone}</Text>
                            <Text style={styles.itemText}>Email: {item.Email}</Text>
                            <Text style={styles.itemText}>Parentesco: {item.Email}</Text>
                            <Text style={styles.itemText}>UserId: {item.userId}</Text>
                            
                            
                                <View style ={styles.buttonContainer}>
                                    <TouchableOpacity  onPress={()=> {editParent(item.id)}}>EDIT</TouchableOpacity>
                                    <TouchableOpacity onPress={()=> {delParent(item.id)}}>DELETE</TouchableOpacity>
                                </View>
                        </View>
                    )}
                />
                {/*parâmetro FlatList é parecido com o forEach do html */}
            </View>

        </View>
        
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
    itemText: {
        color: 'black',
        fontSize: 16,
        marginBottom: 5,
    },

    buttonContainer: {
        marginBottom:10,
        flexDirection:'row',
        alignItems: 'center',
        gap: 20,
        alignContent: 'space-around'
    },

})
//Motificar o componente para que o mesmo esteja adequado para uso, estilização do figma e do HTML, 
// otimizar o botão upload para uso no codigo. Pesquisa de objeto anonimo. 
