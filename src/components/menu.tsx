import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HamburgerMenu() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [slideAnim] = useState(new Animated.Value(-300)); // Menu começa fora da tela
    const router = useRouter();

    const toggleMenu = () => {
        Animated.timing(slideAnim, {
            toValue: menuVisible ? -300 : 0, // Abre e fecha o menu
            duration: 300,
            useNativeDriver: false,
        }).start();
        setMenuVisible(!menuVisible);
    };

    return (
        <View style={styles.fullScreen}>
            {/* Ícone do Menu no canto superior esquerdo */}
            <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
                <Ionicons name="menu" size={32} color="#333" />
            </TouchableOpacity>

            {/* Menu Lateral */}
            <Animated.View style={[styles.menu, { left: slideAnim }]}> 
                {/* Perfil (Agora clicável) */}
                <TouchableOpacity style={styles.profileSection} onPress={() => alert('Perfil clicado!')}>
                    <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.profileImage} />
                    <View>
                        <Text style={styles.profileName}>sung di wo</Text>
                        <Text style={styles.profileRole}>Admin</Text>
                    </View>
                </TouchableOpacity>

                {/* Itens do Menu */}
                <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/painel')}>
                    <Ionicons name="home" size={20} color="#FFF" />
                    <Text style={styles.menuText}>Painel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/disciplines')}>
                    <Ionicons name="briefcase" size={20} color="#FFF" />
                    <Text style={styles.menuText}>Secretaria</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/salas')}>
                    <Ionicons name="business" size={20} color="#FFF" />
                    <Text style={styles.menuText}>Salas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/alunos')}>
                    <Ionicons name="school" size={20} color="#FFF" />
                    <Text style={styles.menuText}>Alunos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/investimento')}>
                    <Ionicons name="cash" size={20} color="#FFF" />
                    <Text style={styles.menuText}>Investimento</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/administracao')}>
                    <Ionicons name="settings" size={20} color="#FFF" />
                    <Text style={styles.menuText}>Administração</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/redeapoio')}>
                    <Ionicons name="people" size={20} color="#FFF" />
                    <Text style={styles.menuText}>Rede de Apoio</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/biblioteca')}>
                    <Ionicons name="book" size={20} color="#FFF" />
                    <Text style={styles.menuText}>Biblioteca</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    menuButton: {
        position: 'absolute',
        top: 10,
        left: 5, // Movido mais para cima
        zIndex: 1100,
        backgroundColor: 'transparent',
        padding: 10,
        borderRadius: 50,
    },
    menu: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 280,
        height: '100%',
        backgroundColor: '#5A2D82', // Cor roxa igual ao Figma
        paddingTop: 50,
        paddingLeft: 20,
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 4,
        zIndex: 999,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
        borderWidth: 2,
        borderColor: '#FFF',
        backgroundColor: '#FFF',
    },
    profileName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
    },
    profileRole: {
        fontSize: 14,
        color: '#DDD',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
    },
    menuText: {
        fontSize: 18,
        color: '#FFF',
        marginLeft: 10,
    },
});
