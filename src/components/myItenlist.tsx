import React, { ReactNode } from 'react';
import { Text, View, TextStyle,TouchableOpacity, ViewStyle, StyleSheet } from 'react-native';

interface MytextProps {
  children?: ReactNode;
  style?: ViewStyle | ViewStyle[];
  onEdit?(): void
  onDel?(): void
}

interface MyCorrelatedprops{
  children?: ReactNode;
  style?: ViewStyle | ViewStyle[];
  onEdit?(): void;
  onDel?(): void;
  relatedItems?: RelatedItem[];
  showEditButton?: boolean;
  showDeleteButton?: boolean;
}

const Myiten: React.FC<MytextProps> = ({ children, style, onEdit, onDel, }) => {
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

const MyCorrelated: React.FC<MyCorrelatedprops> = ({ children, style, onEdit, onDel, relatedItems, showEditButton = true, showDeleteButton = true }) => {
  return(
    <TouchableOpacity style={style}>
      {children}
      <View>
      {showEditButton &&
        <MyButton onPress={onEdit} title="Editar" />}
        {showDeleteButton &&
        <MyButton style={{ marginTop: 20 }} onPress={onDel} title="Deletar" />}
      </View>
    </TouchableOpacity>
);
}
        

export  {Myiten, MyCorrelated}


const styles = StyleSheet.create({
  row : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',}
})