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
          <TouchableOpacity style={style}>
            {children}
            <View>
              <MyButton onPress={onEdit} title='Editar' color='yellow'></MyButton>
              <MyButton  style={{marginTop: 20 }} onPress={onDel} title='Deletar' color='red'></MyButton> 

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
        

export  {MyItem, MyCorrelated}


const styles = StyleSheet.create({
  row : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',}
})