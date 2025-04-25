import React, { useState } from 'react';
import {  View ,} from 'react-native';
import { TimePickerModal } from 'react-native-paper-dates';
import MyButton from './MyButtons';
import {  StyleSheet } from 'react-native';
import { Myinput } from './MyInputs';
import { Input } from 'native-base';


interface MyTimerPickerProps {
  onTimeSelected: (time: string) => void; // Callback para atualizar o estado no pai
  initialTime?: string; // Valor inicial (opcional)
  labelText?: string;
}

export default function MyTimerPicker({ onTimeSelected, initialTime = '' ,labelText = ''}: MyTimerPickerProps) {
  const [open, setOpen] = useState(false);


  const handleConfirm = ({ hours, minutes }: { hours: number; minutes: number }) => {
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    onTimeSelected(formattedTime); // Atualiza o estado no componente pai
    setOpen(false);
  };
  
  return (
    <View style={styles.container}>
    <Myinput
      placeholder="HH:MM"
      label={labelText}
      iconName="alarm"
      value={initialTime}
      onChangeText={() => {}}
    />

    <MyButton
      button_type="round"
      style={styles.button} // Aplica o estilo
      onPress={() => setOpen(true)}
      icon="clock-outline"
    />
    
    <TimePickerModal
      locale="pt"
      visible={open}
      onDismiss={() => setOpen(false)}
      onConfirm={handleConfirm}
      animationType="fade"
    />
    
  </View>
);
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',   // Alinha o botão e o campo de input na horizontal
    alignItems: 'center',   // Centraliza verticalmente
    justifyContent: 'space-between', // Cria espaço entre os elementos
  },
  button: {
    backgroundColor: '#6200ea', // Cor de fundo
    borderRadius: 30,           // Deixa o botão arredondado
    padding: 10,                // Adiciona um espaço interno
    elevation: 5,               // Cria sombra (Android)
    shadowColor: '#000',        // Cor da sombra (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
