import react, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button} from 'react-native' ;
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ExpenseScreen(){
// aqui é typescript
    const [req, setReq] = useState({
            name: '',
            url: '',
            description: '',
            id: 0,
            cost: '',
            creatAt : new Date(). toISOString(),
            userId: '',
    });
    const [expense, setExpense ] = useState<{
        name: string,
        url: string,
        description: string,
        cost: string,
        creatAt: string,
        userId: string,
    }[]>([]) 

    function handleRegister(){
        setExpense([...expense, req])
        setReq({
            name: '',
            url: '',
            description: '',
            id: 0,
            cost: '',
            creatAt : new Date(). toISOString(),
            userId: '',
        })
    }

    return (
        <View>
            {/* aqui é typecript dentro do front */}
            <Text>tela de despesas</Text>
            <View style={styles.row}>
                <View style={styles.form}>
                    <TextInput placeholder="nome"
                    value ={req.name}
                    onChangeText ={(text) => setReq({...req ,name: text}) 
                    }/>

                    {req.name}

                    <TextInput placeholder="url"
                    value ={req.url}
                    onChangeText={(text)=>setReq({...req ,url: text})
                    }/>

                    {req.url}

                    <TextInput placeholder="description"
                    value ={req.url}
                    onChangeText={(text)=>setReq({...req ,description: text})
                    }/>

                    {req.description}

                    <TextInput placeholder="valor"
                    value ={req.cost}
                    onChangeText ={(text) => setReq({...req ,cost: text}) 
                    }/>

                    {req.cost}

                    <TextInput placeholder="userid"
                    value ={req.userId}
                    onChangeText ={(text) => setReq({...req ,userId: text}) 
                    }/>

                    {req.userId}

                    <Button title='Cadastrar' onPress= { handleRegister }/>
                </View>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row : {
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