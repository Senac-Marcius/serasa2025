import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import MyButton from "../src/components/Mybuttons";
import MyView from "../src/components/MyView";

export default function StudentsScreen() {
  return (
    <MyView>
      <View style={styles.hero}>
           <MyButton  button_type="circle" width={70} height={70} icon="library" iconColor="white" iconSize={30}></MyButton>
           <MyButton  button_type="circle" width={70} height={70} icon="library" iconColor="white" iconSize={30}></MyButton>
           <MyButton  button_type="circle" width={70} height={70} icon="library" iconColor="white" iconSize={30}></MyButton>
           <MyButton  button_type="circle" width={70} height={70} icon="library" iconColor="white" iconSize={30}></MyButton>
           <MyButton  button_type="circle" width={70} height={70} icon="library" iconColor="white" iconSize={30}></MyButton>
           <MyButton  button_type="circle" width={70} height={70} icon="library" iconColor="white" iconSize={30}></MyButton>
           <MyButton  button_type="circle" width={70} height={70} icon="library" iconColor="white" iconSize={30}></MyButton>
           <MyButton  button_type="circle" width={70} height={70} icon="library" iconColor="white" iconSize={30}></MyButton>


      </View>
    </MyView>
  );
}

const styles = StyleSheet.create({

hero:{
  boxShadow:"0 1px 2px black ",
  width:310,
  height:505,
  borderRadius:25,
  alignSelf:"center",
  marginTop:40,
  paddingHorizontal:45,
  paddingVertical:23,
  flexDirection:"row",
  flexWrap:"wrap",
  
},



});
