import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Appbar, Drawer } from 'react-native-paper';
import { useState } from 'react';
import MyNotify from '../src/components/Mynotify';

export default function HomeScreen() {
    const router = useRouter();
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <View style={{ flex: 1 }}>
            {/* Menu Hambúrguer no Topo */}
            
            <MyTopbar title="Bem vindo ao app do Serasa" /> 
           

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Bem-vindo ao Serasa App!</Text>
            </View>
            </View>
    );  
}
