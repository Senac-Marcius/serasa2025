import React, { useState } from 'react'; 
import { View, Text, TextInput, Button, FlatList, StyleSheet  } from 'react-native';
import { useRouter } from 'expo-router';

export default function LocalScreen(){
    const router = useRouter();

    //onde vou criar a variavel do useState:            é const pq a usestate so aceita const
    const [req, setReq] = useState({
    
        id: 0,
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
        setLocals([...locals, req])
        setReq({
            id: req.id +1,
            name: '',
            area: '',
            description: '', 
            adress:'',
            createAt: new Date().toISOString(),

        })
    }

    return (  //  *  sempre retornará um html.     * view com o "v" minúsculo é utilizado, apenas, no HTML puro.     * Para comentar no HYML, é necessário utilizar "{/* */}"
        <View>
            <View style={styles.container}>
            <Button title="Voltar" onPress={() => router.back()} />

            <View style={styles.row}></View>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>TELA DOS LOCAIS</Text>
                    <TextInput 
                    placeholder= "Digite o nome do local:"                                  /*  "placeholder" é um texto   */
                    value={req.name}
                    onChangeText={(t) => setReq({...req, name: t })}                     //onchange precisa receber uma funcao
                    />  

                    <TextInput 
                    placeholder= "Digite a área do local em metros:"
                    value={req.area}
                    onChangeText={(n) => setReq({...req, area: n })}                    //... significa-> TODOS OS CAMPOS DE "REQ"     
                    />                                                               {/*  é disparado sempre que o valor do campo de entrada é alterado  */}
 
                    <TextInput 
                    placeholder= "Digite a sua descrição:"
                    value={req.description}
                    onChangeText={(t) => setReq({...req, description: t })}
                    /> 

                    <TextInput placeholder= "Digite o seu respectivo endereço:"
                    value={req.adress}
                    onChangeText={(t) => setReq({...req, adress: t })}
                    />

                    <Button title='Cadastrar' onPress={ handleRegister } />          {/*  o código que deve ser utilizado para criar o botão  */} 

                </View>
 {/*   o ROW abraça o -> FORM  e o FLATLIST   */} {/* data recebe locals, o locals recebe dados */} 
                <FlatList                         
                    data={locals}                   
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View>
                            <Text>{item.name}</Text>
                            <Text>{item.area}</Text>
                            <Text>{item.description}</Text>
                            <Text>{item.adress}</Text>
                            <Text>{item.createAt}</Text>
                        </View>
                    )}
                 /> 
            </View>
        </View> 
    );   
}               

     

const styles = StyleSheet.create({            //ESTILIZAÇÃO: aqui convidamos funções que criam estilos para fontes

    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    formContainer: {
        flex: 6,
        marginRight: 15,
        padding: 25,
        backgroundColor: '#F2F2F2',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 7,
    },
    listContainer: {
        flex: 1, 
        padding: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    form: {
        flex: 6,
        marginRight: 15,
        padding: 25,
        backgroundColor: '#F2F2F2',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 7,
    },
})

