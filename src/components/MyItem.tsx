import React, { ReactNode } from 'react';
import {  View, ViewStyle, StyleSheet } from 'react-native';
import MyButton from './MyButtons';



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
    
    tableRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      backgroundColor: '#fff',
      borderRadius: 8,
      marginHorizontal: 12,
      marginBottom: 8,
      elevation: 1,
    },
    
    actions: {
      flexDirection: 'row',
      marginLeft: 'auto', // move os botões pro final da linha
      gap: 10,
    },
        
});

export { MyItem, MyTb };