import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import MyLogin from '../src/components/MyLogin';
import MyText from '../src/components/MyText';
import MyTheme from '../src/components/MyTheme';
import MyView from '../src/components/MyView';
import { getUserByEmail } from '../src/controllers/users';
import Toast from 'react-native-toast-message';

export default function HomeScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    async function handleLogin() {
        const result = await getUserByEmail(email);
        if (!result.status) {
            return Toast.show({
                type: 'error',
                text1: 'Erro!',
                text2: 'E-mail incorreto ❌'
              });
        }
        if (result.data?.password === pass) {
            try {
                await AsyncStorage.setItem('userId', result.data.id.toString());
<<<<<<< HEAD
                Toast.show({
                    type: 'success',
                    text1: 'Login realizado com sucesso!',
                    text2: 'Bem-vindo 👋',
                  });
                router.push('/homeLogin');
=======
                alert('Login bem-sucedido!');
                var isE = isEmployee()
                if(await isE == true){
                    router.push('/adminsitration')
                }
                //router.push('/home');
>>>>>>> 1a7d9d14e7734a9c7f233b98af38a26b40d02c55
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Erro ao realizar login!',
                  });
            }
        } else {
            return Toast.show({
                type: 'error',
                text2: 'Senha incorreta! ❌',
                text1: 'Erro!'
              });
        }
        return;
    }

    return (
        <MyView router={router} style={{ flex: 1 }}>
            <MyTheme chendTheme={() => { }} fontSize={() => { }} />

            {/* Conteúdo da Página */}
            <View style={styles.container}>
                <View style={styles.containerIcons}>
                    <Image source={require('../assets/image-login.svg')} style={styles.image} />
                </View>

                <View style={styles.containerLogin}>
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
            </View>
        </MyView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
    },
    containerLogin: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerIcons: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        paddingLeft: 30
    },
    image: {
        width: '100%',
        height: 500,
        resizeMode: 'contain',
        marginBottom: 20,
    }
});