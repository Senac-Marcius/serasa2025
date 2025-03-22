
import React, {ReactNode} from 'react';
import {Text, View, ViewStyle} from "react-native";

interface MySearchProps {
    style: ViewStyle;
    children: ReactNode;
}

const MySearch: React.FC<MySearchProps> = ({children, style}) => {
    return (
        <View>
            <Text> Ola Componente </Text>
            {children}
            <Text> Tchau Componente </Text>
        </View>
    );
}

export default MySearch

