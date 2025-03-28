import React, {ReactNode, useState} from "react";
import { Text,  TouchableOpacity, Image, View, ViewStyle, StyleSheet, ScrollView, TextStyle } from "react-native";
import MyView from "../src/components/MyView";
import MyButton from "../src/components/Mybuttons";
import Mytext from "../src/components/Mytext";






interface MyPerfilProps {
    style?: ViewStyle | ViewStyle [],
    label?: string,
    children: ReactNode,
};




    const Perfil: React.FC<MyPerfilProps> = ({ children, style}) => { 
      return (
        <ScrollView>
        <MyView>
          <View style={styles.header}>
            <Mytext>Perfil</Mytext>
          </View>
          <View style={styles.profileCard}>
            <View>
              <Mytext>"Foto do cadastro"</Mytext>
            </View>
            <Mytext>Nome do cadastro</Mytext>
            <Mytext>Nome</Mytext>
            <View>
              <Mytext>Dados Pessoais</Mytext>
              <Mytext>E-mail: nome@exemplo.com.br</Mytext>
              <Mytext>Telefone: (16) 988443750</Mytext>
              <Mytext>Data de Nascimento: dd/mm/aaaa</Mytext>
              <MyButton title="Alterar Perfil">
              </MyButton>
            </View>
            <MyButton title="Editar Perfil">
            </MyButton>
          </View>
          <TouchableOpacity style={styles.wppButton}>
            <Image
              source={require('../assets/whatsapp.png')}
              style={styles.wppIcon}
            />
          </TouchableOpacity>
        </MyView>
        </ScrollView>
      );
    };
    
    const styles = StyleSheet.create({
      header: {
        padding: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      } as TextStyle,
      headerText: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      profileCard: {
        margin: 20,
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
      },
      profileImageContainer: {
        alignItems: 'center',
        marginBottom: 20,
      },
      profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#ddd',
      },
      profileImageLabel: {
        marginTop: 10,
        fontSize: 12,
        color: '#888',
      },
      profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      name: {
        fontSize: 16,
        marginBottom: 20,
      },
      personalDataContainer: {
        marginBottom: 20,
      },
      personalDataLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      email: {
        fontSize: 14,
        marginBottom: 5,
      },
      phone: {
        fontSize: 14,
        marginBottom: 5,
      },
      birthdate: {
        fontSize: 14,
        marginBottom: 10,
      },
      changepassbuton: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'flex-start',
      },
      changePasswordButtonText: {
        fontSize: 14,
      },
      credits: {
        fontSize: 16,
        marginBottom: 20,
      },
      editProfileButton: {
        backgroundColor: '#9c27b0',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
      },
      editProfileButtonText: {
        fontSize: 16,
        color: '#fff',
        padding: 10,
        borderRadius: 100,
        fontFamily: 'arial'
      },
      wppButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#25d366',
        borderRadius: 30,
        padding: 15,
      },
      wppIcon: {
        width: 30,
        height: 30,
      },
    });
    
    export default Perfil