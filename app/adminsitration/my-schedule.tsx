import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getScale } from '../../src/controllers/scales';
import { getEmployees } from '../../src/controllers/employees';
import MyView from '../../src/components/MyView';
import { Ionicons } from '@expo/vector-icons';
import { Calendar, LocaleConfig, DateData } from 'react-native-calendars';
import { format, parseISO, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Definindo tipos
type MarkedDates = {
  [date: string]: {
    marked?: boolean;
    selected?: boolean;
    selectedColor?: string;
    dotColor?: string;
  };
};

interface Schedule {
  id: number;
  day: string;
  start_time: string;
  end_time: string;
  created_at: string;
  employ_id: number;
  date: string;
}

interface Employee {
  id: number;
  user_id: number;
  // Adicione outras propriedades conforme necessário
}

// Configuração do calendário em português
LocaleConfig.locales['pt'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  monthNamesShort: [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez'
  ],
  dayNames: [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
  ],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt';

export default function MySchedule() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [employeeData, setEmployeeData] = useState<Employee | null>(null);
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
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

        // 1. Buscar os dados do funcionário vinculado ao usuário
        const employeesResponse = await getEmployees({ user_id: Number(userId) });
        
        if (!employeesResponse.status || !employeesResponse.data?.length) {
          Alert.alert('Aviso', 'Nenhum funcionário vinculado a este usuário');
          return;
        }

        setEmployeeData(employeesResponse.data[0]);
        
        // 2. Buscar as escalas do funcionário
        const scalesResponse = await getScale({ employ_id: employeesResponse.data[0].id });
        
        if (scalesResponse.status && scalesResponse.data) {
          setSchedules(scalesResponse.data);
          
          // Preparar datas marcadas para o calendário
          const marked: MarkedDates = {};
          scalesResponse.data.forEach((schedule: Schedule) => {
            if (schedule.date) {
              marked[schedule.date] = { 
                marked: true,
                selected: false,
                selectedColor: '#3AC7A8',
                dotColor: '#3AC7A8'
              };
            }
          });
          
          setMarkedDates(marked);
          
          // Selecionar a data atual por padrão
          const today = format(new Date(), 'yyyy-MM-dd');
          setSelectedDate(today);
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

  const getScheduleForDate = (date: string): Schedule | undefined => {
    return schedules.find((s: Schedule) => isSameDay(parseISO(s.date), parseISO(date)));
  };

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
    
    // Atualizar as marcações para mostrar a data selecionada
    const updatedMarkedDates: MarkedDates = { ...markedDates };
    Object.keys(updatedMarkedDates).forEach((date: string) => {
      updatedMarkedDates[date] = {
        ...updatedMarkedDates[date],
        selected: date === day.dateString
      };
    });
    
    setMarkedDates(updatedMarkedDates);
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

        <Text style={styles.title}>Minha Escala</Text>
        
        {/* Calendário */}
        <View style={styles.calendarContainer}>
          <Calendar
            current={selectedDate || undefined}
            minDate={'2020-01-01'}
            maxDate={'2030-12-31'}
            onDayPress={handleDayPress}
            markedDates={markedDates}
            theme={{
              calendarBackground: '#fff',
              textSectionTitleColor: '#333',
              selectedDayBackgroundColor: '#3AC7A8',
              selectedDayTextColor: '#fff',
              todayTextColor: '#3AC7A8',
              dayTextColor: '#333',
              textDisabledColor: '#d9d9d9',
              dotColor: '#3AC7A8',
              selectedDotColor: '#fff',
              arrowColor: '#3AC7A8',
              monthTextColor: '#333',
              indicatorColor: '#3AC7A8',
              textDayFontWeight: '500',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '500',
              textDayFontSize: 14,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 14
            }}
          />
        </View>

        {/* Detalhes da escala para o dia selecionado */}
        <View style={styles.scheduleContainer}>
          {selectedDate ? (
            <>
              <Text style={styles.scheduleTitle}>
                {format(parseISO(selectedDate), "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </Text>
              
              {getScheduleForDate(selectedDate) ? (
                <View style={styles.scheduleItem}>
                  <View style={styles.timeContainer}>
                    <Ionicons name="time-outline" size={20} color="#3AC7A8" />
                    <Text style={styles.scheduleTime}>
                      {getScheduleForDate(selectedDate)?.start_time} - {getScheduleForDate(selectedDate)?.end_time}
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
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
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
    textTransform: 'capitalize',
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
});