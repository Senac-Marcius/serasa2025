import React, {Children, ReactNode} from 'react';
import { View, ViewStyle } from 'react-native';

interface MySearchProps {
    children: ReactNode;
    style: ViewStyle;
}

const MySearch: React.FC < MySearchProps > = ({children, style}) => {
    return (<View style={style}>{children}</View>);
    
}

export default MySearchProps