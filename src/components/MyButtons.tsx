import React, { useState, useEffect, useRef } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  View,
  Animated,
  Easing
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
    case "circle": return styles.button_circle;
    case "capsule": return styles.button_capsule;
    case "round": return styles.button_round;
    case "rect":
    case "loading": return styles.button_rect;
    case "edit": return styles.button_edit;
    case "delete": return styles.button_delete;
    default: return styles.button_default;
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
  font_size = 14,
  text_color = "white",
  iconSize = 20,
  gap = 6,
  iconColor = "white",
  height,
  width,
}) => {
  const [loading, setLoading] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      rotateAnim.stopAnimation();
      rotateAnim.setValue(0);
    }
  }, [loading]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  async function onPressInternal() {
    setLoading(true);
    try {
      onPress && await onPress();
    } finally {
      setLoading(false);
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
          loading && styles.botaoDesabilitado
        ]}
        onPress={onPressInternal}
        disabled={loading}
      >
        {loading ? (
          <Animated.View
            style={[
              styles.spinner,
              { transform: [{ rotate: rotateInterpolate }] }
            ]}
          />
        ) : (
          <>
            {icon && <Icon size={iconSize} source={icon} color={iconColor} />}
            {title && (
              <Text style={[styles.button_text, { fontSize: font_size, color: text_color }]}>
                {title}
              </Text>
            )}
          </>
        )}
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
    backgroundColor: "#A569BD",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  button_delete: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  button_text: {
    fontWeight: "600",
  },
  spinner: {
    width: 20,
    height: 20,
    borderWidth: 3,
    borderColor: '#fff',
    borderTopColor: 'transparent',
    borderRadius: 10,
  },
  botaoDesabilitado: {
    opacity: 0.7,
  },
});

export default MyButton;
