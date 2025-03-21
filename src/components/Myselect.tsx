import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native'; 

interface MySelectProps {
    children: ReactNode;
    style: ViewStyle;
}

const MySelect: React.FC< MySelectProps > = ({children, style}) => {
    return (<View style={style}>{children}</View>); 
    
}

export default MySelect         ddddsd                      //estamos exportando una variável