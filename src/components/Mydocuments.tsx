import React, {ReactNode} from 'react';
import { View, ViewStyle } from 'react-native';

interface MyDocumentProps{
    children: ReactNode;
    style: ViewStyle;
}

const MyDocument: React.FC< MyDocumentProps >= ({children, style}) => {
    return (<View style={style}> {children} </View>);
}
export default MyDocument