import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import { Icon, MD3Colors } from "react-native-paper";

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
  onPress?: () => void;
  button_type?: Button_type;
  icon?: string;
  style?: ViewStyle;
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
  onPress,
  button_type = "default",
  icon,
  style,
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
    <TouchableOpacity
      style={[getButtonType(button_type), style]}
      onPress={onPressIntenal}
    >
      {icon && <Icon size={20} source={icon} color="#fff" />}
      <Text style={styles.button_text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button_circle: {
    backgroundColor: "#813AB1",
    padding: 10,
    borderRadius: 100,
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  button_capsule: {
    borderRadius: 50,
    backgroundColor: "#813AB1",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  button_round: {
    backgroundColor: "#813AB1",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  button_rect: {
    backgroundColor: "#813AB1",
    padding: 10,
    borderRadius: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  button_default: {
    backgroundColor: "#813AB1",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  button_edit: {
    backgroundColor: "#813AB1",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  button_delete: {
    backgroundColor: "#FF4C4C",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  button_text: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default MyButton;


//<MyButton title="EDITAR" button_type="edit" onPress={() => {}} />
//<MyButton title="EXCLUIR" button_type="delete" onPress={() => {}} />