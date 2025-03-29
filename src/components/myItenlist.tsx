import React, { ReactNode } from 'react';
import { Text, View, TextStyle,TouchableOpacity, ViewStyle, StyleSheet } from 'react-native';
import MyButton from './Mybuttons';

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

const MyCorrelated: React.FC<MyCorrelatedprops> = ({ children, style, onEdit, onDel, relatedItems }) => {
  return(
    <View>
    <TouchableOpacity style={style}>
      {children}
      <View>
        <MyButton onPress={onEdit} title="Editar" />
        <MyButton style={{ marginTop: 20 }} onPress={onDel} title="Deletar" />
      </View>
    </TouchableOpacity>
    <View style={{ marginTop: 20 }}>
      {relatedItems?.map((item) => (
        <View key={item.id}>
          <MyButton title={item.name} onPress={() => console.log(`Selecionar ${item.name}`)} />
        </View>
      ))}
    </View>
  </View>
);
}
        

export  {Myiten, MyCorrelated}
 