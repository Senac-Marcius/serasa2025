import { View, ViewStyle, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import React, { ReactNode } from 'react';

interface MyNotifyProps {
  children: ReactNode;
  style: ViewStyle;
}

const MyNotify: React.FC<MyNotifyProps> = ({ children, style }) => {
  return (
    <View style={style}>
      {children}
      <TouchableOpacity
        style={{
          position:'absolute',
          right: 20,
          bottom: 20,
          backgroundColor:'yellow',
          borderRadius: 20,
          width: 40,
          height: 40,
          justifyContent:'center',
          alignItems:'center',
        }}
        onPress={() => console.log('Abrir notificações')}
      >
        <Ionicons name="notifications" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default MyNotify;