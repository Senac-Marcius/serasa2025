import React, {ReactNode} from 'react';
import {View, ViewStyle, Text} from 'react-native';



interface MyMoreProps {
    children: ReactNode;
    style: ViewStyle | ViewStyle [];
}

const MyMore: React.FC < MyMoreProps > = ({children, style}) => {
    return (
        <View style = {style}>
            <Text> Bem Vindo</Text>
            {children}
        </View>

    ); 
}

export default MyMore 