import React, {useState} from 'react';
import{View, Text, StyleSheet, FlatList, TextInput,Button} from 'react-native';
import { text } from 'stream/consumers';
 //função userState só retorna para uma variavel const

export default function CollectionScreen(){
    const [req, setReq] = useState({
        id:0,
        name:'',
        quantity:'',
        star:'',  
        creatAt: new Date().toISOString()
    });
    const [collections,setCollections] = useState<{
        name:string,
        quantity:string, 
        star:string, 
        creatAt:string, 
        id:number,}[]>([])

    function handleRegister(){
        setCollections ([...collections,req])
    }

        return (//encapsulamento 
            <View>{/* modo de comentar, aqui é typescript dentro do front */}
                <Text>Tela de acervo</Text>
                <View style= {style.row}>
                    <View style= {style.form}>
                        <TextInput
                        placeholder="Nome"
                            value={req.name}
                            onChangeText={(text)=>setReq({...req ,name:text})} //
                        />
                        {req.name}

                         <TextInput
                        placeholder="Quantidade"
                            value={req.quantity}
                            onChangeText={(text)=>setReq({...req ,quantity:text})}
                        />
                        {req.quantity}

                         <TextInput
                        placeholder="Estrelas"
                            value={req.star}
                            onChangeText={(text)=>setReq({...req ,star:text})}
                        />
                        {req.star}

                        <Button title='Cadastrar'
                        onPress={handleRegister}
                        color="pink"
                        />
                    </View>
                </View>
            </View>

        );
    }
    const style = StyleSheet.create({
        row:{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'flex-start',
        },
        form:{
            flex:1,
            marginRight:10,
            padding:20,
            backgroundColor: '#F2F2F2',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 5,

        },
    })
   