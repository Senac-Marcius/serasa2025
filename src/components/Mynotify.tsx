import { View, ViewStyle, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
//https://icons.expo.fyi/Index
import React, { ReactNode } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

interface MyNotifyProps {
  children: ReactNode;
  style?: ViewStyle;
}

const MyNotify: React.FC<MyNotifyProps> = ({ children, style }) => {
  return (
    <View style={style}>
      {children}
      <TouchableOpacity
        style={{
          borderRadius: 20,
          width: 40,
          height: 40,
          justifyContent:'center',
          alignItems:'center',
        }}
        onPress={() => console.log('Abrir notificações')}
      >
          <Entypo name="bell" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default MyNotify;