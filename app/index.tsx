import React from 'react';
import { View } from 'react-native';
import { useState } from 'react';
import MyTheme from '../src/components/MyTheme'
import MyView from '../src/components/MyView'
import MyLogin from '../src/components/MyLogin';
import MyText from '../src/components/MyText';
import { useRouter } from 'expo-router';
import { getUserByEmail, isEmployee, isStudent } from '../src/controllers/users';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    async function handleLogin() {
        /* console.log(await isStudent())
        console.log(await isEmployee()) */
        const result = await getUserByEmail(email);
        if (!result.status) {
            return alert("E-mail não encontrado!")
        }
        if (result.data?.password === pass) {
            try {
                await AsyncStorage.setItem('userId', result.data.id.toString());
                alert('Login bem-sucedido!');

                //buscar todos os students verificar pelo user_id se ele exite na tabela estudante se existir da permisão de estudante


                //buscar todo employes se tiver user_id na emploes vai ter que puxar o cargo e de acordo com o cargo vai mandar para a tela certa
                router.push('/home');
            } catch (error) {
                console.error('Erro ao armazenar o id do usuário:', error);
                alert('Erro ao salvar o id do usuário.');
            }
        } else {
            return alert("Senha incorreta!");
        }
        return;
    }

    return (
        <MyView router={router} style={{ flex: 1 }}>
            <MyTheme chendTheme={() => { }} fontSize={() => { }} />

            {/* Conteúdo da Página */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <MyLogin
                    email={email}
                    pass={pass}
                    changeEmail={setEmail}
                    changepass={setPass}
                    login={handleLogin}
                >
                    <MyText>Bem vind@ </MyText>
                </MyLogin>
            </View>
        </MyView>
    );
} 
