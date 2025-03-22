import React, {ReactNode} from "react";

import { Text, View, ViewStyle } from "react-native";




interface MyPerfilProps {
    style?: ViewStyle;
    children: ReactNode;
};
const MyPerfil: React.FC<MyPerfilProps>= ({children, style}) => {
        return (
        <View style={style}>
            <Text>
                {children} perfil
            </Text>
        </View>
    );
}

export default MyPerfil