import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Appbar, Drawer } from 'react-native-paper';
import { useState } from 'react';
import  MyTheme from '../src/components/Mytheme'
import MyNotify from '../src/components/Mynotify';

export default function HomeScreen() {
    const router = useRouter();
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <View style={{ flex: 1 }}>
            {/* Menu Hambúrguer no Topo */}
            
            <MyTopbar title="Bem vindo ao app do Serasa" /> 

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
                        label="Postagens"
                        icon="post"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/posts');
                        }}
                    />
                     <Drawer.Item
                        label="Perfil"
                        icon="post"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/Myperfil');
                        }}
                    />
                    <Drawer.Item
                        label="Area do Aluno"
                        icon="post"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/students');}}
                    />
                    <Drawer.Item
                        label="Empréstimo"
                        icon="post"
                        onPress={() => {setDrawerOpen(false);router.push('/loans');}}
                    />
                    <Drawer.Item
                        label="Calendario"
                        icon="post"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/calendar');
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
                        label="Documentos"
                        icon="post"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/documents');
                        }}
                    />

                    <Drawer.Item
                        label="Cursos"
                        icon="acervo"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/collections');
                        }}
                    />
                    <Drawer.Item
                        label="receitas"
                        icon="post"
                        onPress={() => {
                            setDrawerOpen(false);
                            router.push('/revenues');
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
