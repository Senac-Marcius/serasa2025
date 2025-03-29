import React from 'react';
import { View, Text } from 'react-native';
import MyTopbar from '../src/components/mytopbar'

export default function HomeScreen() {
    return (

        <View style={{ flex: 1 }}>
            {/* Menu Hambúrguer no Topo */}
            
            <MyTopbar title="Bem vindo ao app do Serasa"  /> 
           

            {/* Conteúdo da Página */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Bem-vindo ao Serasa App!</Text>
            </View>
        </View>
    );  
}
