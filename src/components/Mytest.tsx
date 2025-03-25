import React, {Children, ReactNode, useState}  from "react";
import { Text, TouchableOpacity, View, ViewStyle, StyleSheet } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { Button, List } from "react-native-paper";

interface MyTestProps {
  style?: ViewStyle;
  itens: string[];
  onPress(item:string): void;
  chendTheme(): void
}

const MyTest: React.FC<MyTestProps> = ({style, itens, onPress}) => {
  return (
    <FlatList
      style={style}
      data={itens}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => onPress(item)}>
          {item}
        </TouchableOpacity>
      )}
     />
  );
}

export default MyTest

const styles = StyleSheet.create({
  item:{

  }
})
