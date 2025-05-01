import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import MyButton from './MyButtons';



interface MyAcessProps {
    label?: string;
    style?: ViewStyle;
    children: React.ReactNode;
}

const MyAccessibility: React.FC<MyAcessProps> = ({label, style, children }) => {
    const [visible, setVisible] = useState(false);
    /*const handleSuporte = () => {
        console.log("Suporte clicado");
    };*/

    return (
        <View style={style}>

            {!visible &&( 
                    <TouchableOpacity onPress={() => setVisible(true)} style={styles.accesibilityButton}
                    accessibilityLabel="Botão de Acessibilidade">  

                        <View style={styles.iconRow}>
                            <MaterialIcons name="accessibility" size={30} color="#000" />
                            <Text style={styles.labelText}>{label ? label : 'Acessibilidade'}</Text>
                        </View>                  

                    </TouchableOpacity>
                )
            }
                           {visible && (
                <View>
                    {children}
                    <MyButton
                    title='Sair'
                    onPress={() => setVisible(false)}
                    button_type='capsule'
                    />
                            
                    
                </View>
            )}
        </View>
    );
};    


const styles = StyleSheet.create({
    accesibilityButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 5,
        zIndex: 10,
      },
      
    iconRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    labelText: {
      fontSize: 15,
      marginLeft: 8,
      color: '#333',
      fontWeight: '600',
    },
    whatsappButton: {
      backgroundColor: 'white',
      borderRadius: 50,
      padding: 5,
    },
    form: {
      position: 'absolute',
      bottom: 80,
      right: 20,
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 20,
      width: 320,
      zIndex: 100,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 12,
      marginBottom: 12,
      fontSize: 15,
      backgroundColor: '#f9f9f9',
    },
    submitButton: {
      backgroundColor: '#007BFF',
      paddingVertical: 12,
      borderRadius: 8,
      marginTop: 10,
      alignItems: 'center',
    },
    submitText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
    },
    closeButton: {
      alignSelf: 'flex-end',
      marginBottom: 10,
      backgroundColor: '#eee',
      borderRadius: 15,
      width: 28,
      height: 28,
      alignItems: 'center',
      justifyContent: 'center',
    },
    closeText: {
      color: '#333',
      fontSize: 18,
      lineHeight: 22,
      fontWeight: 'bold',
    },
  });
  





export default MyAccessibility;

