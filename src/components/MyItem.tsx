import React, { ReactNode } from 'react';
import { Text, View, TouchableOpacity, ViewStyle, StyleSheet } from 'react-native';
import MyButton from './MyButtons';

type RelatedItem = {
  id: number;
  name: string;
};

interface MyItemProps {
  children?: ReactNode;
  style?: ViewStyle | ViewStyle[];
  onEdit?(): void;
  onDel?(): void;
}

interface MyCorrelatedProps {
  children?: ReactNode;
  style?: ViewStyle | ViewStyle[];
  onEdit?(): void;
  onDel?(): void;
  relatedItems?: RelatedItem[];
  showEditButton?: boolean;
  showDeleteButton?: boolean;
}

const MyItem: React.FC<MyItemProps> = ({ children, style, onEdit, onDel }) => {
  return (
          <TouchableOpacity style={[style? style:'', styles.card]}>
            {children}
            <View>
              <MyButton onPress={onEdit} title='Editar'></MyButton>
              <MyButton  style={{marginTop: 20 }} onPress={onDel} title='Deletar' color='red'></MyButton> 

            </View>
        </TouchableOpacity>
        );
}

const MyCorrelated: React.FC<MyCorrelatedprops> = ({ children, style, onEdit, onDel, relatedItems, showEditButton = true, showDeleteButton = true }) => {
  return(
    <TouchableOpacity style={[style? style:'',  styles.card]}>
      {children}
      <View >
      {showEditButton &&
        <MyButton style={{ justifyContent:'center'}} onPress={onEdit} title="Editar" />}
        {showDeleteButton &&
        <MyButton style={{ justifyContent:'center'}} onPress={onDel} title="Deletar" />}
      </View>
    </View>
  );
};

const MyCorrelated: React.FC<MyCorrelatedProps> = ({children,style,onEdit,onDel,relatedItems,showEditButton = true,showDeleteButton = true,}) => {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.content}>{children}</View>
      <View style={styles.buttonGroupShiftSlightLeft}>
        {showEditButton && (
          <MyButton
            onPress={onEdit}
            title="EDITAR"
            button_type="edit"
            height={34}
            width={90}
            font_size={13}
            color="#8E44AD"
          />
        )}
        {showDeleteButton && (
          <MyButton
            onPress={onDel}
            title="EXCLUIR"
            button_type="delete"
            height={34}
            width={90}
            font_size={13}
            color="#E74C3C"
            style={{ marginLeft: 10 }}
          />
        )}
      </View>
    </View>
  );
};

export { MyItem, MyCorrelated };

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, 
  },
  content: {
    marginBottom: 12,
  },
  buttonGroupShiftSlightLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 8,
    gap: 10,
  },
});