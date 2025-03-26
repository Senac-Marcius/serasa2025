import React,{ ReactNode} from 'react';
import { View, ViewStyle } from 'react-native';

interface MyNotifyProps { 
    children: ReactNode;
    style: ViewStyle;
}

const MyNotify: React.FC< MyNotifyProps > = ({children, style}) => {
    return (<View style={style}>{children}</View>);
} 
    


export default MyNotify