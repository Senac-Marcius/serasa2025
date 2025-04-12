import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';

interface MyListProps {
  data: any[];
  style?: ViewStyle;
  renderItem: (args: { item: any; index: number }) => JSX.Element;
  keyItem: (item: any, index: number) => string;
}

const MyList: React.FC<MyListProps> = ({ data, style, renderItem, keyItem }) => {
  return (
    <View style={[styles.listContainer, style]}>
      {data.map((item, index) => (
        <View key={keyItem(item, index)} style={styles.cardWrapper}>
          {renderItem({ item, index })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 16,
  },
  cardWrapper: {
    width: 300, // Tamanho fixo para os cards
  },
});

export default MyList;
