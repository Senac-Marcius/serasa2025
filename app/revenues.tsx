
import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, Button, } from 'react-native';


export default function RevenueScreen(){
// aqui é typescript
    const [req, setReq] = useState({
        id: 0,
        description: '',
        name: '',
        url: '', 
        createAt: new Date().toISOString(),
        userId: 0,
        value: 0,
        scholarshipStatus: '',
        discountPercentage: 0,
    });

    const [revenues, setRevenues] = useState<{
        id: number,
        description : string,
        name: string,
        url: string,     
        createAt: string,
        userId: number,
        value: number,
        scholarshipStatus: string,
        discountPercentage: number,
    }[]>([]);
    
    function handleRegister(){
        setRevenues([...revenues ,req]);
        setReq({
        id: 0,
        description: '' ,
        name: '',
        url: '', 
        createAt: new Date().toISOString(),
        userId: 0,
        value: 0,
        scholarshipStatus: '',
        discountPercentage: 0,  
        })
    }

    return (
        <View>
            {/* aqui é typescript dentro do front*/}
            <Text> Minha tela das postagem</Text>
            <View style={styles.row}>
            <View style={styles.form}>
                
                
                
                <TextInput
                    placeholder=" digite aqui a Descrição"
                    value = {req.description}
                    onChangeText={(text) => setReq({...req,description:text})}
                />
                {req.description}

                <TextInput
                    placeholder=" digite aqui o Name"
                    value = {req.name}
                    onChangeText={(text) => setReq({...req,name:text})}
                />
                {req.name}

                <TextInput
                    placeholder=" digite aqui a URL"
                    value = {req.url}
                    onChangeText={(text) => setReq({...req,url:text})}
                />
                {req.url}

                <TextInput
                    placeholder=" digite aqui o STATUS DA BOLSA"
                    value = {req.scholarshipStatus}
                    onChangeText={(text) => setReq({...req,scholarshipStatus:text})}
                />
                {req.scholarshipStatus}

                <Button 
                    title= 'Cadastrar' onPress={handleRegister}
                />

            

            </View>
            
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
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
