import React, { Children, ReactNode, useState } from 'react'
import { Text, TouchableOpacity, View, ViewStyle, StyleSheet } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { Button, List } from 'react-native-paper'; 

interface MySelectProps {
    label: string;
    list: {key:any, option:string}[];
    setLabel(item:string):void;
    setKey?(key:any):void;
}

const MySelect: React.FC<MySelectProps> = ({label, list, setLabel, setKey}) => {  
    const [visible, setVisible] = useState(false) 

    return (
        <View>
            <Button onPress={ ()=> {setVisible(!visible)} }>{label}</Button>
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

    