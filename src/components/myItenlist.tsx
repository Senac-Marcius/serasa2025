import React, { ReactNode } from 'react';
import { Text, View, TextStyle,TouchableOpacity, ViewStyle, StyleSheet } from 'react-native';

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
              <TouchableOpacity style={styles.edit} onPress={onEdit}
              >Editar
              </TouchableOpacity>
              <TouchableOpacity style={styles.del} onPress={onDel}
              >Deletar
              </TouchableOpacity> 
            </View>
        </TouchableOpacity>
        );
}

export default Myiten;
 
const styles = StyleSheet.create({
  edit: {

    backgroundColor: "#3498DB",
  } as ViewStyle,

  del:{
    backgroundColor: "#E74C3C",
  } as ViewStyle,

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  } as TextStyle,
  
})