import react, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button, FlatList} from 'react-native';

export default function BudgetScreen(){

//aqui é typescriot

    const [req, setReq] = useState({

        name:'',
        url:'',
        id: 0,
        createAt: new Date().toISOString(),
        velue:'',
        userId: 0,
        startDate: '',
        endDate:'',
        
    });

    const [budgets, setBudgets]= useState<{
        name: string,
        url:string,
        id: number,
        createAt: string,
        velue: string,
        userId: number,
        startDate: string,
        endDate: string,

    }[]>([])

    function  handleRegister(){
        setBudgets([...budgets, req])
            setReq({
                
        name:'',
        url:'',
        id: req.id + 1,
        createAt: new Date().toISOString(),
        velue:'',
        userId: 0,
        startDate: '',
        endDate:'',
            })
    }

    return (
        <View>
            {/* aqui é typescriot dentro do front*/}
            <Text>Minha tela das postagens</Text>
            <View style={styles.row}>
                <View style={styles.form}>
                    <TextInput
                            placeholder = "nome" 
                            value={req.name}
                            onChangeText={(text) => setReq({...req ,name: text})}
                   />
                    <TextInput 
                    placeholder = "url"
                    value={req.url}
                    onChangeText={(text) => setReq({...req ,url: text})} 
                     />
                     
                     <TextInput 
                    placeholder = "valor"
                    value={req.velue}
                    onChangeText={(text) => setReq({...req ,velue: text})} 
                     />
                    <TextInput 
                    placeholder = "Data Inicial"
                    value={req.startDate}
                    onChangeText={(text) => setReq({...req ,startDate: text})} 
                     />
                    <TextInput 
                    placeholder = "Data Final" 
                    value={req.endDate}
                    onChangeText={(text) => setReq({...req ,endDate: text})}
                     />
                   

                    <Button title ='CADASTRAR' onPress={ handleRegister }/>
                </View>
                <FlatList

                    data={budgets}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                    
                        <View style={styles.budetStyle}>
                            <Text>{item.name}</Text>
                            <Text>{item.url}</Text>
                            <Text>{item.velue}</Text>
                            <Text>{item.userId}</Text>
                            <Text>{item.startDate}</Text>
                            <Text>{item.endDate}</Text>
                            <Text>{item.createAt}</Text>
                            <Text>{item.createAt}</Text>
                           
                        </View>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
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
    budetStyle:{
        flex: 1,
        marginRight: 10,
        padding: 20,
        backgroundColor: '#F2F2F2',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        margin: 10,
        width: 400,

        }
})