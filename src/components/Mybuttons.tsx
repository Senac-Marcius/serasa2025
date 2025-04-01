import { Flex, Row } from "native-base";
import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import { Icon } from "react-native-paper";

type Button_type =
  | "default"
  | "round"
  | "circle"
  | "rect"
  | "capsule"
  | "loading";

interface MyButtonProps {
  title?: string;
  onPress?: () => void;
  button_type?: Button_type;
  icon?: string;
  style?: ViewStyle;
  iconSize?: number;
  iconColor?: string;
  color?: string;
  width?: number;
  height?: number;
  font_size?:number;
  text_color?:string;
  gap?:number;
}

function getButtonType(button_type: Button_type): any {
  switch (button_type) {
    case "circle":
      return styles.button_circle;
    case "capsule":
      return styles.button_capsule;
    case "round":
      return styles.button_round;
    case "rect":
      return styles.button_rect;
    case "loading":
      return styles.button_rect;
    default:
      return styles.button_default;
  }
}

const MyButton: React.FC<MyButtonProps> = ({
  title,
  onPress,
  button_type = "default",
  color = "#813AB1",
  icon,
  style,
  font_size = 16,
  text_color = "white",
  iconSize = 30,
  gap = 10,
  iconColor = "white",
  height = button_type == "circle" ? 50 : 50,
  width = button_type == "circle" ? 50 : 190,
}) => {
  const [loading, setLoading] = useState(false);

  function onPressIntenal() {
    if (button_type == "loading") {
      setLoading(true);
      setTimeout(() => {
        () => {
          onPress && onPress();
        };
        setLoading(false);
      }, 2000);
    } else {
      onPress != undefined ? onPress() : "";
      setLoading(true);
    }
  }
  return (
    <TouchableOpacity
      style={[
        getButtonType(button_type),
        style,
        { backgroundColor: color, height: height, width: width,gap:gap },
      ]}
      onPress={onPressIntenal}
    >
      {icon && <Icon size={iconSize} source={icon} color={iconColor}></Icon>}
      {title && <Text style={{ fontSize: font_size, color: text_color }}>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button_circle: {
    borderRadius: 100,
    display: "flex",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  button_capsule: {
    display:"flex",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    
  },
  button_round: {
    display:"flex",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    
  },
  button_rect: {
    display:"flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 0,
    
  },
  button_default: {
    display:"flex",
    borderRadius: 15,
    alignItems: "center",
    flexDirection: "row",
    
  },
});

export default MyButton;
