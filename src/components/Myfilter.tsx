import React, {ReactNode} from "react";
import {Text, View, ViewStyle, TouchableOpacity, StyleSheet} from "react-native";

interface MyFilterProps{
    style: ViewStyle;
    children: ReactNode;
}

const MyFilter: React.FC<MyFilterProps> = ({children, style}) => {
    return(
        <View style={style.buttonFilter}>
                <TouchableOpacity onPress={() => {(children)}}>FILTROS</TouchableOpacity>
            {children}
            <Text>
            </Text>
        </View>
    );
};
 
const style = StyleSheet.create({

    buttonFilter:{
        backgroundColor: '#813AB1',
        padding: 10,
        borderRadius: 5,
    }
});

export default MyFilter