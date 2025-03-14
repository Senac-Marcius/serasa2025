import React, {useState} from 'react'; //Importa o react e atualiza a lista Automaticamente.
import { View, Text, StyleSheet, TextInput, Button, FlatList, FlatListComponent} from 'react-native';//Une  os objetos e o react-native faz a função de trasformar o codigo em multiplas plataformas.

export default function ScaleScreen(){
    
    const [req, setReq] = useState({
        id:0,
        day:'',
        starttime:'',
        endtime:'',
        creatAt: new Date().toISOString(),
        userId: 0,
    })

    function handleRegister(){
        setScales([...scales, req])
        setReq({
            id:0,
            day:'',
            starttime:'',
            endtime:'',
            creatAt:new Date().toISOString(),
            userId: 0,
    })   
}

    const[scales,setScales] = useState<{id: number, day: string, starttime: string, endtime: string, creatAt: string, userId: 0}[]>([])

    return (
        <View style={styles.container}> {/* Aqui é typecript dentro do html*/}
        {/*Aqui é HTML*/}
            <Text>Minha tela das escalas</Text>
            <View style={styles.row}>
                <View style={styles.form}>
                    <TextInput style={styles.input}
                        placeholder="Dia da Semana"
                        value={req.day}
                        onChangeText={(text) => setReq({...req,day: text})}
                    />
                    <TextInput style={styles.input}
                        placeholder="Horario de início"
                        value={req.starttime}
                        onChangeText={(text) => setReq({...req,starttime: text})}
                    />
                    <TextInput style={styles.input}
                        placeholder="Horario de termino"
                        value={req.endtime}
                        onChangeText={(text) => setReq({...req,endtime: text})}
                    />
                    <Button 
                        title='Cadastrar' onPress={handleRegister}
                    />
                </View >
                <View style={styles.listContainer}>
                    <FlatList
                        data={scales}
                        keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) =>  (
                                <View style={styles.response}>
                                    <Text>Dia da semana: {item.day}</Text>
                                    <Text>Horario de início: {item.starttime}</Text>
                                    <Text>Horario de termino: {item.endtime}</Text>
                                    <Text>Id do Usuário: {item.userId}</Text>
                                    <Text>Data da criação: {item.creatAt}</Text>
                                </View>
                            )}
                    />
                    </View>
            </View>
        {/*Só pode uma TAG por retorn, mas dentro dessa tag pode ter outras*/}        
        </View> 
    );
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        gap: 10,
        padding: 20,
        backgroundColor: '#FFF',
    },

    listContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        minHeight: '45%'
    },
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
    Button: {

    },
    input: {
        height: 40,
        borderColor: '#FFF',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#CCC',
    },
    response: {
        flex: 2,
        marginRight: 10,
        padding: 20,
        marginBottom: 10,
        backgroundColor: '#00A8FF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
    }
}) 