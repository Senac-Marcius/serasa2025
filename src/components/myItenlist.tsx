import React, { ReactNode } from 'react';
import { Text, View, TextStyle } from 'react-native';
import  { textStyles }  from '../../styles/textStyles';

interface MytextProps {
  children: ReactNode;
  style: TextStyle | TextStyle[]; 
}

const Myiten: React.FC<MytextProps> = ({ children, style }) => {
  return (
        <View style = {style}>
            <Text>olá componente</Text>
            {children}
            <Text>Tchau componete</Text>
        </View>
        );
}

export default Myiten;
