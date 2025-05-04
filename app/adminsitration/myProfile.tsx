import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserById } from '../../src/controllers/users';
import { getEmployees } from '../../src/controllers/employees';
import MyView from '../../src/components/MyView';
import { Myinput } from '../../src/components/MyInputs';
import { Ionicons } from '@expo/vector-icons';

export default function MyProfile() {
  const [userData, setUserData] = useState<any>(null);
  const [employeeData, setEmployeeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          const userResponse = await getUserById(Number(userId));
          if (userResponse.status && userResponse.data) {
            setUserData(userResponse.data);
            
            const employeeResponse = await getEmployees({ user_id: Number(userId) });
            if (employeeResponse.status && employeeResponse.data && employeeResponse.data.length > 0) {
              setEmployeeData(employeeResponse.data[0]);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <MyView>
        <View style={styles.container}>
          <Text>Carregando...</Text>
        </View>
      </MyView>
    );
  }

  if (!userData) {
    return (
      <MyView>
        <View style={styles.container}>
          <Text>Não foi possível carregar os dados</Text>
        </View>
      </MyView>
    );
  }

  return (
    <MyView>
      {/* Botão de Voltar estilizado com fundo e sombra */}
      <Pressable 
        onPress={() => router.push('adminsitration/')}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="#3AC7A8" />
        <Text style={styles.backButtonText}>Voltar</Text>
      </Pressable>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Dados básicos do usuário */}
        <Myinput
          label="Nome Completo"
          value={userData.name || 'Não informado'}
          placeholder=""
          onChangeText={() => {}}
          iconName="person"
        />
        
        <Myinput
          label="Email"
          value={userData.email || 'Não informado'}
          placeholder=""
          onChangeText={() => {}}
          iconName="mail"
        />
        
        <Myinput
          label="CPF"
          value={userData.cpf || 'Não informado'}
          placeholder=""
          onChangeText={() => {}}
          iconName="id-card"
        />
        
        <Myinput
          label="Idade"
          value={userData.age || 'Não informado'}
          placeholder=""
          onChangeText={() => {}}
          iconName="time"
        />
        
        <Myinput
          label="Contato"
          value={userData.contact || 'Não informado'}
          placeholder=""
          onChangeText={() => {}}
          iconName="call"
        />
        
        <Myinput
          label="Endereço"
          value={userData.address || 'Não informado'}
          placeholder=""
          onChangeText={() => {}}
          iconName="home"
        />

        {/* Dados específicos do funcionário */}
        {employeeData && (
          <>
            <Myinput
              label="URLs"
              value={employeeData.urls || 'Não informado'}
              placeholder=""
              onChangeText={() => {}}
              iconName="link"
            />

            <Myinput
              label="Nacionalidade"
              value={employeeData.nationality || 'Não informada'}
              placeholder=""
              onChangeText={() => {}}
              iconName="globe"
            />

            <Myinput
              label="Gênero"
              value={getGenderLabel(employeeData.sex) || 'Não informado'}
              placeholder=""
              onChangeText={() => {}}
              iconName="person"
            />

            <Myinput
              label="Estado Civil"
              value={getMaritalStatusLabel(employeeData.martinal_status) || 'Não informado'}
              placeholder=""
              onChangeText={() => {}}
              iconName="heart"
            />

            <Myinput
              label="Etnia"
              value={getEthnicityLabel(employeeData.ethnicity) || 'Não informado'}
              placeholder=""
              onChangeText={() => {}}
              iconName="people"
            />

            <Myinput
              label="Deficiência"
              value={getDeficiencyLabel(employeeData.deficiency) || 'Nenhuma'}
              placeholder=""
              onChangeText={() => {}}
              iconName="accessibility"
            />

            <Myinput
              label="Status"
              value={employeeData.is_active === 'true' ? 'Ativo' : 'Inativo'}
              placeholder=""
              onChangeText={() => {}}
              iconName="checkmark-circle"
            />
          </>
        )}
      </ScrollView>
    </MyView>
  );
}

// Funções auxiliares (sem a getDiscLabel)
const getGenderLabel = (genderKey: string) => {
  const genders: Record<string, string> = {
    'masculino': 'Masculino',
    'feminino': 'Feminino',
    'nao_informar': 'Prefiro não informar',
    'outro': 'Outro'
  };
  return genders[genderKey] || genderKey;
};

const getMaritalStatusLabel = (statusKey: string) => {
  const statuses: Record<string, string> = {
    'solteiro': 'Solteiro(a)',
    'casado': 'Casado(a)',
    'separado': 'Separado(a)',
    'divorciado': 'Divorciado(a)',
    'viuvo': 'Viúvo(a)'
  };
  return statuses[statusKey] || statusKey;
};

const getEthnicityLabel = (ethnicityKey: string) => {
  const ethnicities: Record<string, string> = {
    'branco': 'Branco(a)',
    'preto': 'Preto(a)',
    'pardo': 'Pardo(a)',
    'amarelo': 'Amarelo(a)',
    'indigena': 'Indígena'
  };
  return ethnicities[ethnicityKey] || ethnicityKey;
};

const getDeficiencyLabel = (deficiencyKey: string) => {
  const deficiencies: Record<string, string> = {
    'nenhuma': 'Nenhuma',
    'fisica': 'Deficiência Física',
    'auditiva': 'Deficiência Auditiva',
    'visual': 'Deficiência Visual',
    'intelectual': 'Deficiência Intelectual',
    'multipla': 'Deficiência Múltipla',
    'outro': 'Outro'
  };
  return deficiencies[deficiencyKey] || deficiencyKey;
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F2F3F5',
    paddingTop: 10, // Ajuste para o botão de voltar
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    margin: 10,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  backButtonText: {
    marginLeft: 5,
    color: '#3AC7A8',
    fontSize: 16,
    fontWeight: '500',
  },
});