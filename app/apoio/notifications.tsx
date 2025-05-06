import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TextInput, Button, TouchableOpacity,} from 'react-native';
import MyTheme from '../../src/components/MyTheme';
import {Myinput} from '../../src/components/MyInputs'; 
import MyView from '../../src/components/MyView';
import MyButton from '../../src/components/MyButtons';
import {MyItem} from '../../src/components/MyItem';
import MyList from '../../src/components/MyList';
import Mytext from '../../src/components/MyText';
import { setNotification, iNotification, deleteNotification, updateNotification, getNotifications} from '../../src/controllers/notifications';
import MySelect from '../../src/components/MySelect';
import { getUsers } from '../../src/controllers/users';

export default function NotificationScreen(){
// aqui é typNotificationScreenescript
    const [req, setReq] = useState({
        name:'',
        url:'',
        description:'',
        id: -1,
        created_at: new Date().toISOString(),
        user_id: 1,
    });

    const [notifications, setNotifications]= useState<iNotification[]>([])
    const [notifications, setNotifications]= useState<iNotification[]>([])
    

    useEffect(() => {
        (async () => {
            const retorno = await getNotifications({})
            if (retorno.status && retorno.data && retorno.data.length > 0){
                setNotifications(retorno.data);
            }
        })();

        (async () => {
            const retorno = await getUsers({})
            if (retorno.status && retorno.data && retorno.data.length > 0){
                setNotifications(retorno.data);
            }
        })();
    },[])
    
    
    async function handleRegister(){    
        if( req.id == -1){
            const newId = notifications.length ? notifications[notifications.length -1].id +1 : 0;
            const newNotification = {...req, id: newId};

            setNotifications([...notifications, newNotification])
            const resp = await setNotification(newNotification)
            console.log(resp)
        }else{
            setNotifications(notifications.map(n => (n.id == req.id ? req : n)));
            await updateNotification(req);
        }
        
        setReq({
            name:'',
            url:'',
            description:'',
            id: -1,
            created_at: new Date().toISOString(),
            user_id: 1,
        })
    }

    function editNotification(id:number){
        const notification = notifications.find( n => n.id == id)
        if(notification)
            setReq(notification)
    }

    async function delNotification(id:number){
        console.log(await deleteNotification(id))
        const list = notifications.filter(n => n.id != id );
            setNotifications(list)
    }
    
return (
    <MyView>
          
           
        
        {/* aqui é typescriot dentro do front*/}
        <Text>Minha tela de notificações</Text>
        <View style={styles.row}>
            <View style={styles.form}>
                <Myinput
                        style={styles.input}
                        placeholder = "Digite o nome:"
                        value={req.name}
                        onChangeText={(text) => setReq({...req ,name: text  })}
                        label="Nome"
                        iconName='person'
                 />

                <Myinput
                        style={styles.input}
                        placeholder = "Digite a descrição:"  
                        value={req.description}
                        onChangeText={(text) => setReq({...req ,description: text  })}
                        label="Descrição"
                        iconName='pending'
                    
                />

                <MySelect
                        style={styles.input}
                        placeholder = "Digite o Url:" 
                         value={req.url}
                         onChangeText={(text) => setReq({...req ,url: text  })}
                         label="Url"
                         iconName='pending'
                />

                <MyButton title="cadastrar:" onPress={handleRegister}/>

            </View>
{/*
           <MyList 
                    data={notifications}
                    keyItem={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <MyItem 
                            style={styles.notificationStyle} 
                                onEdit={() => {editNotification(item.id)}}
                                onDel={() => {delNotification(item.id)}}
                                
                        > {/* pedro /}

                           <Mytext  > Nome: {item.name}</Mytext> {/* alex}
                           <Mytext > Descrição: {item.description}</Mytext>
                           <Mytext > Url: {item.url}</Mytext>
                           <Mytext> UserId: {item.user_id}</Mytext>
                           <Mytext> CreatAt: {item.created_at}</Mytext>


                            {/*
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
                           }

                        </MyItem>
                    )}
           />*/}
           
        </View>

    </MyView>
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