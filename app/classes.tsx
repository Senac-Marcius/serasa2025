import React, { useState, useEffect } from 'react';
import { TextInput, FlatList, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createClient } from '@supabase/supabase-js';
import Mytext from '../src/components/MyText';
import  MyView  from '../src/components/MyView';
import MyList from '../src/components/MyList';
import MyButton from '../src/components/MyButtons';
import {Text,ScrollView,Pressable,} from 'react-native';
import { useRouter } from 'expo-router';
import MySearch from '../src/components/MySearch';
import { Myinput } from '../src/components/MyInputs';
import {setTimeline,iTimeline,delTimelines as delTimelinesDoController,editTimelines as editTimelinesDoController,getTimelines,} from '../src/controllers/timelines';
import MyTimerPicker from '../src/components/MyTimerPiker';
import { TabActions } from '@react-navigation/native';

// Configuração do Supabase
const supabaseUrl = 'https://fcjbnmhbjolybbkervgg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjamJubWhiam9seWJia2VydmdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MzcyNTQsImV4cCI6MjA1ODUxMzI1NH0.mFa5W8ixlKQtaNm_EdGFg3IuooF95Xcn-ArPx_vX4mI';
const supabase = createClient(supabaseUrl, supabaseAnonKey);
 const [filtro, setFiltro] = useState('');

type Turma = {
  id: number;
  curso: string;
  nome_curso: string;
  turno: string;
  modalidade: string;
  horario: string;
  cargaHoraria: string;
  vagas: string;
  inicio: string;
  termino: string;
  valor: string;
  docente: string;
  status: string;
};

export default function TurmasComCadastro() {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [modoCadastro, setModoCadastro] = useState(false);
  const [form, setForm] = useState<Turma>({
    id: 0,
    curso: '',
    nome_curso: '',
    turno: '',
    modalidade: '',
    horario: '',
    cargaHoraria: '',
    vagas: '',
    inicio: '',
    termino: '',
    valor: '',
    docente: '',
    status: '',
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const carregarTurmas = async () => {
    const { data, error } = await supabase.from('class').select('*');
    if (error) {
      console.error('Erro ao buscar turmas:', error.message);
      return;
    }
    setTurmas(data as Turma[]);
  };

  const salvar = async () => {
    console.log("iniciando processo de salvamento")
    const requiredFields = [
      'id', 'curso','nome_curso', 'turno', 'modalidade', 'horario', 
      'cargaHoraria', 'vagas', 'inicio', 'termino', 'valor', 
      'docente', 'status'
    ];
    for (const field of requiredFields) {
      if (!form[field as keyof Turma]) {
        console.log(field)
        setErrorMessage(`O campo "${field}" é obrigatório.`);
        return;
      }
    }

    setErrorMessage(null);  

    const { data, error } = await supabase.from('class').insert([form]);
    if (error) {
      console.error('Erro ao salvar turma:', error.message);
      return;
    }
    carregarTurmas();
    setForm({
      id: 0,
      curso: '',
      nome_curso: '',
      turno: '',
      modalidade: '',
      horario: '',
      cargaHoraria: '',
      vagas: '',
      inicio: '',
      termino: '',
      valor: '',
      docente: '',
      status: '',
    });
    setModoCadastro(false);
  };

  const deletarTurma = async (id: number) => {
    const { error } = await supabase.from('class').delete().eq('id', id);
    if (error) {
      console.error('Erro ao deletar turma:', error.message);
      return;
    }
    carregarTurmas();
  };

  const editarTurma = (turma: Turma) => {
    setForm(turma);
    setModoCadastro(true);
  };

  useEffect(() => {
    carregarTurmas();
  }, []);

  if (modoCadastro) {
    return (
      <MyView >
        <Mytext style={styles.header}>Cadastrar Nova Turma</Mytext>
        {[
          'id', 'curso', 'nome_curso','turno', 'modalidade', 'horario',
          'cargaHoraria', 'vagas', 'inicio', 'termino', 'valor',
          'docente', 'status'
        ].map((campo) => (
          <TextInput
            key={campo}
            style={styles.input}
            placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
            value={(form as any)[campo]}
            onChangeText={(text) => setForm({ ...form, [campo]: text })}
          />
        ))}

       <MyButton 
       title='Salvar'
        onPress={salvar}
       
       />
      </MyView>
    );
  }

  return (
    <View style={styles.container}>
      <Mytext style={styles.header}>Turmas Cadastradas</Mytext>
               
     
     <MyButton
      title='Cadastrar nova turma'
      onPress={() => setModoCadastro(true)}
    />  
        <View style={styles.table}>
               <View style={styles.tableRowHeader}>
                 <Text style={styles.th}>Código da turma</Text>
                 <Text style={styles.th}>Curso</Text>
                 <Text style={styles.th}>Nome da turma</Text>
                 <Text style={styles.th}>Turno</Text>
                 <Text style={styles.th}>Modalidade</Text>
                 <Text style={styles.th}>Horário</Text>
                 <Text style={styles.th}>Carga Horária</Text>
                 <Text style={styles.th}>Vagas</Text>
                 <Text style={styles.th}>Início</Text>
                 <Text style={styles.th}>Término</Text>
                 <Text style={styles.th}>Valor do curso</Text>
                 <Text style={styles.th}>Docentes</Text>
                 <Text style={styles.th}>Status</Text>
               </View>
    </View>
    </View>

  {turmas
                .filter((item) => item.nome_curso?.toLowerCase().includes(filtro.toLowerCase()))
                .map((item) => (
                  <View style={styles.tableRow} key={item.id}>
                    <Text style={styles.td}>{item.nome_curso }</Text>
                    <Text style={styles.td}>{item.id }</Text>
                    <Text style={styles.td}>{item.curso}</Text>
                    <Text style={styles.td}>{item.turno}</Text>
                    <Text style={styles.td}>{item.modalidade}</Text>
                    <Text style={styles.td}>{item.horario}</Text>
                    <Text style={styles.td}>{item.cargaHoraria}</Text>
                    <Text style={[styles.td, styles.TabActions]}>
                      <Text style={styles.edit} onPress={() => editarTurma(item.)}>Editar</Text>
                      <Text style={styles.del} onPress={() => deletarTurma(item.id)}>Excluir</Text>
                    </Text>
                  </View>
                ))}
                
  );
}


  const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    header: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
    },
    card: {
      backgroundColor: '#f0f0f0',
      padding: 16,
      marginVertical: 8,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    title: { fontWeight: 'bold', fontSize: 16 },
    formActions: { flexDirection: 'row', gap: 16, marginTop: 8 },
    formContainer: {
      padding: 16,
      gap: 12,
    },
    input: {
      padding: 12,
      borderWidth: 1,
      borderColor: '#993399',
      borderRadius: 10,
      backgroundColor: '#fff',
      marginBottom: 8,
    },
    button: {
      backgroundColor: '#4CAF50',
      padding: 12,
      borderRadius: 8,
      marginVertical: 10,
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    errorText: {
      color: 'red',
      marginVertical: 8,
      fontWeight: 'bold',
      textAlign: 'center',
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
    TabActions: {
      flexDirection: 'row',
      gap: 12,
    },
    edit: { color: '#3AC7A8', fontWeight: '600', fontSize: 13 },
    del: { color: '#D63031', fontWeight: '600', fontSize: 13 },
  });
  
