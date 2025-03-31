import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { TimePickerModal } from 'react-native-paper-dates';
import { Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyButton from './Mybuttons';
import MyView from './MyView';


interface MyTimePickerProps {
  onTimeSelected: (time: string) => void; // Callback para atualizar o estado no pai
  initialTime?: string; // Valor inicial (opcional)
}

export default function MyTimePicker({ onTimeSelected, initialTime = '' }: MyTimePickerProps) {
  const [open, setOpen] = useState(false);


  const handleConfirm = ({ hours, minutes }: { hours: number; minutes: number }) => {
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    onTimeSelected(formattedTime); // Atualiza o estado no componente pai
    setOpen(false);
  };

  return (
    <MyView>
      <TextInput
        placeholder="HH:MM"
        value={initialTime}
        editable={false}
        style={{ flex: 1, backgroundColor: '#f9f9f9' }}
      />
      <MyButton
        button_type = "round"
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
    </MyView>
  );
}