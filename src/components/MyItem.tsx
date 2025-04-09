import React, { ReactNode } from 'react';
import { Text, View, TextStyle,TouchableOpacity, ViewStyle, StyleSheet } from 'react-native';
import MyButton from './MyButtons';

type RelatedItem = {
  id: number;
  name: string;
};

interface MytextProps {
  children?: ReactNode;
  style?: ViewStyle | ViewStyle[];
  onEdit?(): void;
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

const MyItem: React.FC<MytextProps> = ({ children, style, onEdit, onDel, }) => {
  return (
          <TouchableOpacity style={styles.card}>
            {children}
            <View  style={styles.button}>
              <MyButton style={{ justifyContent:'center'}}  onPress={onEdit} title='Editar'></MyButton>
              <MyButton  style={{ justifyContent:'center'}} onPress={onDel} title='Deletar'></MyButton> 

            </View>
        </TouchableOpacity>
        );
}

const MyCorrelated: React.FC<MyCorrelatedprops> = ({ children, style, onEdit, onDel, relatedItems, showEditButton = true, showDeleteButton = true }) => {
  return(
    <TouchableOpacity style={styles.card}>
      {children}
      <View >
      {showEditButton &&
        <MyButton style={{ justifyContent:'center'}} onPress={onEdit} title="Editar" />}
        {showDeleteButton &&
        <MyButton style={{ justifyContent:'center'}} onPress={onDel} title="Deletar" />}
      </View>
    </TouchableOpacity>
);
}
        

export  {MyItem, MyCorrelated}


const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    marginBottom: 8,
    marginHorizontal: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, 
   
  },

  button:{
    alignItems: 'center',
    justifyContent:'center',
    gap:10
  }
})