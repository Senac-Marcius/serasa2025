import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MyView from '../src/components/MyView';
import MyButton from '../src/components/Mybuttons';
import { IconButton } from 'react-native-paper'; 

export default function MoreScreen() {  
    const [visible, setVisible] = useState(false); 

    return (
        <View style={styles.container}> {/* Envolvendo tudo para aplicar style corretamente */}

            <MyView>

                {/* Botão Saiba Mais */}
                <MyButton 
                    title="SAIBA MAIS"
                    button_type="round"
                    onPress={() => setVisible(!visible)}
                />
                
                {/* Opções quando o botão é pressionado */}
                {visible && (
                    <View style={styles.optionsContainer}>
                        <TouchableOpacity style={styles.option}>
                            <Text>CONFIGURAÇÕES</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.option}>
                            <Text>ELOGIOS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.option}>
                            <Text>RECLAMAÇÕES</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.exitButton}>
                            <Text style={{ color: 'white' }}>SAIR</Text>
                        </TouchableOpacity>
                    </View>
                )}

                
                <View style={styles.footer}>
                    <IconButton icon="github" size={30} iconColor="black" onPress={() => {}} />
                    <IconButton icon="facebook" size={30} iconColor="blue" onPress={() => {}} />
                    <IconButton icon="instagram" size={30} iconColor="purple" onPress={() => {}} />
                </View>

            </MyView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#813AB1',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    optionsContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#FFF',
        borderRadius: 10,
        elevation: 3, 
        shadowColor: '#000', 
        shadowOpacity: 0.1,
        shadowRadius: 5,
        alignItems: 'center',
    },
    option: {
        padding: 10,
        width: 200,
        alignItems: 'center',
        backgroundColor: '#F3F3F3',
        borderRadius: 10,
        marginVertical: 5,
    },
    exitButton: {
        padding: 10,
        width: 200,
        alignItems: 'center',
        backgroundColor: '#813AB1',
        borderRadius: 10,
        marginTop: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 15,
        backgroundColor: '#FFF',
        marginTop: 20,
    }
});
