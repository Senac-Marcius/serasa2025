import React from 'react';
import { View } from 'react-native';
import { useState } from 'react';
import  MyTheme from '../src/components/MyTheme'
import  MyView from '../src/components/MyView'
import MyLogin from '../src/components/MyLogin';
import MyText from '../src/components/MyText';
import { useRouter } from 'expo-router';
import { ThemeProvider } from 'react-native-paper';
import { GlobalStyles } from '../styles/globalStyles';
import  theme  from '../styles/theme';

export default function HomeScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    return (
        <ThemeProvider theme={theme}>
        
        <MyView router={router} style={GlobalStyles.container}>
            <MyTheme chendTheme={()=>{}} fontSize={()=>{}}/>

            {/* Conteúdo da Página */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <MyLogin email={email} pass={pass} changeEmail={setEmail} changepass={setPass}>

                <MyText>Bem vind@ </MyText>

            </MyLogin>
            </View>
        </MyView>
        </ThemeProvider>
    );  
} 
