import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native';
import MyTheme from '../src/components/Mytheme';

export default function NotificationScreen(){
// aqui é typNotificationScreenescript
    const [req, setReq] = useState({
        name:'',
        url:'',
        description:'',
        classification:'',
        id: -1,
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
        if( req.id == -1){
            const newId = notifications.length ? notifications[notifications.length -1].id +1 : 0;
            const newNotification = {...req, id: newId};

            setNotifications([...notifications, newNotification]);
        }else{
            setNotifications(notifications.map(n => (n.id == req.id ? req : n)));
        }
        
        setReq({
            name:'',
            url:'',
            description:'',
            classification:'',
            id: -1,
            creatAt: new Date().toISOString(),
            userId: 0,
        })
    }

    function editNotification(id:number){
        const notification = notifications.find( n => n.id == id)
        if(notification)
            setReq(notification)
    }

    function deleteNotification(id:number){
        const list = notifications.filter(n => n.id != id )
            setNotifications(list)
    }

return (
    <View>
        <MyTheme style={styles.row}>
            <text></text>
        </MyTheme>
        {/* aqui é typescriot dentro do front*/}
        <Text>Minha tela de notificações</Text>
        <View style={styles.row}>
            <View style={styles.form}>
                <TextInput
                        style={styles.input}
                        placeholder = "Nome:"
                        value={req.name}
                        onChangeText={(text) => setReq({...req ,name: text  })}
                 />
                <TextInput 
                        style={styles.input}
                        placeholder = "Descrição:"  
                        value={req.description}
                        onChangeText={(text) => setReq({...req ,description: text  })}
                />
                <TextInput 
                        style={styles.input}
                        placeholder = "classificação:"  
                        value={req.classification}
                        onChangeText={(text) => setReq({...req ,classification: text  })}
                />

                <TextInput 
                        style={styles.input}
                        placeholder = "Url:" 
                         value={req.url}
                         onChangeText={(text) => setReq({...req ,url: text  })}
                />

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

                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity 
                                    style ={styles.editButton} 
                                    onPress={() => {editNotification(item.id)}}>
                                    <Text style={styles.buttonText}>EDIT</Text>
                                    </TouchableOpacity>
                                <TouchableOpacity 
                                    style ={styles.delButton} 
                                    onPress={() => {deleteNotification(item.id)}}>
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

    buttonsContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        gap:20,
        alignContent:'space-around',

    },

    editButton:{
        backgroundColor:'#FFFF00',
        padding:10,
        borderRadius:5,
        alignItems: 'center',
        justifyContent:'center',
        },
 
        delButton:{
        backgroundColor:'#f44336',
        padding: 10,
        borderRadius:5,
        alignItems: 'center',
        justifyContent:'center',
        },
 
        buttonText:{
        color:'#000000',
        fontWeight:'bold',
         },

    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
})