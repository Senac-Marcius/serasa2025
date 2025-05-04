import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getScale } from '../../src/controllers/scales';
import { getEmployees } from '../../src/controllers/employees';
import MyView from '../../src/components/MyView';
import { Ionicons } from '@expo/vector-icons';

const DIAS_SEMANA = [
  { key: '1', nome: 'Segunda-feira' },
  { key: '2', nome: 'Terça-feira' },
  { key: '3', nome: 'Quarta-feira' },
  { key: '4', nome: 'Quinta-feira' },
  { key: '5', nome: 'Sexta-feira' },
  { key: '6', nome: 'Sábado' },
  { key: '7', nome: 'Domingo' }
];

export default function MySchedule() {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [employeeData, setEmployeeData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userId = await AsyncStorage.getItem('userId');
        
        if (!userId) {
          Alert.alert('Erro', 'Usuário não identificado');
          return;
        }

        // DEBUG: Mostrar o userId
        console.log('User ID from storage:', userId);

        // 1. Buscar os dados do funcionário vinculado ao usuário
        const employeesResponse = await getEmployees({ user_id: Number(userId) });
        
        // DEBUG: Mostrar resposta dos funcionários
        console.log('Employees response:', employeesResponse);

        if (!employeesResponse.status || !employeesResponse.data?.length) {
          Alert.alert('Aviso', 'Nenhum funcionário vinculado a este usuário');
          return;
        }

        setEmployeeData(employeesResponse.data[0]);
        
        // DEBUG: Mostrar dados do funcionário
        console.log('Employee data:', employeesResponse.data[0]);

        // 2. Buscar as escalas do funcionário
        const scalesResponse = await getScale({ employ_id: employeesResponse.data[0].id });
        
        // DEBUG: Mostrar resposta das escalas
        console.log('Scales response:', scalesResponse);

        if (scalesResponse.status && scalesResponse.data) {
          // Converter os dias numéricos para nomes
          const formattedSchedules = scalesResponse.data.map(schedule => ({
            ...schedule,
            day: DIAS_SEMANA.find(dia => dia.key === schedule.day.toString())?.nome || schedule.day
          }));
          
          setSchedules(formattedSchedules);
          
          // DEBUG: Mostrar escalas formatadas
          console.log('Formatted schedules:', formattedSchedules);

          if (formattedSchedules.length > 0) {
            setSelectedDay(formattedSchedules[0].day);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao buscar os dados');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getScheduleForDay = (day: string) => {
    return schedules.find((s) => s.day === day);
  };

  if (loading) {
    return (
      <MyView>
        <View style={styles.container}>
          <Text>Carregando seus dados...</Text>
        </View>
      </MyView>
    );
  }

  if (!employeeData) {
    return (
      <MyView>
        <View style={styles.container}>
          <Text>Nenhum dado de funcionário encontrado</Text>
        </View>
      </MyView>
    );
  }

  return (
    <MyView>
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable 
          onPress={() => router.push('adminsitration/')}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#3AC7A8" />
          <Text style={styles.backButtonText}>Voltar</Text>
        </Pressable>

        <Text style={styles.title}>Minha Escala Semanal</Text>
        

        {/* Seletor de dias */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.daySelector}
        >
          {DIAS_SEMANA.map((dia) => {
            const hasSchedule = schedules.some(s => s.day === dia.nome);
            return (
              <Pressable
                key={dia.key}
                onPress={() => setSelectedDay(dia.nome)}
                style={[
                  styles.dayButton,
                  selectedDay === dia.nome && styles.dayButtonSelected,
                  !hasSchedule && styles.dayWithoutSchedule
                ]}
              >
                <Text style={[
                  styles.dayButtonText,
                  selectedDay === dia.nome && styles.dayButtonTextSelected,
                  !hasSchedule && styles.dayWithoutScheduleText
                ]}>
                  {dia.nome.substring(0, 3)}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Detalhes da escala */}
        <View style={styles.scheduleContainer}>
          {selectedDay ? (
            <>
              <Text style={styles.scheduleTitle}>
                {selectedDay}
              </Text>
              
              {getScheduleForDay(selectedDay) ? (
                <View style={styles.scheduleItem}>
                  <View style={styles.timeContainer}>
                    <Ionicons name="time-outline" size={20} color="#3AC7A8" />
                    <Text style={styles.scheduleTime}>
                      {getScheduleForDay(selectedDay).start_time} - {getScheduleForDay(selectedDay).end_time}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={styles.scheduleItem}>
                  <Text style={styles.noSchedule}>Folga</Text>
                </View>
              )}
            </>
          ) : (
            <View style={styles.scheduleItem}>
              <Text style={styles.noSchedule}>Nenhum dia selecionado</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </MyView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#F2F3F5',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    marginLeft: 8,
    color: '#3AC7A8',
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  daySelector: {
    paddingBottom: 10,
    marginBottom: 20,
  },
  dayButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: '#E5FBF8',
  },
  dayButtonSelected: {
    backgroundColor: '#3AC7A8',
  },
  dayWithoutSchedule: {
    backgroundColor: '#F5F5F5',
  },
  dayWithoutScheduleText: {
    color: '#999',
  },
  dayButtonText: {
    color: '#3AC7A8',
    fontWeight: '500',
  },
  dayButtonTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  scheduleContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },
  scheduleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  scheduleItem: {
    backgroundColor: '#F3F1FE',
    padding: 16,
    borderRadius: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleTime: {
    fontSize: 16,
    color: '#6C63FF',
    fontWeight: '500',
    marginLeft: 8,
  },
  noSchedule: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  debugContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 20,
  },
  debugInfo: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  debugTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#666',
  },
  debugText: {
    marginBottom: 5,
    color: '#333',
  },
});