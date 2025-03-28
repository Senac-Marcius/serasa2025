import React, { ReactNode } from 'react';
import { Text, View, TextStyle,TouchableOpacity, ViewStyle, StyleSheet } from 'react-native';
import MyButton from './Mybuttons';

interface MytextProps {
  children?: ReactNode;
  style?: ViewStyle | ViewStyle[];
  onEdit?(): void
  onDel?(): void
}

const Myiten: React.FC<MytextProps> = ({ children, style, onEdit, onDel }) => {
  return (
          <TouchableOpacity style={style}>
            {children}
            <View>
              <MyButton onPress={onEdit} title='Editar'></MyButton>
              <MyButton  style={{marginTop: 20 }} onPress={onDel} title='Deletar'></MyButton> 
            </View>
        </TouchableOpacity>
        );
}

export default Myiten;
 