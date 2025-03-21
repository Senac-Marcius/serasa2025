import React, {ReactNode} from 'react';
import {View, ViewStyle} from 'react-native';

interface MyUploadProps {
    children: ReactNode
    style: ViewStyle;
}

const MyUpload: React.FC < MyUploadProps > = ({children, style}) => {
    return (
        <View style={style}>{children}</View> 

    );
}

export default MyUpload 