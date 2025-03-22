import React, {ReactNode} from 'react';
import { Text, View, ViewStyle, TouchableOpacity } from 'react-native';

interface MySupportProps {
    style: ViewStyle;
    children: ReactNode;
}

const MySupport: React.FC<MySupportProps> = ({children, style}) => {
    return (
        <TouchableOpacity></TouchableOpacity>
)
}
export default MySupport
