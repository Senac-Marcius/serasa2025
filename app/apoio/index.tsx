import React from 'react';
import { View } from 'react-native';
import { useState } from 'react';
import MyView from '../../src/components/MyView';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
    const router = useRouter();
    

    return (
        <MyView router={router} style={{ flex: 1 }}>
            

            {/* Conteúdo da Página */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                

        
            </View>
        </MyView>
    );  
} 
