import React from 'react';
import { View, ViewStyle, StyleSheet, Dimensions } from 'react-native';

interface MyListProps {
  data: any[];
  style?: ViewStyle;
  renderItem: (args: { item: any; index: number }) => JSX.Element;
  keyItem: (item: any, index: number) => string;
}

const { width } = Dimensions.get('window');

const cardMinWidth = width > 768 ? 240 : width - 24;

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
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  cardWrapper: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: cardMinWidth,
    maxWidth: cardMinWidth,
    margin: 4, 
  },
});

export default MyList;
