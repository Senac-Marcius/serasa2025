import { useState } from 'react';
import React, { ReactNode } from 'react';
import { Text, View, ViewStyle, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { FaUniversalAccess  } from 'react-icons/fa';
import { Button, List } from 'react-native-paper';



interface MySupportProps {
    label?: string;
    style?: ViewStyle;
    url?: string;
}

const MySupport: React.FC<MySupportProps> = ({label, style }) => {
    const [visible, setVisible] = useState(false);

    return (
        <View style={style}>

            {
                !visible &&
                ( 
                    <TouchableOpacity onPress={() => setVisible(true)}>                                    
                        <FaUniversalAccess style={styles.accessbutton} size={40} color="green" />
                        {label? label: 'Suporte'}
                        <TouchableOpacity
                            style={styles.suporteButton}
                            onPress={handleSuporte}
                            accessible={true}
                            accessibilityLabel="Botão de Suporte"
                            accessibilityRole="button"
      >
        <Text style={styles.suporteText}>Accessibility</Text>
      </TouchableOpacity>
                )
            }
                    


            {
                visible && (
                    <View style={styles.form}>
                        <TextInput 
                     
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

    accessbutton: {
        backgroundColor: 'white',
        borderRadius: 50, // Forma circular para o ícone
        padding: 10, // Tamanho do botão
        elevation: 5, // Sombra para o botão
    },


});


export default MySupport;