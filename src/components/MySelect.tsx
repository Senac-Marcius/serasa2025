import React, { Children, ReactNode, useState } from 'react'
import { Text, TextStyle, TouchableOpacity, View, ViewStyle, StyleSheet } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { Button, List } from 'react-native-paper'; 
import { Myinput } from './MyInputs';

interface MySelectProps {
    label: string;
    list: {key:any, option:string}[]
    setLabel(item:string):void;
    setKey?(key:any):void;
}

const MySelect: React.FC<MySelectProps> = ({label, list, setLabel, setKey}) => {  
    const [visible, setVisible] = useState(false) 

    return (      //'#6200ea'
        <View>
            <TouchableOpacity 
                style={{ 
                  height: 50, 
                  margin: 10,
                  width: 300,  
                  borderRadius: 25, 
                  paddingHorizontal: 15,
                  backgroundColor: 'white',  
                  borderWidth: 2,
                  borderColor: 'purple', 
                  shadowColor: 'purple', 
                  shadowOffset: { width: 2, height: 1 }, 
                  shadowOpacity: 0.6, 
                  shadowRadius: 4, 
                  elevation: 4
                }} 
                onPress={() => setVisible(!visible)}
            >
                <Text style={{ color: 'black', fontSize: 16,  textAlign: 'center',}}>{label} </Text>
               
            </TouchableOpacity>

            {
                visible &&
                (<FlatList                                                          //estilos
                    data={list}
                    keyExtractor={(item) => item.key}
                    renderItem={(i) => (
                        <TouchableOpacity style = {{backgroundColor: "#813AB1", borderRadius: 20, width: 315}}onPress={()=>{
                            setLabel(i.item.option);

                            if(setKey){
                                setKey(i.item.option)
                            }
                            
                            setVisible(false)
                        }}>
                        
                        <Text style = {{
                          height: 50,  
                          margin: 5,
                          width: 300,
                          borderRadius: 10,    
                          paddingHorizontal: 15,
                          paddingVertical: 10,  
                          fontSize: 16,
                          backgroundColor: 'white',
                          color: "#666",
                          borderWidth: 2,
                          borderColor: "#813AB1",
                          shadowColor: "#813AB1",
                          shadowOffset: { width: 2, height: 1 },
                          shadowOpacity: 0.8,
                          shadowRadius: 4,
                          elevation: 4,
                        }}>{i.item.option}</Text>
                    </TouchableOpacity>
                    )}
                />)
                
            }
        </View>
    );
}

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
