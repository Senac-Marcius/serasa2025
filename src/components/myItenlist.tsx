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
              <MyButton onPress={onDel} title='Deletar'></MyButton> 
            </View>
        </TouchableOpacity>
        );
}

export default Myiten;
 
const styles = StyleSheet.create({
  edit: {
    backgroundColor: "#ab66f9",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    color: '#ffffff',
    width:100,
  } as ViewStyle,

  del:{
    backgroundColor: "#ab66f9",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    color: '#ffffff',
    marginTop: 20,
    width:100,
  } as ViewStyle,

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  } as TextStyle,
  
})