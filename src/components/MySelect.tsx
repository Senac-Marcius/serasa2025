import React, { Children, ReactNode, useState } from 'react'
import { Text, TextStyle, TouchableOpacity, View, ViewStyle, StyleSheet } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { Button, List } from 'react-native-paper'; 

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
                    backgroundColor: "#813AB1", 
                    padding: 10, 
                    borderRadius: 5, 
                    alignItems: 'center' 
                }} 
                onPress={() => setVisible(!visible)}
            >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>{label}</Text>
            </TouchableOpacity>

            {
                visible &&
                (<FlatList 
                    data={list}
                    keyExtractor={(item) => item.key}
                    renderItem={(i) => (
                        <TouchableOpacity onPress={()=>{
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
