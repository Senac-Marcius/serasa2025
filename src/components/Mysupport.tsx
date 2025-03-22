import React, {ReactNode} from 'react';
import { Text, View, ViewStyle } from 'react-native';

interface MySupportProps {
    style: ViewStyle;
    children: ReactNode;
}

const MySupport: React.FC<MySupportProps> = ({children, style}) => {
    return ( 
        <View style={style}>
        <Text>Ola Componente</Text>
        {children}
        <Text>Tchau Componente</Text>
        </View>
);
}
export default MySupport
