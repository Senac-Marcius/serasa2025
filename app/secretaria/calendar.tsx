import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Calendar } from 'react-native-calendars';
import MyView from '../../src/components/MyView';
import { Myinput } from '../../src/components/MyInputs';
import MyButton from '../../src/components/MyButtons';
import MyText from '../../src/components/MyText';
import { MyItem } from '../../src/components/MyItem';
import { useRouter } from 'expo-router';
import {
  iCalendar,
  toListCalendar,
  getCalendars,
  SetCalendarbd,
  UpdateCalendarbd,
  DeleteCalendarbd
} from '../../src/controllers/calendar';

export default function CalendarsScreen() {
  const [req, setReq] = useState<iCalendar>({
    studentname: '',
    course: '',
    registrationdate: '',
    period: '',
    id: -1,
    created_at: new Date().toISOString(),
  });

  const [calendars, setCalendars] = useState<iCalendar[]>([]);
  const [showCalendarView, setShowCalendarView] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await getCalendars();
      if (res.status) {
        setCalendars(res.data as iCalendar[]);
      } else {
        console.log('Erro ao carregar calendários:', res.data);
      }
    })();
  }, []);

  async function handleRegister() {
    if (!req.studentname.trim() || !req.course.trim() || !req.registrationdate.trim() || !req.period.trim()) {
      console.log('Preencha todos os campos!');
      return;
    }

    if (req.id === -1) {
      const result = await SetCalendarbd({
        studentname: req.studentname,
        course: req.course,
        registrationdate: req.registrationdate,
        period: req.period,
        created_at: req.created_at,
      });
      if (result && result[0]) {
        setCalendars([...calendars, result[0]]);
      }
    } else {
      const result = await UpdateCalendarbd(req);
      if (result && result[0]) {
        setCalendars(calendars.map((c) => (c.id === req.id ? result[0] : c)));
      }
    }

    resetForm();
  }

  async function delCalendar(id: number) {
    const success = await DeleteCalendarbd(id);
    if (success) setCalendars(calendars.filter((c) => c.id !== id));
  }

  function editCalendar(id: number) {
    const found = calendars.find((c) => c.id === id);
    if (found) setReq(found);
  }

  function resetForm() {
    setReq({
      studentname: '',
      course: '',
      registrationdate: '',
      period: '',
      id: -1,
      created_at: new Date().toISOString(),
    });
  }

  function handleWebDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setReq({ ...req, registrationdate: e.target.value });
  }

  function getMarkedDates(calendars: iCalendar[]) {
    const marked: Record<string, any> = {};
    calendars.forEach((item) => {
      marked[item.registrationdate] = {
        selected: true,
        selectedColor: '#E53935',
        disabled: true,
        disableTouchEvent: true,
      };
    });
    return marked;
  }

  return (
    <MyView router={router} style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <MyText style={styles.pageTitle}>Cronograma de Matrículas</MyText>

        {/* Formulário */}
        <View style={styles.card}>
          <MyText style={styles.sectionTitle}>{req.id === -1 ? 'Novo Cronograma' : 'Editar Cronograma'}</MyText>

          <Myinput
            iconName="account"
            label="Nome do Aluno"
            value={req.studentname}
            onChangeText={(text) => setReq({ ...req, studentname: text })}
            placeholder="Digite o nome do aluno..."
          />

          <Myinput
            iconName="book"
            label="Curso"
            value={req.course}
            onChangeText={(text) => setReq({ ...req, course: text })}
            placeholder="Digite o curso..."
          />

          {Platform.OS === 'web' ? (
            <input
              type="date"
              value={req.registrationdate}
              onChange={handleWebDateChange}
              style={{
                height: 45,
                paddingLeft: 12,
                paddingRight: 12,
                marginBottom: 12,
                borderRadius: 6,
                border: '1px solid #DDD',
                backgroundColor: '#FAFAFA',
                fontFamily: 'sans-serif',
                width: '100%',
                boxSizing: 'border-box',
              }}
            />
          ) : (
            <Myinput
              iconName="calendar"
              label="Data da Matrícula"
              value={req.registrationdate}
              onChangeText={(text) => setReq({ ...req, registrationdate: text })}
              placeholder="AAAA-MM-DD"
            />
          )}

          <Myinput
            iconName="clock"
            label="Período"
            value={req.period}
            onChangeText={(text) => setReq({ ...req, period: text })}
            placeholder="Digite o período..."
          />

          <MyButton
            title={req.id === -1 ? 'CADASTRAR' : 'ATUALIZAR'}
            onPress={handleRegister}
            button_type="rect"
            style={styles.primaryButton}
          />
        </View>

        {/* Lista ou Calendário */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <TouchableOpacity onPress={() => setShowCalendarView(!showCalendarView)} style={styles.calendarToggleButton}>
              <Icon name={showCalendarView ? 'view-list' : 'calendar-month'} size={20} color="#6A1B9A" />
            </TouchableOpacity>
            <MyText style={styles.sectionTitle}>
              {showCalendarView ? 'Dias Registrados' : 'Cronogramas Cadastrados'}
            </MyText>
          </View>

          {showCalendarView ? (
            <Calendar
              markedDates={getMarkedDates(calendars)}
              onDayPress={() => {}}
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#6A1B9A',
                dayTextColor: '#333',
                disabledArrowColor: '#ccc',
                monthTextColor: '#6A1B9A',
                indicatorColor: '#6A1B9A',
                todayTextColor: '#6A1B9A',
              }}
            />
          ) : (
            <View style={styles.gridContainer}>
              {calendars.map((item) => (
                <MyItem
                  key={item.id}
                  style={styles.cardGridItem}
                  onEdit={() => editCalendar(item.id)}
                  onDel={() => delCalendar(item.id)}
                >
                  <MyText style={styles.itemText}>👤 Aluno: {item.studentname}</MyText>
                  <MyText style={styles.itemText}>📘 Curso: {item.course}</MyText>
                  <MyText style={styles.itemText}>📅 Data: {item.registrationdate}</MyText>
                  <MyText style={styles.itemText}>⏱️ Período: {item.period}</MyText>
                </MyItem>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </MyView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F4F4F4',
    flex: 1,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B0082',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6A1B9A',
    marginBottom: 12,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  calendarToggleButton: {
    width: 36,
    height: 36,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#6A1B9A',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    marginTop: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  cardGridItem: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
    width: 280,
  },
  itemText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
});
