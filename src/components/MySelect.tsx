import React, { Children, ReactNode, useState } from 'react'
import { Text, TextStyle, TouchableOpacity, View, ViewStyle, StyleSheet } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { Myinput } from './MyInputs';
import { inputStyles } from '../../styles/inputStyles';
import AntDesign from '@expo/vector-icons/AntDesign';


interface MySelectProps {
    label: string;
    list: {key:any, option:string}[]
    setLabel(item:string):void;
    setKey?(key:any):void;
}

interface MyTextAreaProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: TextStyle | TextStyle[];
  label: string;
  iconName: string;
}


const MySelect: React.FC<MySelectProps> = ({ label, list, setLabel, setKey }) => {  
  const [visible, setVisible] = useState(false);

  return (
      <View style={{ marginVertical: 10 }}>
          <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              marginBottom: 5,
              marginLeft: 11,  
          }}>
              <AntDesign 
                  name="select1"  //importação de ícones: para ter acesso à eles, IMPORTE: " import AntDesign from '@expo/vector-icons/AntDesign'; " e busque no site:  @expo/vector-icons/AntDesign
                  size={18} 
                  color="purple"                                                           
                  style={{  marginLeft: 9,  // Indentação adicional da borda esquerda
                    marginRight: 5}}
              />
              <Text style={{ 
                  color: '#666', 
                  fontSize: 16, 
                  fontWeight: '500' 
              }}>
                Uso do select (substitua o texto e o ícone)  {/* Substitua pelo seu texto */}
              </Text>
          </View>

      
          <TouchableOpacity 
              style={{ 
                  height: 50,
                  marginHorizontal: 11,
                  width: 1330,
                  borderRadius: 25,
                  paddingHorizontal: 15,
                  backgroundColor: 'white',
                  borderWidth: 2,
                  borderColor: '#666',
                  shadowColor: 'purple',
                  shadowOffset: { width: 2, height: 1 },
                  shadowOpacity: 0.6,
                  shadowRadius: 4,
                  flexDirection: 'row',
                  alignItems: 'center',
              }} 
              onPress={() => setVisible(!visible)}
          >
              <Text style={{ 
                  color: '#666666', 
                  fontSize: 15,
                  fontWeight: '400',
                  flex: 1,
              }}>
                  {label || 'Selecione...'}
              </Text>
              <AntDesign 
                  name="down" 
                  size={18} 
                  color="purple" 
              />
          </TouchableOpacity>

          {visible && (
              <FlatList
                  style={{
                      width: 1330,
                      marginHorizontal: 11,
                      marginTop: 5,
                      backgroundColor: '#813AB1',
                      borderRadius: 10,
                      elevation: 4,
                      maxHeight: 200,
                  }}

                  data={list}
                  keyExtractor={(item) => item.key}
                  renderItem={({ item }) => (
                        <TouchableOpacity 
                          style={{ 
                              paddingVertical: 12,
                              paddingHorizontal: 15,
                          }}
                          onPress={() => {
                              setLabel(item.option);
                              if (setKey) setKey(item.key);
                              setVisible(false);
                          }}
                        >
                          <Text style={{ color: 'white', fontSize: 15 }}>
                              {item.option}
                          </Text>
                      </TouchableOpacity>
                  )}
              />
          )}
      </View>
  );
};

const MyTextArea: React.FC<MyTextAreaProps> = ({ value, onChangeText, placeholder, style, label, iconName }) => {
  return (
    <View style={inputStyles.container}>
      
      <View style={inputStyles.labelContainer}>
        <Text style={inputStyles.label}>{label}</Text>
      </View>
      <TextInput
        style={[inputStyles.textArea, style]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline={true}
      />
    </View>
  );
};

export default MySelect

