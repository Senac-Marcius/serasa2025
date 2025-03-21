import React, { ReactNode } from 'react';
import { ScrollView, View, ViewStyle } from 'react-native';


interface MyListProps {
    children: ReactNode;
    style: ViewStyle;
}

const myList :  React.FC< MyListProps > = ({children, style}) => {
    return (<View  style= {style}>{children}</View>);

}


export default myList

