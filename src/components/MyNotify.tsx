import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, View, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MyItem } from './MyItem';
import Mytext from './MyText';
import { getUserById, getLoggedUserId, iUser } from '../controllers/users';

import {
  setNotification,
  iNotification,
  deleteNotification,
  updateNotification,
  getNotifications,
} from '../controllers/notifications';
import { ScrollView } from 'react-native-gesture-handler';

interface MyNotifyProps {
  style?: ViewStyle;
}

const MyNotify: React.FC<MyNotifyProps> = ({ style }) => {
  const [notifications, setNotifications] = useState<iNotification[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function getTodos() {
      const id = await getLoggedUserId();

      const retorno = await getNotifications({user_id:id});
      if (retorno.status && retorno.data) {
        setNotifications(retorno.data);
      }
    }
    getTodos();
  }, notifications);

  function formatDate(iso: string) {
    const date = new Date(iso);
    return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR');
  }

  return (
    <View>
      <TouchableOpacity
        style={[styles.notifyButton, style]}
        onPress={() => setVisible(!visible)}
      >
        <Ionicons name="notifications" size={20} color="#4A148C" />
      </TouchableOpacity>

      {visible && (
        <View style={styles.notificationContainer}>
          <ScrollView>
            <FlatList
              data={notifications}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.notificationList}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Mytext style={styles.value}>{item.description}</Mytext>
                  <Mytext style={styles.value}>{formatDate(item.created_at)}</Mytext>
                </View>
              )}
            />
          </ScrollView>
        </View>
      )}
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
  notificationContainer: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#F3E5F5',
    borderRadius: 12,
    padding: 12,
    maxHeight: 500,
    width: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 1000,
  },
  notificationList: {
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  label: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#333',
  },
  value: {
    fontSize: 13,
    marginBottom: 6,
    color: '#555',
  },
});

export default MyNotify;
