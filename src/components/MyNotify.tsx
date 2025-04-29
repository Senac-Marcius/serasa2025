import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MyCorrelated } from './MyItem';
import Mytext from './MyText';
import MyList from './MyList';
import { textStyles } from '../../styles/textStyles';

import {
  setNotification,
  iNotification,
  deleteNotification,
  updateNotification,
  getNotifications,
} from '../controllers/notifications';

interface MyNotifyProps {
  style?: ViewStyle;
}

const MyNotify: React.FC<MyNotifyProps> = ({ style }) => {
  const [notifications, setNotifications] = useState<iNotification[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function getTodos() {
      const retorno = await getNotifications({});
      if (retorno.status && retorno.data && retorno.data.length > 0) {
        setNotifications(retorno.data);

      }
    }
    getTodos();
  }, [notifications]);

  return (
    <View>
      <TouchableOpacity
        style={[styles.notifyButton, style]}
        onPress={() => {
          setVisible(!visible);
        }}
      >
        <Ionicons name="notifications" size={20} color="#4A148C" />
      </TouchableOpacity>

      {visible && (
        <View style={styles.notificationContainer}>
          <MyList
            style={styles.notificationList}
            data={notifications}
            keyItem={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MyCorrelated showEditButton={false} showDeleteButton={false}>
                <Mytext style={textStyles.textBody}>Nome: {item.name}</Mytext>
                <Mytext style={textStyles.textBody}>Descrição: {item.description}</Mytext>
                <Mytext style={textStyles.textBody}>Url: {item.url}</Mytext>
                <Mytext style={textStyles.textBody}>UserId: {item.user_id}</Mytext>
                <Mytext style={textStyles.textBody}>CreatAt: {item.created_at}</Mytext>
              </MyCorrelated>
            )}
          />
        </View>
      )}
    </View>
  );

};

const styles = StyleSheet.create({
  notifyButton: {
    backgroundColor: '#6A1B9A', // botão roxo
    padding: 10,
    borderRadius: 30,
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    
  },

  notificationContainer: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#F3E5F5', // lilás claro
    borderRadius: 12,
    padding: 12,
    
    width: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 1000,

  },

  notificationList: {
    flexGrow: 0,

  },
});

export default MyNotify;
