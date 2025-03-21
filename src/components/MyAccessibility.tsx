import React, {ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';

interface MyAccessProps {
    children: ReactNode;
    style: ViewStyle | ViewStyle[];
}
const MyAccess: React.FC< MyAccessProps >  = ({children, style}) => {
    return ( <View style={style}>
        {children}
        </View>
    );
}
export default MyAccess
    
