import React, { Children, ReactNode, useState } from 'react'
import { Text, TextStyle, TouchableOpacity, View, ViewStyle, StyleSheet } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { Button, List } from 'react-native-paper'; 
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


const MySelect: React.FC<MySelectProps> = ({label, list, setLabel, setKey}) => {  
    const [visible, setVisible] = useState(false) 

    return (      //'#6200ea'
        <View>
            <TouchableOpacity 
                style={{ 
                  height: 50, //
                  margin: 11,  //
                  width: 300,   //
                  borderRadius: 25, //
                  paddingHorizontal: 15,  //
                  backgroundColor: 'white',  
                  borderWidth: 2,  //
                  borderColor: 'purple', 
                  shadowColor: 'purple', 
                  shadowOffset: { width: 2, height: 1 }, 
                  shadowOpacity: 0.6,  //
                  shadowRadius: 4,   //
                }} 
                onPress={() => setVisible(!visible)}
            >
                <Text style={{ color: '#666666', fontSize: 16, textAlign: 'left', fontWeight: '400'}}>{label} </Text>  
                <AntDesign style={{ color:'purple', position: 'absolute', right: 14}} name="down" size={18} color="purple" />
            </TouchableOpacity>

            {
                visible &&
                (<FlatList                                                          //estilos
                    style = {{ borderColor:'white', paddingHorizontal: 18, paddingVertical: 9, backgroundColor: '#813AB1',  shadowOffset: { width: 0.5, height: 0.5 }, shadowOpacity: 0.4, shadowRadius: 7,  }}
                    data={list}
                    keyExtractor={(item) => item.key}
                    renderItem={(i) => (
                        <TouchableOpacity style = {{ borderRadius: 90, width: 315}}onPress={()=>{
                            setLabel(i.item.option);

                            if(setKey){
                                setKey(i.item.option)
                            }
                            
                            setVisible(false)
                        }}>
                        
                        <Text>{i.item.option}</Text>
                    </TouchableOpacity>
                    )}
                />)
                
            }
        </View>
    );
}

const MyTextArea: React.FC<MyTextAreaProps> = ({ value, onChangeText, placeholder, style, label, iconName }) => {
  return (
    <View style={inputStyles.container}>
      
      <View style={inputStyles.labelContainer}>
        {/*<Icon style={inputStyles.icon} name="message" size={18} /> */}
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

const styles = StyleSheet.create({
    container: {
      /*  padding: ,
        backgroundColor: '#f8f8f8',
        borderRadius: 8, */ 
      },
      button: {
        backgroundColor: "purple",
        padding: 10,
        borderRadius: 5,
      },
      buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
      },
      listContainer: {
        marginTop: 5,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 3, // Sombras no Android
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      listItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },
      listItemText: {
        fontSize: 16,
      },

}); 
