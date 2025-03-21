import { View, ViewStyle } from 'react-native';
import React,{ ReactNode } from 'react';
import { Text } from 'react-native';


interface MyModelprops{
    children:ReactNode
    style?:ViewStyle
}
const MyModel: React.FC<MyModelprops> = ({children, style})=>{ //
    return(
        <View style ={style}>
            <Text> Olá componente</Text>
            {children}
            <Text>Fim do componente</Text>
        
        </View>
    );
}
export default MyModel
