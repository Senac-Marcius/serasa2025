import { useRouter } from 'expo-router';
import React, { ReactNode, useState } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import MyButton from './MyButtons';
import { Myinput } from './MyInputs';
import MyLink from './MyLink';

interface MyLoginProps {
    children: ReactNode;
    style?: ViewStyle | ViewStyle[];
    email: string;
    pass: string;
    changeEmail: (text: string) => void;
    changepass: (text: string) => void;
    login: () => void;
}

const router = useRouter();

const MyLogin: React.FC<MyLoginProps> = ({ children, style, email, pass, changeEmail, changepass, login }) => {
    const [isEnabled, setIsEnabled] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 'bold', fontSize: 30, color: '#c4c4c4' }}>Bem vindo ao <span style={{ color: '#813AB1', fontSize: 40 }}>Virtudemy</span></Text>
            <Myinput
                label="Email"
                value={email}
                onChangeText={(text) => { changeEmail(text) }}
                iconName="person"
            />

            <Myinput
                label="Senha"
                value={pass}
                onChangeText={(text) => { changepass(text) }}
                iconName="key"
                type='password'
            />
            <MyLink url="http://google.com" label="Esqueci minha senha" />
            <MyButton title='Login' onPress={login} />
            <MyButton
                title='Cadastrar'
                onPress={() =>
                    router.push('/registerUser')
                }
                style={{ marginTop: 10 }}
            />
        </View>
    );
};

export default MyLogin;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        width: '90%',
        maxWidth: 400,
        alignSelf: 'center',
        borderRadius: 8,
        gap: 16,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
});