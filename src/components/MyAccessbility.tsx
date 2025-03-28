import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ViewStyle, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';



interface MyAcessProps {
    label?: string;
    style?: ViewStyle;
    url?: string;
}

const MySupport: React.FC<MyAcessProps> = ({label, style }) => {
    const [visible, setVisible] = useState(false);
    const handleSuporte = () => {
        console.log("Suporte clicado");
    };

    return (
        <View style={style}>

            {
                !visible &&
                ( 
                    <TouchableOpacity onPress={() => setVisible(true)}
                    accessibilityLabel="Botão de Acessibilidade">                                    
                        <MaterialIcons name="accessibility" style={styles.accessbutton} size={40} color="green" />
                    <Text>{label ? label : 'Suporte'}</Text>,
                </TouchableOpacity>
                )
            }
                           {visible && (
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua mensagem"
                        accessible={true}
                        accessibilityLabel="Campo de texto para suporte"/>
                    <TouchableOpacity
                        style={styles.suporteButton}
                        onPress={handleSuporte}
                        accessible={true}
                        accessibilityLabel="Botão de Suporte"
                        accessibilityRole="button">
                        <Text style={styles.suporteText}>Iniciar</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};                             
const styles = StyleSheet.create({
    form: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },

    accessbutton: {
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 10,
        elevation: 5,
    },
    input: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    suporteButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    suporteText: {
        color: '#fff',
    },


});

export default MySupport;

