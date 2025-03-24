import { ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Biblioteca de ícones

interface MyTopbarProps {
    children: ReactNode;
}

const MyTopbar: React.FC<MyTopbarProps> = ({ children }) => {
    return (
        <View style={styles.container}>
            {/* Botão de voltar */}
            <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            {/* Nome da tela */}
            <Text style={styles.screenName}>Incluir nome da tela</Text>

            {/* Botão de perfil */}
            <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="person" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#6A1B9A', // Roxo
        padding: 10,
        borderRadius: 10,
        margin: 10,
    },
    iconButton: {
        padding: 8,
        backgroundColor: '#4A148C', // Roxo escuro
        borderRadius: 50,
    },
    screenName: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MyTopbar;
