import React from 'react';
import { Text, View, ViewStyle, TouchableOpacity, StyleSheet, Linking, Alert } from "react-native";

interface MydownloadProps {
    style?: ViewStyle;
    url: string;
}

const Mydownload: React.FC<MydownloadProps> = ({ style, url }) => {

    function onDownload(){
        // Validação básica da URL
        if (!url || !url.startsWith('http')) {
            Alert.alert('Erro', 'URL inválida');
            return;
        }

        // Tenta abrir o link no navegador
        Linking.openURL(url).catch(() => {
            Alert.alert('Erro', 'Não foi possível iniciar o download');
        });
    }

    return (
        <TouchableOpacity style={[style, styles.button]} onPress={onDownload}> Download <></>  </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#A020F0', 
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Mydownload;
