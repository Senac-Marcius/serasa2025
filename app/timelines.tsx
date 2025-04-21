import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity,TextInput,Pressable } from 'react-native';
import MyView from '../src/components/MyView';
import { useRouter } from 'expo-router';
import MyCalendar from '../src/components/MyCalendar'; 
import MySearch from '../src/components/MySearch';
import { Myinput, MyCheck, MyTextArea } from '../src/components/MyInputs'; 
import { supabase } from '../src/utils/supabase';
import { setTimeline, iTimeline, delTimelines as delTimelinesDoController, editTimelines as editTimelinesDoController,getTimelines,  } from '../src/controllers/timelines';
import MyButton from '../src/components/MyButtons';
import MyList from '../src/components/MyList';
import { MyItem } from '../src/components/MyItem';
import Mytext from '../src/components/MyText';
import MyTimerPicker from '../src/components/MyTimerPiker';
import { text } from 'stream/consumers';
import { Icon } from 'react-native-paper';





export default function TimelineScreen() {
  const [req, setReq] = useState({
    id: -1,
    class_id: 2,
    discipline_id: '',
    local_id: 1,
    start_time: '',
    end_time: '',
    date:  new Date().toISOString(),
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


  // Buscar os cronogramas ao carregar o componente
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
        console.error("Erro ao buscar os cronogramas:", error);
      }
      
    })();
  }, []);


  

  // Função para registrar um novo cronograma ou editar um existente
  
     async function handleRegister() {
    
    if (req.id === -1) {
      // Criar novo cronograma
      const newId = timelines.length ? timelines[timelines.length - 1].id + 1 : 0;
      const newTimeline = { ...req, id: newId };
      setTimelines([...timelines, newTimeline]);
      await setTimeline(newTimeline);
    } else {
      // Atualizar cronograma existente
      setTimelines(timelines.map(T => (T.id === req.id ? req : T)));
      await editTimelinesDoController(req);
    }


    // Limpar o formulário após o registro
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
  }

  // Função para editar um cronograma - Preenche o formulário com os dados existentes
  function editTimelines(id: number) {
    const timeline = timelines.find(T =>T.id == id);
    if (timeline) {
      setReq(timeline);
    }
  };
  // Função para deletar um cronograma
  async function delTimelines(id: number) {
    const result = await delTimelinesDoController(id); // Chama o controller para deletar
    if (result) {
      setTimelines(timelines.filter((t) => t.id !== id));
    }
  }

  // Função de busca (ainda não implementada)
  function buscar() {
    console.log("Buscando por:", busca);
  }

  return (
    <MyView router={router}>
      <View style={{ flexDirection: 'row', flex: 1, backgroundColor: '#f0f2f5' }}>
        <View style={{ flex: 1, backgroundColor: '#f0f2f5' }}>
          <View style={{ padding: 20 }}>
             <View style={styles.headerRow}>
              <Text style={styles.title}>Meu Cronograma</Text>
              <Pressable style={styles.buttonNewText} onPress={() => { ; ; setShowForm(true); }}>
                 <Text style={styles.buttonCapsule}>+ Novo Cronograma</Text>
              </Pressable>
             </View>
          </View>
        </View>
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
       {/* Campos de input para o formulário de cronograma */}
       <Text style={styles.formTitle}>Cadastro de Cronogramas</Text>
           {showForm && ( <View style={styles.card}>
         {/* Componente de calendário */}
      <MyCalendar  date={req.date} setDate={(date) => setReq({ ...req, date: date })} icon=""
       />

      {/* Componente Relogio */}
      <MyTimerPicker
        onTimeSelected={(text)  => setReq({ ...req, end_time: text })} 
        initialTime={req.end_time}
      />

      <MyTimerPicker
        onTimeSelected={(text)  => setReq({ ...req, start_time: text })} 
        initialTime={req.start_time}
      />
    <Myinput iconName="" label="Professor" placeholder="Digite o nome do Professor:" value={req.teacher_id} onChangeText={(text) => setReq({ ...req, teacher_id: text })} />
    <Myinput iconName="" label="Disciplina" placeholder="Digite a disciplina:" value={req.discipline_id} onChangeText={(text) => setReq({ ...req, discipline_id: text })} />
    <Myinput iconName="" label="Local" placeholder="Digite o Local" value={req.local_id?.toString()} onChangeText={(text) => setReq({ ...req, local_id:  Number(text) })} />
    <Myinput iconName="" label="Turma" placeholder="Digite o Turma:" value={req.class_id?.toString()} onChangeText={(text) => setReq({ ...req, class_id:  Number(text) })} />
                
    <View style={styles.formButtons}>
      <MyButton title={isEditing ? 'Atualizar' : 'Cadastrar'} button_type="default" onPress={handleRegister} style={{ flex: 1, marginRight: 8 }} />
      <MyButton title="Cancelar" onPress={() => { ; setShowForm(false); }} style={{ flex: 1, marginLeft: 8, backgroundColor: '#EEE' }} />
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
  ?.filter((item) => {
  
    const timeline = timelines.find((t) => t.id === Number(item.discipline_id));
    return timeline?.teacher_id?.toLowerCase().includes(filtro.toLowerCase());
  })
  .map((item) => {
    const timeline = timelines.find((t) => t.id === Number(item.discipline_id));

    return (
      <View style={styles.tableRow} key={item.id}>
        <Text style={styles.td}>{timeline?.discipline_id || '-'}</Text>
        <Text style={styles.td}>{timeline?.teacher_id || '-'}</Text>
        <Text style={styles.td}>{item.local_id}</Text>
        <Text style={styles.td}>{item.class_id}</Text>
        <Text style={styles.td}>{timeline?.start_time? timeline.start_time + 'h' : '-'}</Text>
        <Text style={styles.td}>{timeline?.end_time? timeline.end_time + 'h' : '-'}</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => editTimelines(item.id)}>
            <Text style={styles.edit}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => delTimelines(item.id)}>
            <Text style={styles.del}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  })}



</View>


      <View style={styles.row}>
        <View style={styles.form}>
    
        </View>

        {/* Lista de cronogramas */}
        
        
      </View>
    </MyView>
  );
} 



