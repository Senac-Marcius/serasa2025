import React, {ReactNode, useState} from "react";

import { Text, TouchableOpacity, View, ViewStyle, StyleSheet } from "react-native";




interface MyPerfilProps {
    children?: ReactNode;
    onSend?():void;
    style?: ViewStyle | ViewStyle [];
};
const [visible, setVisible] = useState(false)

const MyPerfil: React.FC<MyPerfilProps>= ({style, onSend, children}) => {
        return (
            <View>
                {!visible &&
                (<TouchableOpacity style = {styles.button}
                     onPress={() => onSend}
                     
                >Perfil
                </TouchableOpacity>)
            }
            {
                visible &&
            (<View>
                {children}
                <TouchableOpacity onPress={() => setVisible(false)}>
                    X
                </TouchableOpacity>
                </View>)}
            </View>
        );
}

export default MyPerfil

    const styles = StyleSheet.create({
        button: {
            padding: 20,
            marginRight: 1300,
            fontSize: 30,
            fontFamily: 'arial',
            backgroundColor: '#F2F2F2'
            
        } as ViewStyle,
    })