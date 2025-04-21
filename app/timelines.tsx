import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import MyView from '../src/components/MyView';
import { useRouter } from 'expo-router';
import MyCalendar from '../src/components/MyCalendar';
import MyTimerPicker from '../src/components/MyTimerPiker';
import { Myinput } from '../src/components/MyInputs';
import MyButton from '../src/components/MyButtons';
import { supabase } from '../src/utils/supabase';
import {
  setTimeline,
  iTimeline,
  delTimelines as delTimelinesDoController,
  editTimelines as editTimelinesDoController,
  getTimelines,
} from '../src/controllers/timelines';

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
  const [filtro, setFiltro] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data: todos, error } = await supabase.from('timelines').select();
      if (todos && todos.length > 0) {
        setTimelines(todos);
      }

      const result = await getTimelines({});
      if (!result.status) {
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
      setTimelines(timelines.map((t) => (t.id === req.id ? req : t)));
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
    const timeline = timelines.find((t) => t.id === id);
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

  return (
    <MyView router={router}>
      <ScrollView style={{ flex: 1, backgroundColor: '#f0f2f5' }} keyboardShouldPersistTaps="handled">
        <View style={{ padding: 20 }}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Meu Cronograma</Text>
            <Pressable style={styles.buttonNewText} onPress={() => { setShowForm(true); setIsEditing(false); }}>
              <Text style={styles.buttonCapsule}>+ Novo Cronograma</Text>
            </Pressable>
          </View>

          <View style={styles.searchWrapper}>
            <TextInput
              placeholder="Busque professor"
              value={filtro}
              onChangeText={setFiltro}
              style={styles.searchInput}
              placeholderTextColor="#999"
            />
          </View>

          <Text style={styles.formTitle}>Cadastro de Cronogramas</Text>

          {showForm && (
            <View style={styles.card}>
              <MyCalendar
                date={req.date}
                setDate={(date) => setReq({ ...req, date })}
                icon=""
              />

              <MyTimerPicker
                onTimeSelected={(text) => setReq({ ...req, end_time: text })}
                initialTime={req.end_time}
              />

              <MyTimerPicker
                onTimeSelected={(text) => setReq({ ...req, start_time: text })}
                initialTime={req.start_time}
              />

              <Myinput iconName="" label="Professor" placeholder="Digite o nome do Professor:" value={req.teacher_id} onChangeText={(text) => setReq({ ...req, teacher_id: text })} />
              <Myinput iconName="" label="Disciplina" placeholder="Digite a disciplina:" value={req.discipline_id} onChangeText={(text) => setReq({ ...req, discipline_id: text })} />
              <Myinput iconName="" label="Local" placeholder="Digite o Local" value={req.local_id?.toString()} onChangeText={(text) => setReq({ ...req, local_id: Number(text) })} />
              <Myinput iconName="" label="Turma" placeholder="Digite o Turma:" value={req.class_id?.toString()} onChangeText={(text) => setReq({ ...req, class_id: Number(text) })} />

              <View style={styles.formButtons}>
                <MyButton title={isEditing ? 'Atualizar' : 'Cadastrar'} button_type="default" onPress={handleRegister} style={{ flex: 1, marginRight: 8 }} />
                <MyButton title="Cancelar" onPress={() => { setShowForm(false); setIsEditing(false); }} style={{ flex: 1, marginLeft: 8, backgroundColor: '#EEE' }} />
              </View>
            </View>
          )}

          <View style={styles.table}>
            <View style={styles.tableRowHeader}>
              <Text style={styles.th}>Professor</Text>
              <Text style={styles.th}>Disciplina</Text>
              <Text style={styles.th}>Local</Text>
              <Text style={styles.th}>Turma</Text>
              <Text style={styles.th}>Carga</Text>
              <Text style={styles.th}>Ações</Text>
            </View>

            {timelines
              ?.filter((item) => item.teacher_id?.toLowerCase().includes(filtro.toLowerCase()))
              .map((item) => (
                <View style={styles.tableRow} key={item.id}>
                  <Text style={styles.td}>{item.teacher_id || '-'}</Text>
                  <Text style={styles.td}>{item.discipline_id || '-'}</Text>
                  <Text style={styles.td}>{item.local_id}</Text>
                  <Text style={styles.td}>{item.class_id}</Text>
                  <Text style={styles.td}>{item.start_time ? item.start_time + 'h' : '-'}</Text>
                  <Text style={styles.td}>{item.end_time ? item.end_time + 'h' : '-'}</Text>
                  <View style={styles.actions}>
                    <TouchableOpacity onPress={() => editTimelines(item.id)}>
                      <Text style={styles.edit}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => delTimelines(item.id)}>
                      <Text style={styles.del}>Excluir</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
          </View>
        </View>
      </ScrollView>
    </MyView>
  );
}

const styles = StyleSheet.create({
  buttonCapsule: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'purple',
    textAlign: 'center',
    color: 'white',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  title: { fontSize: 22, fontWeight: '700', color: 'purple' },
  buttonNewText: { backgroundColor: 'purple', fontWeight: '700' },
  searchWrapper: {
    marginBottom: 30,
    position: 'relative',
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    paddingRight: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 14,
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
  },
  formButtons: {
    flexDirection: 'row',
    marginTop: 16,
  },
  table: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 8,
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 12,
    paddingLeft: 8,
  },
  edit: { color: '#3AC7A8', fontWeight: '600', fontSize: 13 },
  del: { color: '#D63031', fontWeight: '600', fontSize: 13 },
});
