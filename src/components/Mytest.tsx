import React, {Children, ReactNode, useState}  from "react";
import {  Text, TouchableOpacity, View, ViewStyle, StyleSheet } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import {Button, List } from "react-native-paper";

interface MyTestProps {
  label: string;
  list: {key: any, option: string}[];
  setLabel(item:string):void;
  setKey?(key:any):void;
}

const [visible, setVisible] = useState(false)

const MyTest: React.FC<MyTestProps> = ({label, list, setLabel, setKey}) => {
  return (
    <View>
      <Button onPress={ ()=> {setVisible(true)} }>{label}   </Button>
      {
        visible &&    
        (<FlatList 
            data={list}
            keyExtractor={(item) => item.key}
            renderItem={(item) => (
              <TouchableOpacity onPress={()=>{
                setLabel(item.item.option);
                if(setKey){
                  setKey(item.item.key)
                }
              }}>
                <Text>{item.item.option}</Text>
              </TouchableOpacity>
            )}
        />)
      }
    </View>
  );
}

export default MyTest

const styles = StyleSheet.create({
  item:{

  }
})
