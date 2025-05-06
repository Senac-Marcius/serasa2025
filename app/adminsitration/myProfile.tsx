import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserById } from '../../src/controllers/users';
import { getEmployees } from '../../src/controllers/employees';
import MyView from '../../src/components/MyView';
import { Myinput } from '../../src/components/MyInputs';
import { MaterialIcons } from '@expo/vector-icons';

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
      {/* Header com botão de voltar e título */}
      <View style={styles.header}>
        <Pressable 
          onPress={() => router.push('adminsitration/')}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="#3AC7A8" />
          <Text style={styles.backButton}>Voltar</Text>
        </Pressable>
        <Text style={styles.title}>Meu Perfil</Text>
        <View style={{ width: 24 }} /> {/* Espaçamento para alinhamento */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Dados Pessoais</Text>
          
          <Myinput
            label="Nome Completo"
            value={userData.name || 'Não informado'}
            placeholder=""
            onChangeText={() => {}}
            iconName="person-outline"
          />
          
          <Myinput
            label="Email"
            value={userData.email || 'Não informado'}
            placeholder=""
            onChangeText={() => {}}
            iconName="email"
          />
          
          <Myinput
            label="CPF"
            value={userData.cpf || 'Não informado'}
            placeholder=""
            onChangeText={() => {}}
            iconName="assignment-ind"
          />
          
          <Myinput
            label="Idade"
            value={userData.age || 'Não informado'}
            placeholder=""
            onChangeText={() => {}}
            iconName="cake"
          />
          
          <Myinput
            label="Contato"
            value={userData.contact || 'Não informado'}
            placeholder=""
            onChangeText={() => {}}
            iconName="phone"
          />
          
          <Myinput
            label="Endereço"
            value={userData.address || 'Não informado'}
            placeholder=""
            onChangeText={() => {}}
            iconName="home"
          />
        </View>

        {/* Dados específicos do funcionário */}
        {employeeData && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Dados Profissionais</Text>
            
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
              iconName="public"
            />

            <Myinput
              label="Gênero"
              value={getGenderLabel(employeeData.sex) || 'Não informado'}
              placeholder=""
              onChangeText={() => {}}
              iconName="accessibility"
            />

            <Myinput
              label="Estado Civil"
              value={getMaritalStatusLabel(employeeData.martinal_status) || 'Não informado'}
              placeholder=""
              onChangeText={() => {}}
              iconName="favorite-border"
            />

            <Myinput
              label="Etnia"
              value={getEthnicityLabel(employeeData.ethnicity) || 'Não informado'}
              placeholder=""
              onChangeText={() => {}}
              iconName="people-outline"
            />

            <Myinput
              label="Deficiência"
              value={getDeficiencyLabel(employeeData.deficiency) || 'Nenhuma'}
              placeholder=""
              onChangeText={() => {}}
              iconName="accessible"
            />

            <Myinput
              label="Status"
              value={employeeData.is_active === 'true' ? 'Ativo' : 'Inativo'}
              placeholder=""
              onChangeText={() => {}}
              iconName="verified-user"
            />
          </View>
        )}
      </ScrollView>
    </MyView>
  );
}

// Funções auxiliares (mantidas as mesmas)
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
    flex: 1,
    padding: 20,
    backgroundColor: '#F2F3F5',
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  backButton: {
    padding: 5,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3AC7A8',
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
});