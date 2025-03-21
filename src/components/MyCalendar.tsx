import { View } from 'native-base';
import { Text, ViewStyle } from 'react-native';
import React, {ReactNode}  from "react";

interface MyCalendarProp {
    style: ViewStyle;
    children: ReactNode;
}
 

const MyCalendar: React.FC <MyCalendarProp> = ({children, style}) => {
    return (
        <View style={style}>
        <Text>ola componente</Text>
        {children}
        </View>
    );
}
const MyCalendar2 = () => {
    return (
        <Text>ola componente2</Text>
        
    );
}

export {MyCalendar, MyCalendar2}