import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Pressable, } from 'react-native';
import MyView from '../../src/components/MyView';
import { useRouter } from 'expo-router';
import MyCalendar from '../../src/components/MyCalendar';
import MySearch from '../../src/components/MySearch';
import { Myinput } from '../../src/components/MyInputs';
import { supabase } from '../../src/utils/supabase';
import { setTimeline, iTimeline, delTimelines as delTimelinesDoController, editTimelines as editTimelinesDoController, getTimelines, } from '../../src/controllers/timelines';
import MyButton from '../../src/components/MyButtons';
import Mytext from '../../src/components/MyText';
import MyTimerPicker from '../../src/components/MyTimerPiker';
import MySelect from '../../src/components/MySelect';
import { getEmployees, iEmployees, toListEmployees } from '../../src/controllers/employees';
import { getDisciplines, iDisciplines, toListDisciplines, getDisciplinesSelectList  } from '../../src/controllers/disciplines';
import { getLocals, toListLocal, iLocal } from '@/src/controllers/locals';
import { getCourses, toListCourses } from '@/src/controllers/courses';
import { useUserData } from "@/hooks/useUserData";
import { usePathname } from "expo-router";
import SideMenu from "./components/SideMenu";



export default function TimelineScreen() {

    // const userId = localStorage.getItem("userId");
    const userId = 3;
  
    const pathname = usePathname();
  
    const { user, role, classroomData, loading } = useUserData(userId);
  const [req, setReq] = useState({
    id: -1,
    discipline_id: -1,
    local_id: -1,
    start_time: '',
    end_time: '',
    date: new Date().toISOString(),
    created_at: new Date().toISOString(),
    teacher_id: -1,
    turma: '',
    
  });

  const [timelines, setTimelines] = useState<iTimeline[]>([]);
  const [busca, setBusca] = useState('');
  const router = useRouter();
  const [filtro, setFiltro] = useState('');
  const [teatcher, setTeatcher] = useState<{key:number, option: string}[]>([]);
  const [discipline, setDisciplines, ] = useState<{key:number, option: string}[]>([]);
  const [local, setLocal] = useState<{ key: number; option: string }[]>([]);
  const [classes, setClasses] = useState<{key:number, option: string}[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [date, setDate] = useState('');



  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    (async () => {
      const result = await getTimelines({});
      if (result.status && result.data && result.data.length > 0) {
        setTimelines(result.data);
      } else {
        console.log('Erro ao buscar disciplinas:', result.error);
      }
    })();


    (async () =>{
      const result = await getEmployees({cargo:"Teacher"});
      if (result.status && result.data && result.data.length > 0) {
        setTeatcher( await toListEmployees(result.data) );
      } else {
        console.log('Erro ao buscar Docente:', result.error);
      }
    })();

    (async () => {
      const retorno = await  getCourses ({})
      if (retorno.status && retorno.data && retorno.data.length > 0){
        setCourses(toListCourses(retorno.data));
      }  
  })();

    (async () =>{
      const result = await getDisciplines({discipline:"disciplines"});
      if (result.status && result.data && result.data.length > 0) {
        setDisciplines( await toListDisciplines(result.data) );
      } else {
        console.log('Erro ao buscar :', result.error);
      }
    })();

    (async () =>{
      const result = await getLocals({});
      console.log(result)
      if (result.status && result.data && result.data.length > 0) {
        setLocal( await toListLocal(result.data) );
      } else {
        console.log('Erro ao buscar :', result.error);
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
      await editTimelinesDoController(req.id, req);
    }

    setReq({
      id: -1,
      discipline_id: -1,
      local_id: -1,
      start_time: '',
      end_time: '',
      date: new Date().toISOString(),
      created_at: new Date().toISOString(),
      teacher_id: -1,
      turma: '',
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
      <View style={{ flexDirection: "row", flex: 1 }}>
        {/* SideMenu com largura fixa */}
        <View style={{ width: 280, flexShrink: 0 }}>
          <SideMenu role={role} activeRoute="classroom/timelines" />
        </View>

        {/* Conteúdo principal */}
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{ flex: 1, backgroundColor: "#f0f2f5" }}
            keyboardShouldPersistTaps="handled"
          >
            {/* Cabeçalho */}
            <View style={{ padding: 20 }}>
              <View style={styles.headerRow}>
                <Text style={styles.title}>Meu Cronograma</Text>
                <Pressable
                  style={styles.buttonCapsule}
                  onPress={() => setShowForm(true)}
                >
                  <Text style={{ color: "white" }}>+ Novo Cronograma</Text>
                </Pressable>
              </View>
            </View>

            {/* Barra de busca */}
            <View style={styles.searchWrapper}>
              <MySearch
                busca={filtro}
                onChangeText={setFiltro}
                onPress={buscar}
                style={styles.searchWrapper}
                placeholder="Filtrar"
              />
            </View>

            <Mytext style={styles.formTitle}>Cronograma do Docente</Mytext>

            {/* Formulário */}
            {showForm && (
              <View style={styles.card}>
                <Mytext style={styles.titlee}>Data</Mytext>
                <MyCalendar
                  date={req.date}
                  setDate={(date) => setReq({ ...req, date })}
                  icon="calendar-outline"
                />

                <Mytext style={styles.titlee}>Horário de Início</Mytext>
                <MyTimerPicker
                  onTimeSelected={(text) =>
                    setReq({ ...req, start_time: text })
                  }
                  initialTime={req.start_time}
                />

                <Mytext style={styles.titlee}>Horário do Fim</Mytext>
                <MyTimerPicker
                  onTimeSelected={(text) =>
                    setReq({ ...req, end_time: text })
                  }
                  initialTime={req.end_time}
                />

                <MySelect
                  caption="Selecione o Docente"
                  label={
                    teatcher.find((t) => t.key == req.teacher_id)?.option ||
                    "Selecione um Docente"
                  }
                  list={teatcher}
                  setLabel={() => {}}
                  setKey={(key) => setReq({ ...req, teacher_id: key })}
                />

                <MySelect
                  caption="Selecione a Disciplina"
                  label={
                    discipline.find((t) => t.key == req.discipline_id)
                      ?.option || "Selecione a Disciplina"
                  }
                  list={discipline}
                  setLabel={() => {}}
                  setKey={(key) => setReq({ ...req, discipline_id: key })}
                />

            <MySelect
              caption="Selecione o Local"
              label={
                local.find((t) => t.key === req.local_id)?.option || "Selecione o Local"
              }
              list={local}
              setLabel={() => {}}
              setKey={(key) => setReq({ ...req, local_id: key })}
            />


                <MySelect
                  caption="Selecione a Turma"
                  label={
                    courses.find((c) => c.key == req.turma)?.option ||
                    "Selecione a Turma"
                  }
                  list={courses}
                  setLabel={() => {}}
                  setKey={(key) => {
                    setReq({ ...req, turma: key });
                  }}
                />

                <View style={styles.formButtons}>
                  <MyButton
                    title={isEditing ? "Atualizar" : "Cadastrar"}
                    button_type="default"
                    onPress={handleRegister}
                    style={{ flex: 1, marginRight: 8 }}
                  />
                  <MyButton
                    title="Cancelar"
                    onPress={() => setShowForm(false)}
                    style={{ flex: 1, marginLeft: 8, backgroundColor: "#EEE" }}
                  />
                </View>
              </View>
            )}

            {/* Tabela */}
            <View style={styles.table}>
              <View style={styles.tableRowHeader}>
                <Text style={styles.th}>Docente</Text>
                <Text style={styles.th}>Disciplina</Text>
                <Text style={styles.th}>Local</Text>
                <Text style={styles.th}>Turma</Text>
                <Text style={styles.th}>Horário de Início</Text>
                <Text style={styles.th}>Horário do Fim</Text>
                <Text style={styles.th}>Data</Text>
                <Text style={styles.th}>Ações</Text>
              </View>

              {timelines.map((item) => (
                <View style={styles.tableRow} key={item.id}>
                  <Text style={styles.td}>
                    {teatcher.find((c) => c.key == item.teacher_id)?.option ||
                      ""}
                  </Text>
                  <Text style={styles.td}>
                    {discipline.find((c) => c.key == item.discipline_id)
                      ?.option || ""}
                  </Text>
                  <Text style={styles.td}>
                    {local.find((c) => c.key == item.local_id)?.option || ""}
                  </Text>
                  <Text style={styles.td}>
                    {courses.find((c) => c.key == item.turma)?.option || ""}
                  </Text>
                  <Text style={styles.td}>
                    {item.start_time ? item.start_time + "h" : "-"}
                  </Text>
                  <Text style={styles.td}>
                    {item.end_time ? item.end_time + "h" : "-"}
                  </Text>
                  <Text style={styles.td}>{item.date}</Text>
                  <Text style={[styles.td, styles.actions]}>
                    <Text
                      style={styles.edit}
                      onPress={() => editTimelines(item.id)}
                    >
                      Editar
                    </Text>{" "}
                    <Text
                      style={styles.del}
                      onPress={() => delTimelines(item.id)}
                    >
                      Excluir
                    </Text>
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
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



  titlee: {
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#6a1b97',
    fontSize: 14,
    fontStyle:'normal',
    fontFamily:'Roboto',
  },

  buttonNewText: { backgroundColor: 'purple', fontWeight: '700' },
  buttonCapsule: {
    padding: 10,
    borderRadius: 50,
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
