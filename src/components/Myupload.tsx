import React, {ReactNode} from 'react';
import {View, ViewStyle, Text} from 'react-native';
import {Button}from "react-native-paper"
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
        


        
        </View> 

    );
}

export default MyUpload 