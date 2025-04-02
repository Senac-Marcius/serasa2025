import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MyView from '../src/components/MyView';
import MyButton from '../src/components/MyButtons';
import { IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';


export default function MoreScreen() {
    const router = useRouter();
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.container}>
            <MyView router={router}>
                {/* Botão Saiba Mais */}
                <View style ={styles.optionsContainer}>
                    <MyButton
                        style={styles.option}
                        title="SAIBA MAIS"
                        button_type="round"
                        onPress={() => setVisible(!visible)}
                    />



                </View>


                {visible && (
                    <View style={styles.optionsContainer}>
                        <MyButton
                            style={styles.option}
                            button_type="round"
                            title="CONFIGURAÇÕES"
                           
                        />
                        <MyButton
                            style={styles.option}
                            button_type="round"
                            title="ELOGIOS"
                        />
                        <MyButton
                            style={styles.option}
                            button_type="round"
                            title="RECLAMAÇÕES"
                        />

                        <MyButton
                            style={styles.option}
                            title="SAIR"
                            button_type="round"
                            onPress={() => setVisible(false)}
                        />
                        <View style = {styles.row}>
                            <MyButton
                                style={styles.icon}
                                title=""
                                button_type="circle"
                                onPress={() => setVisible(false)}
                                icon = "github"
                            />
                            <MyButton
                                style={styles.icon}
                                title=""
                                button_type="circle"
                                onPress={() => setVisible(false)}
                                icon = "facebook"
                            />
                            <MyButton
                                style={styles.icon}
                                title=""
                                button_type="circle"
                                onPress={() => setVisible(false)}
                                icon = "instagram"
                            />
                        </View>
                    </View>
                )}

            </MyView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
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
        justifyContent: 'center',
        gap: 20,
        alignContent: 'space-around',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 10,
        gap: 20,
        alignContent: 'space-around',
    },
    option: {
        width: 500,
        alignItems: 'center',
        backgroundColor: '#813AB1',
        borderRadius: 10,
        marginVertical: 5,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 15,
        backgroundColor: '#FFF',
        marginTop: 20,
    },
    icon: {
        padding: 10,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
       
    },


});
