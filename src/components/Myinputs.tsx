import React, { ReactNode, useState } from 'react';
import { TextInput, TextStyle, View, Text, Pressable } from 'react-native';
import { inputStyles } from '../../styles/inputStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';


//npm install react-native-vector-icons @types/react-native-vector-icons

/*
//Exemplo de uso do TextArea
<MyTextArea
  iconName='message'
  label="Descrição"
  value={req.address} // Passa o estado como valor
  onChangeText={(text) => setReq({ ...req, ..... })} // Atualiza o estado ao digitar
  placeholder="Digite sua mensagem aqui"
  style={{ height: 150 }}
/>
*/

interface MyinputProps {
  value: string;  // valor do input
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: TextStyle | TextStyle[];
  label: string;
  iconName: string;

}

interface MyCheckProps {
  label: string;
  checked: boolean;
  onToggle(checked:boolean): void;
  //função que será chamada quando a checkbox for alterada
}

interface MyTextAreaProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: TextStyle | TextStyle[];
  label: string;
  iconName: string;
}

const Myinput: React.FC<MyinputProps> = ({ value, onChangeText, placeholder, style, label, iconName }) => {
  return (
    <View style={[inputStyles.container]} >

      <View style={inputStyles.labelContainer}>
        <Icon style={[inputStyles.icon]} name={iconName} size={18} />
        <Text style={inputStyles.label}>{label}</Text>
      </View>

      <TextInput
        style={[inputStyles.input, style]}
        value={value}  // valor do input
        onChangeText={onChangeText}
        placeholder={placeholder}
      />

    </View>
  );
};

const MyTextArea: React.FC<MyTextAreaProps> = ({ value, onChangeText, placeholder, style, label, iconName }) => {
  return (
    <View style={inputStyles.container}>
      
      <View style={inputStyles.labelContainer}>
        {/*<Icon style={inputStyles.icon} name="message" size={18} /> */}
        <Icon style={[inputStyles.icon]} name={iconName} size={18} />
        <Text style={inputStyles.label}>{label}</Text>
      </View>
      <TextInput
        style={[inputStyles.textArea, style]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline={true}
      />
    </View>
  );
};

const MyCheck: React.FC<MyCheckProps> = ({ label, checked, onToggle }) => {
  return (
    <Pressable style={inputStyles.checkboxContainer} onPress={() =>onToggle(!checked)}>

      <View style={[inputStyles.checkbox, checked && inputStyles.checkboxChecked]}>
        {checked && <Icon name="check" size={16} color="white" />}
        {!checked && <Icon name="close" size={16} color="white" />}
      </View>
      <Text style={inputStyles.checkboxLabel}>{label}</Text>
    </Pressable>

  );
};

export { Myinput, MyCheck, MyTextArea };
