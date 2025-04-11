import React from 'react';
import { Text, View, ViewStyle, TouchableOpacity, StyleSheet, Linking, Alert } from "react-native";
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';


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
        <TouchableOpacity style={[style, styles.button, ]} onPress={onDownload}><Icon name="download" size={20} color="white" /><></>  </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
    display:"flex",
    
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",



    backgroundColor:"rgb(144, 3, 238)",
    width:190,
    padding:15,
    },
});

export default Mydownload;
