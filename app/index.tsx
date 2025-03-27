import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Appbar, Drawer } from 'react-native-paper';
import { useState } from 'react';

export default function HomeScreen() {
    const router = useRouter();
    const [drawerOpen, setDrawerOpen] = useState(false);

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
                        label="CATEGORIES"
                        icon="post"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/categories');
                        }}
                    />
                     <Drawer.Item
                        label="Itens"
                        icon="post"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/itens');
                        }}
                    />
                    <Drawer.Item
                        label="Area do Aluno"
                        icon="post"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/students');
                        }}
                    />
                    <Drawer.Item
                        label="Cursos"
                        icon="post"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/courses');
                        }}
                    />
                    <Drawer.Item
                        label="Despesa"
                        icon="post"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/expenses');
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
