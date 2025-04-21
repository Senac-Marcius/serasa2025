import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,ScrollView,TouchableOpacity,Pressable,} from 'react-native';
import MyView from '../src/components/MyView';
import { useRouter } from 'expo-router';
import MyCalendar from '../src/components/MyCalendar';
import MySearch from '../src/components/MySearch';
import { Myinput } from '../src/components/MyInputs';
import { supabase } from '../src/utils/supabase';
import {setTimeline,iTimeline,delTimelines as delTimelinesDoController,editTimelines as editTimelinesDoController,getTimelines,} from '../src/controllers/timelines';
import MyButton from '../src/components/MyButtons';
import Mytext from '../src/components/MyText';
import MyTimerPicker from '../src/components/MyTimerPiker';

export default function TimelineScreen() {
  const [req, setReq] = useState({
    id: -1,
    class_id: 2,
    discipline_id: '',
    local_id: 1,
    start_time: '',
    end_time: '',
    date: new Date().toISOString(),
    created_at: new Date().toISOString(),
    teacher_id: '',
  });

  const [timelines, setTimelines] = useState<iTimeline[]>([]);
  const [busca, setBusca] = useState('');
  const router = useRouter();
  const [filtro, setFiltro] = useState('');
  const [disciplines, setDisciplines] = useState<iTimeline[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: todos, error } = await supabase.from('timelines').select();
      if (todos && todos.length > 0) {
        setTimelines(todos);
      }

      const result = await getTimelines({});
      if (result.status) {
        setDisciplines(result.data as iTimeline[]);
      } else {
        console.log('Erro ao buscar disciplinas:', result.data);
      }

      if (error) {
        console.error('Erro ao buscar os cronogramas:', error);
      }
    })();
  }, []);

  async function handleRegister() {
    if (req.id === -1) {
      const newId = timelines.length ? timelines[timelines.length - 1].id + 1 : 0;
      const newTimeline = { ...req, id: newId };
      setTimelines([...timelines, newTimeline]);
      await setTimeline(newTimeline);
    } else {
      setTimelines(timelines.map((T) => (T.id === req.id ? req : T)));
      await editTimelinesDoController(req);
    }

    setReq({
      id: -1,
      class_id: 2,
      discipline_id: '',
      local_id: 1,
      start_time: '',
      end_time: '',
      date: new Date().toISOString(),
      created_at: new Date().toISOString(),
      teacher_id: '',
    });
    setShowForm(false);
    setIsEditing(false);
  }

  function editTimelines(id: number) {
    const timeline = timelines.find((T) => T.id === id);
    if (timeline) {
      setReq(timeline);
      setShowForm(true);
      setIsEditing(true);
    }
  }

  async function delTimelines(id: number) {
    const result = await delTimelinesDoController(id);
    if (result) {
      setTimelines(timelines.filter((t) => t.id !== id));
    }
  }

  function buscar() {
    console.log('Buscando por:', busca);
  }

  return (
    <MyView router={router}>
      <ScrollView style={{ flex: 1, backgroundColor: '#f0f2f5' }} keyboardShouldPersistTaps="handled">
        <View style={{ flexDirection: 'row', flex: 1, backgroundColor: '#f0f2f5' }}>
          <View style={{ flex: 1, backgroundColor: '#f0f2f5' }}>
            <View style={{ padding: 20 }}>
              <View style={styles.headerRow}>
                <Text style={styles.title}>Meu Cronograma</Text>
                <Pressable style={styles.buttonNewText} onPress={() => setShowForm(true)}>
                  <Text style={styles.buttonCapsule}>+ Novo Cronograma</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.searchWrapper}>
          <MySearch
            busca={filtro}
            onChangeText={setFiltro}
            onPress={buscar}
            style={styles.searchWrapper}
          />
        </View>

        <Mytext style={styles.formTitle}>Cadastro de Cronogramas</Mytext>

        {showForm && (
          <View style={styles.card}>
            <Mytext style={styles.titlee}>Data </Mytext>
            <MyCalendar date={req.date} setDate={(date) => setReq({ ...req, date })} icon="" />

            <Mytext style={styles.titlee}>Horário de Início </Mytext>
            <MyTimerPicker
              onTimeSelected={(text) => setReq({ ...req, start_time: text })}
              initialTime={req.start_time}
            />
            <Mytext style={styles.titlee}>Horário do Fim </Mytext>
            <MyTimerPicker
              onTimeSelected={(text) => setReq({ ...req, end_time: text })}
              initialTime={req.end_time}
            />


            <Myinput iconName="" label="Professor" placeholder="Digite o nome do Professor:" value={req.teacher_id} onChangeText={(text) => setReq({ ...req, teacher_id: text })} />
            <Myinput iconName="" label="Disciplina" placeholder="Digite a disciplina:" value={req.discipline_id} onChangeText={(text) => setReq({ ...req, discipline_id: text })} />
            <Myinput iconName="" label="Local" placeholder="Digite o Local" value={req.local_id?.toString()} onChangeText={(text) => setReq({ ...req, local_id: Number(text) })} />
            <Myinput iconName="" label="Turma" placeholder="Digite o Turma:" value={req.class_id?.toString()} onChangeText={(text) => setReq({ ...req, class_id: Number(text) })} />

            <View style={styles.formButtons}>
              <MyButton title={isEditing ? 'Atualizar' : 'Cadastrar'} button_type="default" onPress={handleRegister} style={{ flex: 1, marginRight: 8 }} />
              <MyButton title="Cancelar" onPress={() => setShowForm(false)} style={{ flex: 1, marginLeft: 8, backgroundColor: '#EEE' }} />
            </View>
          </View>
        )}

        <View style={styles.table}>
          <View style={styles.tableRowHeader}>
            <Text style={styles.th}>Professor</Text>
            <Text style={styles.th}>Disciplina</Text>
            <Text style={styles.th}>Local</Text>
            <Text style={styles.th}>Turma</Text>
            <Text style={styles.th}>Horário de Início</Text>
            <Text style={styles.th}>Horário do fim</Text>
            <Text style={styles.th}>Data</Text>
            <Text style={styles.th}>Ações</Text>
          </View>

          {timelines
            .filter((item) => item.teacher_id?.toLowerCase().includes(filtro.toLowerCase()))
            .map((item) => (
              <View style={styles.tableRow} key={item.id}>
                <Text style={styles.td}>{item.teacher_id || '-'}</Text>
                <Text style={styles.td}>{item.discipline_id || '-'}</Text>
                <Text style={styles.td}>{item.local_id}</Text>
                <Text style={styles.td}>{item.class_id}</Text>
                <Text style={styles.td}>{item.start_time ? item.start_time + 'h' : '-'}</Text>
                <Text style={styles.td}>{item.end_time ? item.end_time + 'h' : '-'}</Text>
                <Text style={styles.td}>{item.date}</Text>
                <Text style={[styles.td, styles.actions]}>
                  <Text style={styles.edit} onPress={() => editTimelines(item.id)}>Editar</Text>{' '}
                  <Text style={styles.del} onPress={() => delTimelines(item.id)}>Excluir</Text>
                </Text>
              </View>
            ))}
        </View>
      </ScrollView>
    </MyView>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  title: { fontSize: 22, fontWeight: '700', color: 'purple' },
  titlee: { fontSize: 15, fontWeight: '700', color: 'purple' },

  buttonNewText: { backgroundColor: 'purple', fontWeight: '700' },
  buttonCapsule: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'purple',
    textAlign: 'center',
    color: 'white',
  },
  searchWrapper: {
    marginBottom: 30,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'purple',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  formButtons: {
    flexDirection: 'row',
    marginTop: 16,
  },
  table: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 8,
    marginHorizontal: 16,
  },
  tableRowHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  th: { flex: 1, fontWeight: '600', fontSize: 13, color: '#333' },
  td: { flex: 1, fontSize: 13, color: '#444' },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  edit: { color: '#3AC7A8', fontWeight: '600', fontSize: 13 },
  del: { color: '#D63031', fontWeight: '600', fontSize: 13 },
  
});
