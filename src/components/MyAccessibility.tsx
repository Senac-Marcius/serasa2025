import React, {ReactNode } from 'react';
import { Text, View, ViewStyle } from 'react-native';

interface MyAccessProps {
    children: ReactNode;
    style: ViewStyle | ViewStyle[];
}
const MyAccess: React.FC< MyAccessProps >  = ({children, style}) => {
    return ( <View style={style}>
        <Text>Olá componente</Text>
        {children}
        <Text>Tchau componente</Text>
        </View>
    );
}
export default MyAccess
    
