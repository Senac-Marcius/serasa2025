import React from 'react';
import { ScrollView} from 'react-native';

export default function ProfileScreen() {
    
    return (
        <ScrollView>
            
        </ScrollView>
    );
}


/*yimport React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Component 9</Text>
      </View>
      <View style={styles.profileCard}>
        <View style={styles.profileImageContainer}>
          <Image
            source={require('./assets/profile-placeholder.png')} 
          />
          <Text style={styles.profileImageLabel}>"Foto do cadastro"</Text>
        </View>
        <Text style={styles.profileName}>Nome do cadastro</Text>
        <Text style={styles.name}>Nome</Text>
        <View style={styles.personalDataContainer}>
          <Text style={styles.personalDataLabel}>Dados Pessoais</Text>
          <Text style={styles.email}>E-mail: nome@exemplo.com.br</Text>
          <Text style={styles.phone}>Telefone: (16) 932324400</Text>
          <Text style={styles.birthdate}>Data de Nascimento: dd/mm/aaaa</Text>
          <TouchableOpacity style={styles.changePasswordButton}>
            <Text style={styles.changePasswordButtonText}>Alterar Senha</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.credits}>Créditos: 100</Text>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileButtonText}>Editar Perfil</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.whatsappButton}>
        <Image
          source={require('./assets/whatsapp-icon.png')} 
          style={styles.whatsappIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
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
  changePasswordButton: {
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
  },
  whatsappButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#25d366',
    borderRadius: 30,
    padding: 15,
  },
  whatsappIcon: {
    width: 30,
    height: 30,
  },
});

export default ProfileScreen*/