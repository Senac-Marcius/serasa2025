import React, { ReactNode } from 'react';
import { View, ViewStyle, StyleSheet, Dimensions } from 'react-native';

interface MyListProps {
  data: any[];
  style?: ViewStyle;
  renderItem: (args: { item: any; index: number }) => JSX.Element;
  keyItem: (item: any, index: number) => string;
  header?: ReactNode;
  styleItem?: ViewStyle;
}

const MyList: React.FC<MyListProps> = ({ data, style, renderItem, keyItem, header, styleItem}) => {
  return (
    <View style={style}>
       {header}
      <View style={[ styleItem]}>
       
        {data.map((item, index) => (
          <View key={keyItem(item, index)} >
            {renderItem({ item, index })}
          </View>
        ))}
      </View>
    </View>
  );
};


export default MyList;
