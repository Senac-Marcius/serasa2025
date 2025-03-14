
import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, } from 'react-native';


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
        id: req.id + 1,
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
        <View style={styles.container}>
            {/* aqui é typescript dentro do front*/}
            <Text> Minha tela das postagem</Text>
            <View style={styles.row}>
            <View style={styles.form}>
                
                
                
                <TextInput
                    placeholder=" digite aqui a Descrição"
                    value = {req.description}
                    onChangeText={(text) => setReq({...req,description:text})}
                />
                

                <TextInput
                    placeholder=" digite aqui o Name"
                    value = {req.name}
                    onChangeText={(text) => setReq({...req,name:text})}
                />
                

                <TextInput
                    placeholder=" digite aqui a URL"
                    value = {req.url}
                    onChangeText={(text) => setReq({...req,url:text})}
                />
                

                <TextInput
                    placeholder=" digite aqui o STATUS DA BOLSA"
                    value = {req.scholarshipStatus}
                    onChangeText={(text) => setReq({...req,scholarshipStatus:text})}
                />


                <Button 
                    title= 'Cadastrar' onPress={handleRegister}
                />

            
            </View>

            <FlatList
                data={revenues}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <   View style={styles.revenueStyle}>
                        <Text>{item.description}</Text>
                        <Text>{item.name}</Text>
                        <Text>{item.url}</Text>
                        <Text>{item.createAt}</Text>
                        <Text>{item.userId}</Text>
                        <Text>{item.value}</Text>
                        <Text>{item.scholarshipStatus}</Text>
                        <Text>{item.discountPercentage}</Text>
                    </View>
                )}
            
            />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f5f5f5', // Fundo da tela
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      color: '#333',
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
      backgroundColor: '#fff', // Fundo branco
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 5,
      elevation: 3, // Sombra no Android
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 15,
      paddingHorizontal: 10,
      backgroundColor: '#f9f9f9', // Fundo do input
    },
    revenueStyle: {
      flex: 1,
      marginRight: 10,
      padding: 15,
      backgroundColor: '#808080', // Fundo branco
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 5,
      elevation: 3, // Sombra no Android
      marginBottom: 10, // Espaçamento entre os itens
    },
    revenueText: {
      fontSize: 14,
      color: '#555',
      marginBottom: 5, // Espaçamento entre os textos
    },
  });