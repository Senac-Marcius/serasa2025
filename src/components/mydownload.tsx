import React, {ReactNode} from 'react';
import { Text, View, ViewStyle } from "react-native";

interface MydownloadProps {
    children: ReactNode;
    style: ViewStyle;
}


const Mydownload: React.FC< MydownloadProps> = ({children, style}) => {
    return (
        <View style= {style}>
            <Text>OLA COMPONENTE</Text>
            {children}
            <Text>TCHAU COMPONENTE</Text>
            </View>

    );
}

export default Mydownload