import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, View } from "react-native";
import { Button, Icon , MD3Colors} from "react-native-paper";

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
            
        </View>
    )
}

export default MyColorPicker


