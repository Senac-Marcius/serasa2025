import React, {ReactNode} from 'react';
import { View, ViewStyle } from 'react-native';

interface MyDocumentProps{//refere-se as propriedades que meu elemento vai ter
    children: ReactNode;
    style: ViewStyle;
}

const MyDocument: React.FC< MyDocumentProps >= ({children, style}) => {//cria os parametros da tag e faz a tipagem FC=Factory
    return (<View style={style}> {children} </View>);//encapsula o style dentro de uma view para que ele seja usado
}
export default MyDocument