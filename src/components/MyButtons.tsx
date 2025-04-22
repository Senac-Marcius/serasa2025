import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  View,
} from "react-native";
import { Icon } from "react-native-paper";

type Button_type =
  | "default"
  | "round"
  | "circle"
  | "rect"
  | "capsule"
  | "loading"
  | "edit"
  | "delete";

interface MyButtonProps {
  title?: string;
  bottom_text?: string;
  onPress?: () => void;
  button_type?: Button_type;
  icon?: string;
  style?: ViewStyle;
  iconSize?: number;
  iconColor?: string;
  color?: string;
  width?: number;
  height?: number;
  font_size?: number;
  text_color?: string;
  gap?: number;
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
    case "edit":
      return styles.button_edit;
    case "delete":
      return styles.button_delete;
    default:
      return styles.button_default;
  }
}

const MyButton: React.FC<MyButtonProps> = ({
  title,
  bottom_text,
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
    if (button_type === "loading") {
      setLoading(true);
      setTimeout(() => {
        onPress && onPress();
        setLoading(false);
      }, 2000);
    } else {
      onPress && onPress();
    }
  }

  return (
    <View>
      <TouchableOpacity
        style={[
          getButtonType(button_type),
          style,
          {
            backgroundColor: color,
            height: height,
            width: width,
            gap: gap,
          },
        ]}
        onPress={onPressIntenal}
      >
        {icon && <Icon size={iconSize} source={icon} color={iconColor} />}
        <Text style={[styles.button_text, { fontSize: font_size, color: text_color }]}>
          {title}
        </Text>
      </TouchableOpacity>

      {bottom_text && (
        <Text
          style={{
            fontSize: font_size,
            color: text_color,
            textAlign: "center",
            fontWeight: "bold",
            marginTop: 5,
          }}
        >
          {bottom_text}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button_circle: {
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  button_capsule: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
  },
  button_round: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  button_rect: {
    padding: 10,
    borderRadius: 0,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  button_default: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  button_edit: {
    backgroundColor: "#813AB1",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  button_delete: {
    backgroundColor: "#FF4C4C",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  button_text: {
    fontWeight: "600",
    marginLeft: 5,
  },
});

export default MyButton;
