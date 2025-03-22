import {View, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
 
 
interface MyLoginProps{
    children: ReactNode;
    style: ViewStyle | ViewStyle[];
}
const MyLogin: React.FC<MyLoginProps> = ({children, style}) => {
    return (<View style={style}>/{children}</View>);
 
}
 
export default MyLogin