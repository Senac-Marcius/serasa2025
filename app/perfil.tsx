import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import MyView from '../src/components/MyView';
import { getUserById, getLoggedUserId, iUser } from '../src/controllers/users';
import { useRouter } from 'expo-router';
import MyButton from '../src/components/MyButtons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const Perfil = () => {
  const [user, setUser] = useState<iUser>()
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const id = await getLoggedUserId();
      if (!id) return;

      const retorno = await getUserById(Number(id));
      if (retorno?.status && retorno.data) {
        setUser(retorno.data);
      } else {
        alert("Usuário não encontrado.");
      }
    }
    fetchUser();
  }, []);

  function editUser(id?: number) {
    router.push(`/registerUser?id=${id}`);
  }

  async function exitUser() {
    try {
      await AsyncStorage.removeItem('userId');
      router.push(`/`);
      return Toast.show({
        type: 'success',
        text2: 'Usuário deslogado com sucesso!',
        text1: 'Sucesso ✅',

      });

    } catch (error) {
      return Toast.show({
        type: 'error',
        text1: 'Erro ao deslogar usuário.',


      });
    }
  }

  return (
    <MyView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Text style={styles.title}>Meu Perfil</Text>

        <View style={styles.profileCard}>
          <View style={styles.imageContainer}>
           
              <Image source={ require("../assets/perfilIcon.png")}  />

            <Text style={styles.profileImageLabel}>Foto do cadastro</Text>
          </View>

          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.subname}>Nome completo</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dados Pessoais:</Text>
            <Text style={styles.infoText}>E-mail: {user?.email}</Text>
            <Text style={styles.infoText}>Telefone: {user?.contact}</Text>
            <Text style={styles.infoText}>Idade: {user?.age}</Text>
          </View>


          <TouchableOpacity style={styles.primaryButton} onPress={() => editUser(user?.id)}>
            <Text style={styles.primaryButtonText}>Editar Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.exitButton} onPress={() => exitUser()}>
            <Text style={styles.primaryButtonText}>Sair</Text>
          </TouchableOpacity>

        </View>
      </View>
    </MyView>
  );
};

export default Perfil;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 80,
  },
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fefefe',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#813AB1',
    marginBottom: 20,
  },
  profileCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  profileImageLabel: {
    marginTop: 8,
    fontSize: 12,
    color: '#888',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subname: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  section: {
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#813AB1',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 6,
    color: '#555',
  },
  secondaryButton: {
    marginTop: 10,
    backgroundColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  secondaryButtonText: {
    fontSize: 14,
    color: '#813AB1',
    fontWeight: 'bold',
  },
  credits: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#813AB1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  exitButton: {
    backgroundColor: '#dc6262',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  }
});
