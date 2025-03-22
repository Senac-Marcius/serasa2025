import React, { ReactNode } from 'react';
import { Text, View, ViewStyle } from 'react-native'; 

interface MySelectProps {
    children: ReactNode;
    style: ViewStyle;
}

const MySelect: React.FC< MySelectProps > = ({children, style}) => {    //para passar uma parametro para a função, precisa-se utilizar "( )"
    return (<View style={style}>
        <Text>Ola componente</Text>
        {children}
        <Text>Tchau componente</Text>
        {children}
        
        
        </View>); 
    
}

export default MySelect                           //estamos exportando una variável  //tsc => type script expo