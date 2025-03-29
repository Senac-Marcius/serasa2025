import {TouchableOpacity, View, ViewStyle, StyleSheet,} from 'react-native';
import React, {ReactNode} from 'react';
import { TextInput} from 'react-native-gesture-handler';
import MyLink from '../components/Mylink';
import MyButton from '../components/Mybuttons';
import  { Myinput} from '../components/Myinputs'; 
 
interface MyLoginProps{
    children: ReactNode;
    style: ViewStyle | ViewStyle[];
    email:string;
    pass:string;
    changeEmail(): void;
    
}

const MyLogin: React.FC<MyLoginProps> = ({children, style, email, pass,changeEmail }) => {
    return (
    <View>
    <Myinput
        label="Email"
        value={email}
        onChangeText={changeEmail}
        iconName="person"
    
        
    />

<Myinput
        label="Senha"
        value={pass}
        onChangeText={changeEmail}
        iconName="key"
        
    />

        <MyLink 
            url="http://google.com"
            label="Esqueci minha senha"
        />

        <MyButton  title='Login'>
            
        </MyButton>

        <MyButton title='Cadastrar'>
            
        </MyButton>
        
    </View>
    );
    
   
 
}

export default MyLogin

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