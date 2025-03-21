import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';

interface MyTestProps {
  children: ReactNode;
  style: ViewStyle;
}

const MyTest: React.FC< MyTestProps >  = ({children, style}) => {
    return (<View style={style}>{children}</View>);
        
}

export default MyTest