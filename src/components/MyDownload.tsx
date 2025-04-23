import React from 'react';
import { Text, View, ViewStyle, TouchableOpacity, StyleSheet, Linking, Alert } from "react-native";
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Mytext from './MyText';
import MyButton from './MyButtons';



interface MydownloadProps {
    style?: ViewStyle;
    url: string;


}

const Mydownload: React.FC<MydownloadProps> = ({ style, url }) => {

    function onDownload() {
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
        <MyButton style={styles.button} onPress={onDownload}
            icon='download'
            gap={0}            

            iconColor='white'
            color='#4CAF50'
        />


    );
}

const styles = StyleSheet.create({
    button: {
        display: "flex",
        borderRadius: 8,
        padding:0,
        backgroundColor: '#4CAF50',
        paddingVertical:5,
        alignItems: "center",
        justifyContent: 'center',
        paddingHorizontal:10,


    },
});

export default Mydownload;
