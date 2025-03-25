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