import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {MyCorrelated} from './MyItem';
import Mytext from './MyText';
import MyList from './MyList';
import {textStyles}  from '../../styles/textStyles';

import { setNotification, iNotification, deleteNotification, updateNotification, getNotifications} from '../controllers/notifications';

interface MyNotifyProps {
  style?: ViewStyle;
  onPress?: () => void;
}

const MyNotify: React.FC<MyNotifyProps> = ({ style, onPress }) => {

  const [notifications, setNotifications]= useState<iNotification[]>([])

  useEffect(() => {
    async function getTodos(){
        const retorno = await getNotifications({})
        if (retorno.status && retorno.data && retorno.data.length > 0){
            setNotifications(retorno.data);
        }
    }
        getTodos();
},[])


  return (
    <View>
      <TouchableOpacity
        style={[styles.notifyButton, style]}
        onPress={onPress || (() => console.log('Abrir notificações'))}
      >
        <Ionicons name="notifications" size={20} color="#fff" />
      </TouchableOpacity>
      <MyList 
                    data={notifications}
                    keyItem={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <MyCorrelated 
                       
                        showEditButton={false}
                        showDeleteButton={false}
                                
                        > {/* pedro */}

                           <Mytext style={textStyles.textBody} > Nome: {item.name}</Mytext> {/* alex */}
                           <Mytext style={textStyles.textBody}> Descrição: {item.description}</Mytext>
                           <Mytext style={textStyles.textBody}> Url: {item.url}</Mytext>
                           <Mytext style={textStyles.textBody}> UserId: {item.user_id}</Mytext>
                           <Mytext style={textStyles.textBody}> CreatAt: {item.created_at}</Mytext>

                        </MyCorrelated>
                    )}
           />
    </View>
  );
};

const styles = StyleSheet.create({
  notifyButton: {
    backgroundColor: '#6A1B9A',
    padding: 10,
    borderRadius: 30,
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyNotify;