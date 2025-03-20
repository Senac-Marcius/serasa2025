import React, { ReactNode } from 'react';
import { Text, TextStyle } from 'react-native';
import  { textStyles }  from '../../styles/textStyles';

interface MytextProps {
  children: ReactNode;
  style?: TextStyle | TextStyle[]; // Permite receber um ou mais estilos
}

const Mytext: React.FC<MytextProps> = ({ children, style }) => {
  return <Text style={[textStyles.text, style]}>{children}</Text>;
};

export default Mytext;
