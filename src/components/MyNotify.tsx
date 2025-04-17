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
    onPress={onPress || (() => console.log('Abrir notificações'))} //tirar essa parte
  >
      <Ionicons name="notifications" size={20} color= "#fff" />
    </TouchableOpacity>

    //aqui faz a list (puxa do da iris)
    



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

  switch: {
    borderRadius: 20, //Força bordas arredondadas
    overflow: 'hidden', //Impede que o navegador sobrescreva estilos
},

});

export default MyNotify;