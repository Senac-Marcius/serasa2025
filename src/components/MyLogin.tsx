import { TouchableOpacity, View, ViewStyle, StyleSheet } from 'react-native';
import React, { ReactNode, useState } from 'react';
import MyLink from './MyLink';
import MyButton from './MyButtons';
import { Myinput } from './MyInputs';
import MySwitch from '../components/MySwitch';
import { useRouter } from 'expo-router';

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
        <View style={Array.isArray(style) ? [style] : style}>
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
            <MySwitch isEnabled={isEnabled} onToggle={setIsEnabled} />
            <MyLink url="http://google.com" label="Esqueci minha senha" />
            <MyButton title='Login' onPress={login}/>
            <MyButton
                title='Cadastrar'
                onPress={() =>
                    router.push('/registerUser')
                }
                style={{marginTop: 10}}
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
    },
    LoginContainer: {
        backgroundColor: '#2563EB',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    CadastrarContainer: {
        backgroundColor: '#3B82F6',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
});


/**
   const [email, setEmail] = useState('')
   const [pass, setPass] = useState('')

    <MyLogin email={email} pass={pass} changeEmail={setEmail} changepass={setPass}>

        <Mytext>text </Mytext>

    </MyLogin>
     
 */