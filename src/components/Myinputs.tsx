import React, { ReactNode } from 'react';
import { TextInput, TextStyle } from 'react-native';
import { inputStyles } from '../../styles/inputStyles';  

interface MyinputProps {
  children: ReactNode;
  style?: TextStyle | TextStyle[];  
}

const Myinput: React.FC<MyinputProps> = ({ children, style }) => {
  return <TextInput style={[inputStyles.input, style]}>{children}</TextInput>;
};

export default Myinput;

