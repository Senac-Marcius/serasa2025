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
    <View style={[styles.card, style]}>
      <View style={styles.content}>{children}</View>
      <View style={styles.buttonGroupShiftSlightLeft}>
        <MyButton
          onPress={onEdit}
          title="EDITAR"
          button_type="edit"
          height={34}
          width={90}
          font_size={13}
          color="#8E44AD"
        />
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
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
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