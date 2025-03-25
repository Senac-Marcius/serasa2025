import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Appbar, Drawer } from 'react-native-paper';
import { useState } from 'react';

export default function HomeScreen() {
    const router = useRouter();
    const [drawerOpen, setDrawerOpen] = useState(false);
/* esse é o menu */
    return (
        <View style={{ flex: 1 }}>
            {/* Menu Hambúrguer no Topo */}
            <Appbar.Header>
                <Appbar.Action icon="menu" onPress={() => setDrawerOpen(!drawerOpen)} />
                <Appbar.Content title="Serasa App" />
            </Appbar.Header>

            {/* Drawer Menu */}
            {drawerOpen && (
                <Drawer.Section style={{ backgroundColor: 'white', padding: 10 }}>
                    <Drawer.Item
                        label="Início"
                        icon="home"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/');
                        }}
                    />
                    <Drawer.Item
                        label="Secretaria"
                        icon="post"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/disciplines');
                        }}
                    />
                    
                    <Drawer.Item
                        label="Salas"
                        icon="post"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/courses');
                        }}
                    />
                    <Drawer.Item
                        label="Alunos"
                        icon="post"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/posts');
                        }}
                    />
                    <Drawer.Item
                        label="Investimento"
                        icon="post"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/posts');
                        }}
                    />
                    <Drawer.Item
                        label="Administração"
                        icon="post"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/posts');
                        }}
                    />
                    <Drawer.Item
                        label="Rede de Apoio"
                        icon="post"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/posts');
                        }}
                    />
                    <Drawer.Item
                        label="Infraestrutura"
                        icon="post"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/posts');
                        }}
                    />
                    <Drawer.Item
                        label="Biblioteca"
                        icon="post"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/posts');
                        }}
                    />
                    <Drawer.Item
                        label="Configurações"
                        icon="cog"
                        onPress={() => {
                            setDrawerOpen(false);
                            console.log("Configurações");
                        }}
                    />
                </Drawer.Section>
            )}

            {/* Conteúdo da Página */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Bem-vindo ao Serasa App!</Text>
            </View>
        </View>
    );  
}
