import React from 'react';
import { TextInput, TextStyle, View, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface MyinputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: TextStyle | TextStyle[];
  label: string;
  iconName: string;
}

interface MyCheckProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

interface MyTextAreaProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: TextStyle | TextStyle[];
  label: string;
  iconName: string;
}

const inputContainerStyle = {
  flexDirection: 'row' as const,
  alignItems: 'center' as const,
  backgroundColor: '#FFFFFF',
  borderWidth: 1, 
  borderColor: '#D9D9D9',
  borderRadius: 8,
  paddingHorizontal: 12,
  height: 42,
};

const inputTextStyle = {
  flex: 1,
  fontSize: 14,
  color: '#000',
  paddingVertical: 0,
};

const labelStyle = {
  fontWeight: '600' as const,
  marginBottom: 6,
  color: '#6A1B9A',
  fontSize: 14,
};

const Myinput: React.FC<MyinputProps> = ({ value, onChangeText, placeholder, style, label, iconName }) => {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={labelStyle}>{label}</Text>
      <View style={inputContainerStyle}>
        <Icon name={iconName} size={18} color="#6A1B9A" style={{ marginRight: 8 }} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#999"
          style={[inputTextStyle, style]}
        />
      </View>
    </View>
  );
};

const MyTextArea: React.FC<MyTextAreaProps> = ({ value, onChangeText, placeholder, style, label, iconName }) => {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={labelStyle}>{label}</Text>
      <View style={{
        ...inputContainerStyle,
        alignItems: 'flex-start',
        paddingTop: 10,
        minHeight: 100
      }}>
        <Icon name={iconName} size={18} color="#6A1B9A" style={{ marginRight: 8, marginTop: 4 }} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#999"
          multiline
          style={[inputTextStyle, { minHeight: 80, textAlignVertical: 'top' }, style]}
        />
      </View>
    </View>
  );
};

const MyCheck: React.FC<MyCheckProps> = ({ label, checked, onToggle }) => {
  return (
    <Pressable style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }} onPress={onToggle}>
      <View style={{
        width: 22,
        height: 22,
        borderRadius: 6,
        backgroundColor: checked ? '#6A1B9A' : '#AAA',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8
      }}>
        <Icon name={checked ? 'check' : 'close'} size={16} color="white" />
      </View>
      <Text style={{ fontSize: 14, color: '#333' }}>{label}</Text>
    </Pressable>
  );
};

export { Myinput, MyCheck, MyTextArea };
