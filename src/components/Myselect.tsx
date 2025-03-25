import React, { ReactNode } from 'react'
import { ViewStyle } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Button, List } from 'react-native-paper'; 

interface MySelectProps {
    style?: ViewStyle;
    onPress(): void;
    props: []
}

const MySelect: React.FC<MySelectProps> = ({style, onPress}) => {     //para passar uma parametro para a função, precisa-se utilizar "( )"
    return (
        <List.Item
            title= "Selecionar"
            style= {style}
            description= "Item description"
            onPress= {onPress}
            left= {props => <List.Icon {...props} icon ="folder"/>}
        />   
    );
}   

