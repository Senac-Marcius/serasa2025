import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MyNotifyProps {
  style?: ViewStyle;
  onPress?: () => void;
}

const MyNotify: React.FC<MyNotifyProps> = ({ style, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.notifyButton, style]}
      onPress={onPress || (() => console.log('Abrir notificações'))}
    >
      <Ionicons name="notifications" size={20} color="#fff" />
    </TouchableOpacity>
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