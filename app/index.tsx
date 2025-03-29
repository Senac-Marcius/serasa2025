import React from 'react';
import { View, Text } from 'react-native';
import MyTopbar from '../src/components/mytopbar'

export default function HomeScreen() {
    return (

        <View style={{ flex: 1 }}>
            {/* Menu Hambúrguer no Topo */}
            
            <MyTopbar title="Bem vindo ao app do Serasa"  /> 
           

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
