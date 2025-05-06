import React from 'react';
import { View, TextInput, ViewStyle, TextStyle,StyleSheet } from "react-native";
import { IconButton } from 'react-native-paper';

interface MySearchProps {
  style?: ViewStyle;
  styleInput?: TextStyle;
  onChangeText(busca: string): void;
  onPress(): void;
  busca: string;
  placeholder: string;
}

const MySearch: React.FC<MySearchProps> = ({ onChangeText, style, onPress, busca, placeholder, styleInput }) => {

    const inputTextStyle = {
        flex: 1,
        fontSize: 14,
        color: '#000',
        paddingVertical: 0,
        outlineWidth: 0,
      };
  return (
    <View style={[{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f3f4f6', // cinza claro (tailwind: bg-gray-100)
      borderRadius: 25,
      paddingHorizontal: 12,
      paddingVertical: 6,
      elevation: 2, // leve sombra no Android
     
      shadowOpacity: 0.1,
      shadowRadius: 3,
      shadowOffset: { width: 0, height: 2 },
    }, style]}>
      
      <IconButton
        icon="magnify"
        size={20}
        onPress={onPress}
        style={{ margin: 0, marginRight: 6 }}
        iconColor="#6b7280" // tailwind: text-gray-500
      />

      <TextInput
        style={[{
          flex: 1,
          fontSize: 16,
          color: '#111827', // tailwind: text-gray-900
          paddingVertical: 4,
         
        }, styleInput, inputTextStyle]}
        placeholder={placeholder || "Pesquisar..."}
        placeholderTextColor="#9ca3af" // tailwind: text-gray-400
        value={busca}
        onChangeText={onChangeText}
        returnKeyType="search"
        onSubmitEditing={onPress}
      />
    </View>
  );
};

export default MySearch;


