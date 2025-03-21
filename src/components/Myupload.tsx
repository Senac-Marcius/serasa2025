import React, {ReactNode} from 'react';
import {View, ViewStyle, Text} from 'react-native';

interface MyUploadProps {
    children: ReactNode
    style: ViewStyle;
}

const MyUpload: React.FC < MyUploadProps > = ({children, style}) => {
    return (
        <View style={style}>
            <Text> fdfs</Text>
            {children}
            <Text> </Text>
        </View> 

    );
}

export default MyUpload 