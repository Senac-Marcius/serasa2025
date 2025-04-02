import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import MyButton from "../src/components/Mybuttons";
import MyView from "../src/components/MyView";
import { Myiten,MyCorrelated } from "../src/components/myItenlist";

export default function StudentsScreen() {
  return (
    <MyView>
      <MyCorrelated style={styles.hero } showDeleteButton = {false} showEditButton = {false} >
           <MyButton  button_type="circle" width={70} height={70} icon="library" iconColor="white" iconSize={30} bottom_text="Teste" font_size={12} text_color="black"></MyButton>
           <MyButton  button_type="circle" width={70} height={70} icon="hand-coin" iconColor="white" iconSize={30}></MyButton>
           <MyButton  button_type="circle" width={70} height={70} icon="finance" iconColor="white" iconSize={30}></MyButton>
           <MyButton  button_type="circle" width={70} height={70} icon="book" iconColor="white" iconSize={30}></MyButton>
           <MyButton  button_type="circle" width={70} height={70} icon="book-open" iconColor="white" iconSize={30}></MyButton>
           <MyButton  button_type="circle" width={70} height={70} icon="receipt" iconColor="white" iconSize={30}></MyButton>
           <MyButton  button_type="circle" width={70} height={70} icon="file-clock" iconColor="white" iconSize={30}></MyButton>
           <MyButton  button_type="circle" width={70} height={70} icon="room-service" iconColor="white" iconSize={30}></MyButton>


      </MyCorrelated>
    </MyView>
  );
}

const styles = StyleSheet.create({

hero:{
  boxShadow:"0px 4px 10px -6px rgba(0,0,0,0.32)",
  width:310,
  height:505,
  borderRadius:25,
  alignSelf:"center",
  marginTop:40,
  paddingHorizontal:45,
  paddingVertical:23,
  flexDirection:"row",
  flexWrap:"wrap",
  columnGap:80,
  
  
},



});
