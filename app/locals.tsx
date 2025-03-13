import React, { useState } from 'react'; 
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'; 

export default function LocalScreen(){

    //onde vou criar a variavel do useState:            é const pq a usestate so aceita const
    const [req, setReq] = useState({
    
        name: '',
        area: '',
        description: '', 
        adress:'',
        createAt: new Date().toISOString(),
    });      

    const [locals, setLocals] = useState<{
        name: string,
        area: string,
        description: string,
        adress: string,
        createAt: string,
    }[]>([])        //  '< >' -> recebe um tipo. torna-se tipada   -> 

    function handleRegister(){
        setLocals([...locals, req])
        setReq({
            name: '',
            area: '',
            description: '', 
            adress:'',
            createAt: new Date().toISOString(),

        })
    }

    return (  //  *  sempre retornará um html.     * view com o "v" minúsculo é utilizado, apenas, no HTML puro.     * Para comentar no HYML, é necessário utilizar "{/* */}"
        <View>
            {/* aqui é typescript dentro do front */} 
            <Text>Tela dos Locais:</Text>
            <View style={styles.row}>
                <View style={styles.form}>


                    <TextInput placeholder= "Digite o nome do local"             /*  "placeholder" é um texto   */
                        value={req.name}
                        onChangeText={(t) => setReq({...req ,name: t })}   //onchange precisa receber uma funcao
                    /> 

                    {req.name}

                    <TextInput placeholder= "Digite a área em cm:"
                    value={req.area}
                    onChangeText={(n) => setReq({...req, area: n })}   //... significa-> TODOS OS CAMPOS DE "REQ"     
                    />     {/*  é disparado sempre que o valor do campo de entrada é alterado  */}
 
                    {req.area}  

                    <TextInput placeholder= "Digite a descrição:"
                    value={req.description}
                    onChangeText={(t) => setReq({...req, description: t })}
                    /> 

                    {req.description}

                    <TextInput placeholder= "Digite o endereço:"
                    value={req.adress}
                    onChangeText={(t) => setReq({...req, adress: t })}
                    />

                    {req.adress} 

                    <Button title='Cadastrar' onPress={ handleRegister } />          {/*  o código que deve ser utilizado para criar o botão  */} 

                </View>
              {/*  <FlatList
                /> */}
            </View>
        </View> 
    );   
} 

const styles = StyleSheet.create({              //ESTILIZAÇÃO: aqui convidamos funções que criam estilos para fontes
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    form: {
        flex: 1,
        marginRight: 10,
        padding: 20,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
    },
})


//useState: a funcao da uma update, a funcao atualiza a variavel +1        é uma variavel + function
//na useState, a variavel=caixa   function=funil para entrar na caixa
//se a variável for com letra, usa-se '', se for com numero comeca com 0 (é o contador)

