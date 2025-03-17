import React, {useState} from 'react'; //Importa o react e atualiza a lista Automaticamente.
import {View, Text, StyleSheet, TextInput, Button, FlatList, FlatListComponent, TouchableOpacity} from 'react-native';//Une  os objetos e o react-native faz a função de trasformar o codigo em multiplas plataformas.
import { useRouter } from 'expo-router';

export default function ScaleScreen(){
    const router = useRouter();

    const [req, setReq] = useState({
        id:0,
        day:'',
        starttime:'',
        endtime:'',
        creatAt: new Date().toISOString(),
        userId: 0,
    });

    const [scales, setScales] = useState<{
        id:number,
        day: string,
        starttime:string,
        endtime:string,
        creatAt: string,
        userId: number,
    }[]>([]);

    function handleRegister(){
        if(req.id == -1){
            const newId = scales.length ? scales[scales.length - 1].id +1 : 0;
            const newScale = {...req, id: newId };
            
            setScales([...scales, newScale]);
        }else{
            setScales(scales.map(s => (s.id == req.id)? req: s ) );
        }

        setReq({
            id: -1,
            day:'',
            starttime:'',
            endtime:'',
            creatAt:new Date().toISOString(),
            userId: 0,
    })   
    function editScale(id: number){
        const scale = scales.find(s => s.id === id);
        if (scale) {
            setReq(scale);
        }
    }


    function deleteScale(id: number){
        const list = scales.filter(s => s.id !== id);
        setScales(list);

    }

    return(
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

                                    <View style={styles.buttonContainer}>
                                       <TouchableOpacity onPress={() => {editScale(item.id)}}>EDIT</TouchableOpacity>
                                       <TouchableOpacity onPress={() => {deleteScale(item.id)}}>DELETE</TouchableOpacity>
                                    </View>
                                </View>
                            )}
                    />
                    </View>
            </View>       
        </View> 
    );
}};

    

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        gap: 10,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
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
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },  
    },
    input: {
        height: 40,
        borderColor: '#FFFFFF',
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
        backgroundColor: '#D3D3D3',
        borderRadius: 10,
        shadowColor: '#FFF',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
    },
});
