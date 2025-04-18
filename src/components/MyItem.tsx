import React, { ReactNode } from 'react';
import { Text, View, TouchableOpacity, ViewStyle, StyleSheet } from 'react-native';
import MyButton from './MyButtons';
import { Button } from 'react-native-paper';


interface MyItemProps {
  children?: ReactNode;
  style?: ViewStyle | ViewStyle[];
  onEdit?(): void;
  onDel?(): void;
  button?: ReactNode;
}

const MyItem: React.FC<MyItemProps> = ({ children, style, onEdit, onDel}) => {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.content}>{children}</View>
      <View style={styles.buttonGroupShiftSlightLeft}>
        {onEdit && (<MyButton
          onPress={onEdit}
          title="EDITAR"
          button_type="edit"
        />)}
        {onDel && (<MyButton
          onPress={onDel}
          title="EXCLUIR"
          button_type="delete"
          color="#E74C3C"
          style={{ marginLeft: 10 }}
        />)}
      </View>
    </View>
  );
};

const MyTb : React.FC<MyItemProps> = ({children, onEdit, onDel, button }) =>{
    return(
      <View style={[styles.tableRow]}>
        {children}
        <View style={styles.actions}>
        {onEdit && ( <MyButton
            onPress={onEdit}
            title="EDITAR"
            button_type="edit"
          />)}
        {onDel && (<MyButton
            onPress={onDel}
            title="EXCLUIR"
            button_type="delete"
            color="#E74C3C"
            
          />)}{button}
        </View>
      </View>
    );

};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  
  content: {
    width:'100%',
    flexDirection: 'row',
    marginBottom: 12,
    alignItems:'center',
    
  },

  buttonGroupShiftSlightLeft: {
    justifyContent: 'flex-start',
    paddingLeft: 8,
    gap: 10,
    marginRight: 20,
  },

  th: {
    flex: 1,
     fontWeight: '600',
      fontSize: 13,
       color: '#333'
    },
    
    td: {
      flex: 1,
      fontSize: 13,
      color: '#444' 
     },

     actions: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      gap: 12,
      paddingLeft: 8,
    },
    
    tableRow: {
      flexDirection: 'row',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    
});

export { MyItem, MyTb };