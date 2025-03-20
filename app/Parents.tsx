import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList,TouchableOpacity} from 'react-native';
//import dateTimepicker
//npm run web → chamar pagina web pelo terminal
//batatinha
export default function ParentScreen (){
//Aqui é TypeScript
    const [req, setReq] = useState({
        Nome: '',
        Email:'',
        parentesco:'',
        id:0,
        createAt: new Date().toISOString(),
        userId: 0,

    });

    const [parents,setParents] = useState<{
        Nome: string,
        Email: string,
        parentesco: string,
        id: number,
        createAt: string,
        userId: number,
    
    }[]>([])/* <> → usado para tipar uma função */

    function handleRegister() {
        if(req.id == -1){
            const newId = parents.length ? parents [parents.length -1].id +1 : 0;
            const newParents = {...req, id: newId}
        }else{
            setParents(parents.map( p =>(p.id == req.id ? req : p)))
        }

        //setParents([...parents, req])
        setReq({
            id:req.id + 1,
            Nome: '',
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
                </View>

                <FlatList
                    data={parents}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <View style={styles.parentsItem}>

                            <Text>{item.id}</Text>
                            <Text>{item.Nome}</Text>
                            <Text>{item.Email}</Text>
                            <Text>{item.parentesco}</Text>
                            <Text>{item.createAt}</Text>
                            <Text>{item.userId}</Text> 
                                <View style ={styles.buttonContainer}>
                                    <TouchableOpacity onPress={()=> {editParent(item.id)}}>EDIT</TouchableOpacity>
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
    buttonContainer: {
        flexDirection:'row',
        alignItems: 'center',
        gap: 20,
        alignContent: 'space-around'
    },
})