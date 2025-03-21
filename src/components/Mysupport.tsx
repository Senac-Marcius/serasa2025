import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';

interface MySupportProps {
    children: ReactNode;
    style: ViewStyle;
}



const MySupport: React.FC<MySupportProps> = ({ children, style }) => {
    return ( <View style={style}>{children}</View>);


}
export default MySupport
