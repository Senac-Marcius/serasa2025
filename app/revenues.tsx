
import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity  } from 'react-native';


export default function RevenueScreen(){
// aqui é typescript
    const [req, setReq] = useState({
        id: -1,
        description: '',
        name: '',
        url: '', 
        createAt: new Date().toISOString(),
        userId: 0,
        value: '',
        scholarshipStatus: '',
        discountPercentage: '',
    });

    const [revenues, setRevenues] = useState<{
        id: number,
        description : string,
        name: string,
        url: string,     
        createAt: string,
        userId: number,
        value: string,
        scholarshipStatus: string,
        discountPercentage: string,
    }[]>([]);
    
    function handleRegister(){
        if(req.id ==-1){
            const newId = revenues.length ? revenues[revenues.length - 1].id + 1 : 0;
            const newRevenue = {...req,id: newId};
            setRevenues([...revenues, newRevenue]);
        }else{
            setRevenues(revenues.map(r => (r.id == req.id ? req : r)));
        }
        
        setReq({
        id: -1,
        description: '',
        name: '',
        url: '', 
        createAt: new Date().toISOString(),
        userId: 0,
        value: '',
        scholarshipStatus: '',
        discountPercentage: '',  
        })
    }






    function editRevenue(id:Number){
        const revenue = revenues.find(r => r.id == id)
        if(revenue)
        setReq(revenue)
    
    }
    
    function delRevenue(id:number){
        const list = revenues.filter(r => r.id != id)
            setRevenues(list)
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
                    placeholder=" digite aqui o Valor"
                    value = {req.value}
                    onChangeText={(text) => setReq({...req,value:text})}
                />


                <TextInput
                    placeholder=" digite aqui o status da Bolsa"
                    value = {req.scholarshipStatus}
                    onChangeText={(text) => setReq({...req,scholarshipStatus:text})}
                />

                <TextInput
                    placeholder=" digite aqui o desconto"
                    value = {req.discountPercentage}
                    onChangeText={(text) => setReq({...req,discountPercentage:text})}
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
                        <Text style={styles.revenueText}>Descrição: {item.description}</Text>
                        <Text style={styles.revenueText}>Nome: {item.name}</Text>
                        <Text style={styles.revenueText}>URL: {item.url}</Text>
                        <Text style={styles.revenueText}>Data: {item.createAt}</Text>
                        <Text style={styles.revenueText}>ID do Usuário: {item.userId}</Text>
                        <Text style={styles.revenueText}>Valor: {item.value}</Text>
                        <Text style={styles.revenueText}>Status da Bolsa: {item.scholarshipStatus}</Text>
                        <Text style={styles.revenueText}>Desconto: {item.discountPercentage}%</Text>

                        <View style={styles.buttonsContanier}>
                            <TouchableOpacity 
                               style={styles.editButton} 
                               onPress= {()=>{editRevenue(item.id)}}
                               >
                               <Text style={styles.buttonText}>EDIT</Text>
                               </TouchableOpacity>   
                            <TouchableOpacity 
                                style={styles.deleteButton} 
                                onPress= {()=>{delRevenue(item.id)}}
                                >
                                 <Text style={styles.buttonText}>DELETE</Text>
                                 </TouchableOpacity>
                        </View>

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
      backgroundColor: '#fff', // Fundo branco
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
      color: '#000000',
      marginBottom: 5, // Espaçamento entre os textos
    },

    buttonsContanier:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        alignContent:'space-around',
    },
    editButton: {
        backgroundColor: '#FFFF00', // Cor de fundo AMARELO
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
      },
      deleteButton: {
        backgroundColor: '#f44336', // Cor de fundo vermelho
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonText: {
        color: '#000000', // Texto branco
        fontWeight: 'bold',
      },
  });