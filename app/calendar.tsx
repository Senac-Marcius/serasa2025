import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyView from '../src/components/MyView';
import { useRouter } from 'expo-router';
import { supabase } from '../src/utils/supabase';
import { iCalendar, SetCalendarbd, UpdateCalendarbd, DeleteCalendarbd } from '../src/controllers/calendar';

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
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('calendar').select();
      if (error) console.log('Erro ao carregar calendários:', error);
      if (data) setCalendars(data as iCalendar[]);
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
      if (result) {
        setCalendars(calendars.map((c) => (c.id === req.id ? req : c)));
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

  return (
    <MyView router={router}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Cronograma de Matrículas</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{req.id === -1 ? 'Novo Cronograma' : 'Editar Cronograma'}</Text>
          <TextInput
            placeholder="Nome do aluno"
            value={req.studentname}
            onChangeText={(text) => setReq({ ...req, studentname: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Curso"
            value={req.course}
            onChangeText={(text) => setReq({ ...req, course: text })}
            style={styles.input}
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
            <TextInput
              placeholder="Data da matrícula"
              value={req.registrationdate}
              onChangeText={(text) => setReq({ ...req, registrationdate: text })}
              style={styles.input}
            />
          )}

          <TextInput
            placeholder="Período"
            value={req.period}
            onChangeText={(text) => setReq({ ...req, period: text })}
            style={styles.input}
          />

          <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
            <Text style={styles.primaryButtonText}>{req.id === -1 ? 'CADASTRAR' : 'ATUALIZAR'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Cronogramas Cadastrados</Text>
          <View style={styles.gridContainer}>
            {calendars.map((item) => (
              <View key={item.id} style={styles.cardGridItem}>
                <View style={styles.row}>
                  <Icon name="account" size={20} color="#6A1B9A" />
                  <Text style={styles.itemText}>Aluno: {item.studentname}</Text>
                </View>
                <View style={styles.row}>
                  <Icon name="book-open-outline" size={20} color="#6A1B9A" />
                  <Text style={styles.itemText}>Curso: {item.course}</Text>
                </View>
                <View style={styles.row}>
                  <Icon name="calendar" size={20} color="#6A1B9A" />
                  <Text style={styles.itemText}>Data da Matrícula: {item.registrationdate}</Text>
                </View>
                <View style={styles.row}>
                  <Icon name="clock-outline" size={20} color="#6A1B9A" />
                  <Text style={styles.itemText}>Período: {item.period}</Text>
                </View>
                <View style={styles.actions}>
                  <TouchableOpacity style={styles.editButton} onPress={() => editCalendar(item.id)}>
                    <Text style={styles.buttonText}>EDITAR</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => delCalendar(item.id)}>
                    <Text style={styles.buttonText}>EXCLUIR</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
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
    color: '#333',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    padding: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6A1B9A',
    marginBottom: 10,
  },
  input: {
    height: 45,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#FAFAFA',
  },
  primaryButton: {
    backgroundColor: '#6A1B9A',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  primaryButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
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
    width: '100%',
    maxWidth: 300,
    flexGrow: 1,
  },
  itemText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  editButton: {
    backgroundColor: '#9575CD',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: '#EF5350',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
});
