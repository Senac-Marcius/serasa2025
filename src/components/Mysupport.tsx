import { useState } from 'react';
import React, { ReactNode } from 'react';
import { Text, View, ViewStyle, TouchableOpacity, StyleSheet, TextInput } from 'react-native';


interface MySupportProps {
    style?: ViewStyle;
    children?: ReactNode;
    onPress?: () => void;


}

const MySupport: React.FC<MySupportProps> = ({ style }) => {
    const [visible, setVisible] = useState(false);

    return (
        <View>
            {
                !visible &&
                (
                    <TouchableOpacity onPress={() => setVisible(true)}>Suporte</TouchableOpacity>
                )
            }



            {
                visible &&
                <View style={styles.form}>
                            <TextInput 
                                placeholder="Nome" 
                                style={{ borderBottomWidth: 1, marginBottom: 10 }} 
                            />
                            <TextInput 
                                placeholder="Telefone" 
                                style={{ borderBottomWidth: 1, marginBottom: 10 }} 
                            />
                            <TextInput 
                                placeholder="E-mail" 
                                style={{ borderBottomWidth: 1, marginBottom: 10 }} 
                            />
                            <TouchableOpacity 
                                style={{ backgroundColor: '#007BFF', padding: 10, borderRadius: 5, marginTop: 10 }}
                                onPress={() => console.log('Iniciar')}
                            >
                                <Text style={{ color: '#fff', textAlign: 'center' }}>Iniciar</Text>
                            </TouchableOpacity>
                        </View>
}
            
        </View>
    );

}
const styles = StyleSheet.create({
    form: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
});


export default MySupport;