import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import MyView from '../../src/components/MyView';
import { ScrollView } from 'react-native-gesture-handler';

export default function HomeScreen() {
    const router = useRouter();

    const buttons = [
        { title: 'Funcionários', screen: 'Administracao/employees?view=table' },
        { title: 'Cargos', screen: 'Administracao/positions' },
        { title: 'Projetos', screen: 'Administracao/projects' },
        { title: 'Escala', screen: 'Administracao/scales' },
    ];

    return (
    <ScrollView>
        <MyView >
            {buttons.map((button, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.button}
                    onPress={() => router.push(button.screen)}
                >
                    <Text style={styles.buttonText}>{button.title}</Text>
                </TouchableOpacity>
            ))}
        </MyView>
    </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },})