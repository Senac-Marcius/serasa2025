import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import { Icon } from "react-native-paper";
 
type Button_type = "default" | "round" | "circle" | "rect" | "capsule" |"loading";
 
interface MyButtonProps {
  title: string;
  onPress?: () => void;
  button_type?: Button_type;
  Icon?: string;
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
    default:
      return styles.button_default;
  }
}
 
const MyButton: React.FC<MyButtonProps> = ({
  title,
  onPress,
  button_type = "default",
  style,
}) => {
 
    const [loading, setLoading] = useState(false)
 
    function onPressIntenal(){
        if(button_type == "loading"){
            setLoading(true)
            setTimeout(() => {
              if(onPress) onPress();
                setLoading(false)
            }, 2000)
        }else{
            if(onPress) onPress();
        }
    }
  return (
    <TouchableOpacity
      style={[getButtonType(button_type), style]}
      onPress={onPressIntenal}
    >
      {/* <Text style={styles.button_text}>{loading && (<Icon></Icon>) }{title}</Text> */}
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
  },
  button_round: {
    backgroundColor: "#813AB1",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  button_rect: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#813AB1",
    padding: 10,
    borderRadius: 0,
  },
  button_default: {
    backgroundColor: "#813AB1",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
  },
  button_text: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
 
export default MyButton;
 
 