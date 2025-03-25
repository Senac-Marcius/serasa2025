import React, {ReactNode, useState,  } from 'react';
import { Text, View, ViewStyle, TouchableOpacity,   } from 'react-native';

interface AccessiButtonProps {
    onPress: () => void;
    label: string;
    size?: number;
    color?: string;
    textColor?: string;
  }

  const MyAccess: React.FC<AccessButtonProps> = ({
    onPress,
    label,
    size = 60,
    color = '#6200ee',
    textColor = 'white',
  }) => {
    return (
      <TouchableOpacity
        style={[styles.button, { width: size, height: size, backgroundColor: color }]}
        onPress={onPress}
      >
        <Text style={[styles.text, { color: textColor }]}>{label}</Text>
      </TouchableOpacity>
    );
  }

  

interface MyAccessProps {
    children?: ReactNode;
    style?: ViewStyle | ViewStyle[];
}
const MyAccess: React.FC<MyAccessProps> = ({ children, style }) => {
    const [fontSize, setFontSize] = useState(16);
    const [highContrast, setHighContrast] = useState(false);
    const [grayscale, setGrayscale] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    return(

        <TouchableOpacity>fdsfdsfdsfdsfsd</TouchableOpacity>

    );
}


export default MyAccess
    
