import React, {ReactNode} from 'react';
import { Text, View, ViewStyle, TouchableOpacity, StyleSheet } from "react-native";

interface MydownloadProps {
    style?: ViewStyle;
    url: string;
}


const Mydownload: React.FC< MydownloadProps> = ({ style, url}) => {

    function onDownload(){

    }

    return (
        <TouchableOpacity style={[style, styles.button]} onPress={onDownload}> Download <></>  </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#000000'
    },
});

export default Mydownload