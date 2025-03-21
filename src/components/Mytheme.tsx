import {View, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';


interface MyThemeProps{
    children: ReactNode;
    style: ViewStyle | ViewStyle[];
}
const MyTheme: React.FC<MyThemeProps> = ({children, style}) => {
    return (<View style={style}>/{children}</View>);

}

export default MyTheme