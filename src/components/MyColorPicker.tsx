import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, View } from "react-native";
import { Button, Icon , MD3Colors} from "react-native-paper";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

type Button_type = "default" | "round" | "circle" | "rect" | "capsule" |"loading";

interface MyColorPickerProps {
  title?: string;
  onPress?: () => void;
  button_type?: Button_type;
  icon?: string;
  style?: ViewStyle;
}

const MyColorPicker: React.FC<MyColorPickerProps> = ({
    
}) => {
    return(
        <View>
            <Button style={styles.button_circle} mode="contained" onPress={() => console.log('Pressed')}><MaterialCommunityIcons style={{padding:-3}} name="format-color-fill" size={20} color="white"/></Button>
            <Button style={styles.button_circle} mode="contained" onPress={() => console.log('Pressed')}><MaterialIcons name="colorize" size={20} color="white" /></Button>
            <Button style={styles.button_circle} mode="contained" onPress={() => console.log('Pressed')}><Ionicons name="color-palette-outline" size={20} color="white" /></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    button_circle: {
        backgroundColor: "#813AB1",
        borderRadius: '100%',
        width: 55,
        height: 55,
        alignItems: "center",
        justifyContent: "center",
        display: 'flex',
        marginBottom:10,
      },
})

export default MyColorPicker