const styles = StyleSheet.create({
   header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonCapsule: {
    padding: 10,
    borderRadius: 100, // Aumente o valor para arredondar mais
    backgroundColor: 'purple',
    textAlign: 'center',
    color: 'white', // Para o texto do botão ficar legível

    
  },
  buttonCadastrar:{
    alignItems: 'center',
    padding: 15,  // Aumentando o padding para deixar o botão maior
    borderRadius: 10,
    backgroundColor: 'purple',
    textAlign: 'center',
    width: '1100%',  // Faz o botão ocupar toda a largura disponível
    maxWidth: 400,  // Definindo um limite máximo de largura, se necessário

  },
  buttonEdit: {
     alignItems: 'center',
     padding: 10,
     borderRadius: 10,
     backgroundColor: 'purple',
     textAlign: 'center',
  },
  buttonDelete: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'purple',
    textAlign: 'center'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  form: {
    flex: 1,
    marginRight: 10,
    padding: 20,
    backgroundColor: '#F2F2F2',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,

  },
  item: {
    padding: 20,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
  },
    revenueText: {
    fontSize: 17,
    color: '#000000',
    marginBottom: 3,
    
  },
  text:{               
    marginBottom: 8,
    fontSize: 40,
    fontWeight: "bold", 
    textAlign: "center",
    backgroundColor: "#ab66f9",
    borderRadius: 5,
    color:'#ffffff',
    letterSpacing: 1.5,
    textTransform: "uppercase",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    fontStyle: "italic",
 },


 sidebar: {
  width: 220,
  backgroundColor: '#FFF',
  padding: 16,
  borderRightWidth: 1,
  borderRightColor: '#ddd',
},
sidebarTitle: {
  fontSize: 18,
  fontWeight: '700',
  marginBottom: 20,
  color: '#3A3A3A',
},
menuItem: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 10,
  paddingHorizontal: 12,
  borderRadius: 8,
  marginBottom: 6,
},
menuItemActive: {
  backgroundColor: '#E6F8F3',
  borderLeftWidth: 4,
  borderLeftColor: '#3AC7A8',
},
menuLabel: {
  fontSize: 14,
  color: '#444',
},
menuLabelActive: {
  color: '#1EB980',
  fontWeight: '600',
},
headerRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 10,
  alignItems: 'center',
},
title: { fontSize: 22, fontWeight: '700', color: 'purple' },
buttonNew: {
  backgroundColor: 'purple',
  paddingHorizontal: 20,
  paddingVertical: 6,
  borderRadius: 6,
},
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
searchIcon: {
  position: 'absolute',
  right: 16,
  top: '50%',
  transform: [{ translateY: -10 }],
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
tdStatus: { flex: 1 },
statusActive: {
  backgroundColor: '#D8FEEB',
  color: '#1EB980',
  paddingHorizontal: 10,
  paddingVertical: 4,
  fontSize: 12,
  fontWeight: '600',
  borderRadius: 12,
  alignSelf: 'flex-start',
},
actions: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  gap: 12,
  paddingLeft: 8,
},
edit: { color: '#3AC7A8', fontWeight: '600', fontSize: 13 },
del: { color: '#D63031', fontWeight: '600', fontSize: 13 },
avatar: {
  width: 24,
  height: 24,
  borderRadius: 12,
},
});


