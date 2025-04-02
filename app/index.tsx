import React from 'react';
import { View } from 'react-native';
import { useState } from 'react';
import  MyTheme from '../src/components/MyTheme'
import  MyView from '../src/components/MyView'
import MyLogin from '../src/components/MyLogin';
import MyText from '../src/components/MyText';

export default function HomeScreen() {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    return (
        <MyView style={{ flex: 1 }}>
            <MyTheme chendTheme={()=>{}} fontSize={()=>{}}/>

            {/* Conteúdo da Página */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <MyLogin email={email} pass={pass} changeEmail={setEmail} changepass={setPass}>

                <MyText>Bem vind@ </MyText>

            </MyLogin>
            </View>
        </MyView>
    );  
} 
