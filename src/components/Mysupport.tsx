import { useState } from 'react';
import React, { ReactNode } from 'react';
import { Text, View, ViewStyle, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { FaWhatsapp } from 'react-icons/fa'; // Importa o ícone do WhatsApp
import { Button, List } from 'react-native-paper';
import MyButton from './MyButtons';



interface MySupportProps {
    label?: string;
    style?: ViewStyle;
}

const MySupport: React.FC<MySupportProps> = ({label, style }) => {
    const [visible, setVisible] = useState(false);

    return (
        <View style={style}>

            {
                !visible &&
                ( 
                    <TouchableOpacity onPress={() => setVisible(true)}>                                    
                        <FaWhatsapp style={styles.whatsappButton} size={40} color="green" />
                        {label? label: 'Suporte'}
                    </TouchableOpacity>
                )
            }
                    


            {
                visible && (
                    <View style={styles.form}>
                        <View style={{ alignItems: 'flex-end' }}>
                                 <MyButton
                            onPress={() => setVisible(false)}
                            button_type='circle'
                            icon='close'
                            iconSize={10}
                            color='red'
                            iconColor='white'
                            width={20}
                            height={20}
                            
                            >

                        </MyButton>
                        </View>
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
                            onPress={() => {
                                console.log('Iniciar');
                                setVisible(false);
                            }}
                        >
                            <Text style={{ color: '#fff', textAlign: 'center' }}>Iniciar</Text>
                        </TouchableOpacity>
                    </View>
                )
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

    whatsappButton: {
        backgroundColor: 'white',
        borderRadius: 50, // Forma circular para o ícone
        padding: 10, // Tamanho do botão
        elevation: 5, // Sombra para o botão
    },


});


export default MySupport;