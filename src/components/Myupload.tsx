import React, {ReactNode} from 'react';
import {View, ViewStyle, Text} from 'react-native';
//import{button, list} from "react-native-paper"; utilizada para estilização do botom

interface MyUploadProps {
    children: ReactNode
    style: ViewStyle;
}

const MyUpload: React.FC < MyUploadProps > = ({children, style}) => {
    return (
        <View style={style}>
            <Text>
        
            </Text>
            {children}
            <Text>

            </Text>
        </View> 

    );
}

export default MyUpload 