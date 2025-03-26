import React, {ReactNode} from "react";
import {Text, View, ViewStyle, TouchableOpacity, StyleSheet} from "react-native";
import { Appbar, Drawer, Icon} from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';


interface MyVoltarProps {
    style?: ViewStyle;
    onPress?: () => void;

  }
  
  const MyVoltar: React.FC<MyVoltarProps> = ({ style, onPress }) => {
    return (
      <TouchableOpacity
        style={[{ position: "absolute", top: 20, left: 20 }, style]}
        onPress={onPress}
      >
        <AntDesign name="arrowleft" size={24} color="blue" />
        </TouchableOpacity>
    );
  };
  
  
 const style= StyleSheet.create({
    voltarButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
      },
      voltarText: {
        color: 'blue',
        fontSize: 16,
      }
    });
 

  export default MyVoltar;