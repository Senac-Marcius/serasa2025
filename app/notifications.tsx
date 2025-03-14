import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, TextInput, Button} from 'react-native';


export default function NotificationScreen(){
// aqui é typNotificationScreenescript
    const [req, setReq] = useState({
        name:'',
        url:'',
        description:'',
        classification:'',
        id: 0,
        creatAt: new Date().toISOString(),
        userId: 0,
    });
    
    const [notifications, setNotifications] = useState<{
        name: string,
        url: string,
        description: string,
        classification: string,
        id: number,
        creatAt: string,
        userId: number,
    }[]>([])

    function handleRegister(){
        setNotifications([...notifications, req])
        setReq({
            name:'',
            url:'',
            description:'',
            classification:'',
            id: 0,
            creatAt: new Date().toISOString(),
            userId: 0,
        })
    }
        
return (
    <View>
        {/* aqui é typescriot dentro do front*/}
        <Text>Minha tela de notificações</Text>
        <View style={styles.row}>
            <View style={styles.form}>
                <TextInput
                        placeholder = "Nome:"
                        value={req.name}
                        onChangeText={(text) => setReq({...req ,name: text  })}
                 />
                <TextInput 
                        placeholder = "Descrição:"  
                        value={req.description}
                        onChangeText={(text) => setReq({...req ,description: text  })}
                />
                <TextInput 
                placeholder = "classificação:"  
                value={req.classification}
                onChangeText={(text) => setReq({...req ,classification: text  })}
                />

                <TextInput placeholder = "Url:" 
                         value={req.url}
                         onChangeText={(text) => setReq({...req ,url: text  })}
                />
-+
                <Button title="cadastrar:" onPress={handleRegister}/>

            </View>

           <FlatList
                    data={notifications}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <View style={styles.notificationStyle}>

                           <text> Nome: {item.name}</text> 
                           <text> Descrição: {item.description}</text>
                           <text> Url: {item.url}</text>
                           <text> Classificação: {item.classification}</text>
                           <text> UserId: {item.userId}</text>
                           <text> CreatAt: {item.creatAt}</text>

                        </View>

                    )}
           />
           
        </View>

    </View>
);
}

const styles = StyleSheet.create({
    row: {
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

    notificationStyle:{
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

    },
})