import {TouchableOpacity, View, ViewStyle, StyleSheet,} from 'react-native';
import React, {ReactNode} from 'react';
import { TextInput} from 'react-native-gesture-handler';
import MyLink from '../components/Mylink'

 
interface MyLoginProps{
    children: ReactNode;
    style: ViewStyle | ViewStyle[];
}
const MyLogin: React.FC<MyLoginProps> = ({children, style}) => {
    return (
    <View style={styles.container}>
    <TextInput>
        
    </TextInput>
        <MyLink 
            url="http://google.com"
            label="Esqueci minha senha"
        />

        <TouchableOpacity style={styles.LoginContainer} >
            Login
        </TouchableOpacity>

        <TouchableOpacity style={styles.CadastrarContainer}>
            Cadastrar
        </TouchableOpacity>
        
    </View>
    );
    
   
 
}

export default MyLogin

const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: '#fff',
      flex: 1,
    },

    LoginContainer:{
        backgroundColor:'#2563EB',
        padding:10,
        borderRadius:5,
        alignItems: 'center',
        justifyContent:'center',
        },

        CadastrarContainer:{
            backgroundColor:'#3B82F6',
            padding:10,
            borderRadius:5,
            alignItems: 'center',
            justifyContent:'center',
            },
})