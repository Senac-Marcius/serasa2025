import React,{ ReactNode} from 'react';
import { View, ViewStyle } from 'react-native';

interface MyLevelsProps { 
    children: ReactNode;
    style: ViewStyle;
}

const MyLevels: React.FC< MyLevelsProps > = ({children, style}) => {
    return (<View style={style}>{children}</View>);
}
export default MyLevels
