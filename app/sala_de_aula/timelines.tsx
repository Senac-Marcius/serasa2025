import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import MyView from '../../src/components/MyView';
import { useRouter } from 'expo-router';
import MyCalendar from '../../src/components/MyCalendar'; 
import MySearch from '../../src/components/MySearch';
import { Myinput, MyCheck, MyTextArea } from '../../src/components/MyInputs'; 
import { supabase } from '../../src/utils/supabase';
import { setTimeline, iTimeline, delTimelines as delTimelinesDoController, editTimelines as editTimelinesDoController } from '../../src/controllers/timelines';
import MyButton from '../../src/components/MyButtons';
import MyList from '../../src/components/MyList';
import { MyItem } from '../../src/components/MyItem';
import Mytext from '../../src/components/MyText';
import MyTimerPicker from '../../src/components/MyTimerPiker';

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

  // Buscar os cronogramas ao carregar o componente
  useEffect(() => {
    (async () => {
      const { data: todos, error } = await supabase.from('timelines').select();
      if (todos && todos.length > 0) {
        setTimelines(todos);
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
      setTimelines(timelines.map((item) => (item.id === req.id ? req : item)));
      await editTimelinesDoController(req.id, req);
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
    const timeline = timelines.find((t) => t.id === id);
    if (timeline) {
      setReq(timeline);
    }
  }

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
      <MySearch
        style={{ marginTop: 20 }}
        onChangeText={setBusca}
        onPress={buscar}
        busca={busca}
      />

      {/* Componente de calendário */}
      <MyCalendar date={req.date} setDate={(date) => setReq({ ...req, date: date })} icon=""
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

      <Text style={styles.header}>Meu Cronograma</Text>

      <View style={styles.row}>
        <View style={styles.form}>
          {/* Campos de input para o formulário de cronograma */}
          <Myinput
            value={req.teacher_id}
            onChangeText={(text)  => setReq({ ...req, teacher_id: text })}
            label="Professor"          // Label para o campo de disciplina
            iconName=""             // Nome do ícone para o campo de disciplina
            placeholder="Digite o nome do Professor:"
          />
          <Myinput
            value={req.discipline_id}
            onChangeText={(text)  => setReq({ ...req, discipline_id: text })}
            label="Disciplina"          // Label para o campo de disciplina
            iconName=""             // Nome do ícone para o campo de disciplina
            placeholder="Digite a disciplina:"
          />
          <Myinput
            value={req.local_id?.toString()}
            onChangeText={(text)  => setReq({ ...req, local_id: Number(text) })}
            label="Local"
            iconName=""           // Label para o campo de disciplinalocal
            placeholder="Digite o Local:"
          />
          <Myinput
            value={req.class_id?.toString()}
            onChangeText={(text)  => setReq({ ...req, class_id: Number(text) })}
            label="Turma"          // Label para o campo de disciplina
            iconName=""             // Nome do ícone para o campo de disciplina
            placeholder="Digite o Turma:"
          />
       

          {/* Botão para cadastrar o cronograma */}
          <MyButton style={{justifyContent:'center'}}
            title="CADASTRAR" // Passando a propriedade correta para o título do botão
            onPress={handleRegister} // Passando a função de press
           
            
          />
        </View>

        {/* Lista de cronogramas */}
        <MyList
          data={timelines}
          keyItem={(item) => item.id.toString()}
          renderItem={({ item }) => (

            <MyItem 
                style={styles.item}
                onDel={()=> delTimelines(item.id)}
                onEdit={()=> editTimelines(item.id)}

            >
              <Mytext style={styles.revenueText}>Professor: {item.Professor_id}</Mytext>
              <Mytext style={styles.revenueText}>Disciplina: {item.discipline_id}</Mytext>
              <Mytext style={styles.revenueText}>Local: {item.local_id}</Mytext>
              <Mytext style={styles.revenueText}>Turma: {item.class_id}</Mytext>


            </MyItem>
          )}
        />
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
    gap: 7,
    
    
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
});
