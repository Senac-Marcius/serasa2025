import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MyView from '../src/components/MyView';
import { useRouter } from 'expo-router';
import { supabase } from '../src/utils/supabase';  // Certifique-se de importar o supabase corretamente
import { setCalendarsData, iCalendar, getCalendars } from '../src/controllers/calendars';  // Assumindo que iCalendar está corretamente tipado
import { Myinput } from '../src/components/MyInputs';
import Mytext from '../src/components/MyText';
import MyButton from '../src/components/MyButtons';
import { MyItem } from '../src/components/MyItem';
import MyList from '../src/components/MyList';

export default function CalendarsScreen() {
  const [calendars, setCalendars] = useState<iCalendar[]>([]);  // Aqui é um array de iCalendar
  const [req, setReq] = useState<iCalendar>({
    studentname: '',
    course: '',
    registrationdate: '',
    period: '',
    id: -1,
    created_at: new Date().toISOString(),
  });

  // Hook para buscar calendários ao carregar a tela
  useEffect (() => {
    async function getTodos() {
      const retorno = await getCalendars({})
      if (retorno.status && retorno.data && retorno.data.length > 0) {
        setCalendars(retorno.data);

      }

    }

    getTodos();

    


    
  }, []);

  // Função para registrar o calendário
  async function handleRegister() {
    // Se o id for -1, significa que é um novo calendário
    if (req.id === -1) {
      // Gera um novo ID baseado no último item ou 0 se não houver calendários
      const newId = calendars.length ? calendars[calendars.length - 1].id + 1 : 0;
      const newcalendar: iCalendar = { ...req, id: newId };

      // Atualiza o estado local com o novo calendário
      setCalendars([...calendars, newcalendar]);

      // Envia os dados para o Supabase
      const { data, error } = await supabase.from('calendar').insert([newcalendar]);

      if (error) {
        console.error('Erro ao inserir calendário no Supabase:', error);
      } else {
        console.log('Calendário inserido com sucesso no Supabase:', data);
      }
    } else {
      // Atualiza o calendário existente no estado
      setCalendars(calendars.map((c) => (c.id === req.id ? req : c)));

      // Envia os dados para o Supabase para atualizar
      const { data, error } = await supabase.from('calendar').upsert([req]);

      if (error) {
        console.error('Erro ao atualizar calendário no Supabase:', error);
      } else {
        console.log('Calendário atualizado com sucesso no Supabase:', data);
      }
    }

    // Limpa os campos após o registro
    setReq({
      studentname: '',
      course: '',
      registrationdate: '',
      period: '',
      id: -1,
      created_at: new Date().toISOString(),
    });
  }

  // Função para editar um calendário
  function editCalendar(id: number) {
    const edit = calendars.find((c) => c.id === id);
    if (edit) {
      setReq(edit);
    }
  }

  // Função para deletar um calendário
  async function delCalendar(id: number) {
    // Deleta o item localmente
    setCalendars(calendars.filter((c) => c.id !== id));

    try {
      // Deleta o calendário no Supabase
      const { data, error } = await supabase.from('calendar').delete().eq('id', id);
      if (error) {
        console.error('Erro ao deletar calendário no Supabase:', error);
      } else {
        console.log('Calendário deletado com sucesso no Supabase:', data);
      }
    } catch (err) {
      console.error('Erro inesperado ao deletar no Supabase:', err);
    }
  }

  const router = useRouter();

  return (
    <MyView router={router}>
      <Mytext>Tela de Cronograma</Mytext>
      <View style={styles.row}>
        <View style={styles.form}>
          <Myinput
            label="Nome do aluno:"
            placeholder="Nome do aluno:"
            value={req.studentname}
            onChangeText={(text) => setReq({ ...req, studentname: text })}
            iconName="user"
          />
          <Myinput
            label="Curso:"
            placeholder="Curso:"
            value={req.course}
            onChangeText={(text) => setReq({ ...req, course: text })}
            iconName="book"
          />
          <Myinput
            label="Data da Matrícula:"
            placeholder="Data da Matrícula:"
            value={req.registrationdate}
            onChangeText={(text) => setReq({ ...req, registrationdate: text })}
            iconName="calendar"
          />
          <Myinput
            label="Período:"
            placeholder="Período:"
            value={req.period}
            onChangeText={(text) => setReq({ ...req, period: text })}
            iconName="clock"
          />

          <MyButton title="Acessar" onPress={handleRegister} />
        </View>

        <View style={styles.listContainer}>
          <MyList
            data={calendars}
            keyItem={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MyItem style={styles.list} onEdit={() => editCalendar(item.id)} onDel={() => delCalendar(item.id)}>
                <Mytext style={styles.item}>Nome do aluno: {item.studentname}</Mytext>
                <Mytext style={styles.item}>Curso: {item.course}</Mytext>
                <Mytext style={styles.item}>Data da matrícula: {item.registrationdate}</Mytext>
                <Mytext style={styles.item}>Período: {item.period}</Mytext>
              </MyItem>
            )}
          />
        </View>
      </View>
    </MyView>
  );
}

const styles = StyleSheet.create({
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
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
  },
  listContainer: {
    flex: 1,
  },
  list: {
    flex: 1,
    marginRight: 10,
    padding: 20,
    marginBottom: 10,
    borderWidth: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
  },
  item: {
    fontSize: 14,
    color: '#007BFF',
    marginBottom: 5,
  },
});
