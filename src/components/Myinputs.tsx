import React, { ReactNode, useState } from 'react';
import { TextInput, TextStyle, StyleProp, View, Text } from 'react-native';
import { inputStyles } from '../../styles/inputStyles';


interface MyinputProps {
  value: string;  // valor do input
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: TextStyle | TextStyle[];
  label: string;


}

const Myinput: React.FC<MyinputProps> = ({ value, onChangeText, placeholder, style,label }) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        style={[inputStyles.input, style]}
        value={value}  // valor do input
        onChangeText={onChangeText}
        placeholder={placeholder}  // função para atualizar o texto
      />
    </View>
  );
};



export default Myinput;