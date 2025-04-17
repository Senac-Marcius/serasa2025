import React, { Children, ReactNode, useState } from 'react'
import { Text, TextStyle, TouchableOpacity, View, ViewStyle, StyleSheet } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { Button, List } from 'react-native-paper'; 
import { Myinput } from './MyInputs';
import { inputStyles } from '../../styles/inputStyles';
import AntDesign from '@expo/vector-icons/AntDesign';


interface MySelectProps {
  
    caption?: string;
    label: string;
    list: {key:any, option:string}[]
    setLabel(item:string):void;
    setKey?(key:any):void;
}


const MySelect: React.FC<MySelectProps> = ({ caption, label, list, setLabel, setKey }) => {  
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
                    color="#6A1B9A" 
                    style={{  marginLeft: 0.1,  // Indentação adicional da borda esquerda
                    marginRight: 5}}
                />  

                <Text 
                
                style={{ 
                    color: '#6A1B9A', 
                    fontSize: 16, 
                    fontWeight: '300' 
                }}>
                    {caption? caption : 'Selecione abaixo:' }
                </Text>

                

          </View>

      
          <TouchableOpacity 
              style={{ 
                  height: 44,  //tudo ok
                  marginHorizontal: 1, //
                  width: 1353, //
                  borderRadius: 11,
                  paddingHorizontal: 15, //
                  backgroundColor: 'white',
                  borderWidth: 0.1, //
                  borderColor: '#666', //
                  shadowColor: '#666',
                  shadowOffset: { width: 0, height: 0 }, ///
                  shadowOpacity: 0.6,
                  shadowRadius: 0, //
                  flexDirection: 'row',
                  alignItems: 'center',
              }} 
              onPress={() => setVisible(!visible)}
          >
              <Text style={{ 
                  color: '#666', 
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
                      width: 1353,
                      marginHorizontal: 1,
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


export default MySelect

