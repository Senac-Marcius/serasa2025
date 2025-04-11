import React, { useState, useEffect } from 'react';
import { TextInput, FlatList, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createClient } from '@supabase/supabase-js';
import Mytext from '../src/components/MyText';
import  MyView  from '../src/components/MyView';
import MyList from '../src/components/MyList';

// Configuração do Supabase
const supabaseUrl = 'https://fcjbnmhbjolybbkervgg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjamJubWhiam9seWJia2VydmdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MzcyNTQsImV4cCI6MjA1ODUxMzI1NH0.mFa5W8ixlKQtaNm_EdGFg3IuooF95Xcn-ArPx_vX4mI';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type Turma = {
  id: number;
  curso: string;
  codigo: string;
  turno: string;
  modalidade: string;
  horario: string;
  cargaHoraria: string;
  vagas: string;
  inicio: string;
  termino: string;
  valor: string;
  docente: string;
  certificacao: string;
  status: string;
};

export default function TurmasComCadastro() {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [modoCadastro, setModoCadastro] = useState(false);
  const [form, setForm] = useState<Turma>({
    id: 0,
    curso: '',
    codigo: '',
    turno: '',
    modalidade: '',
    horario: '',
    cargaHoraria: '',
    vagas: '',
    inicio: '',
    termino: '',
    valor: '',
    docente: '',
    certificacao: '',
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
    const requiredFields = [
      'codigo', 'curso', 'turno', 'modalidade', 'horario', 
      'cargaHoraria', 'vagas', 'inicio', 'termino', 'valor', 
      'docente', 'certificacao', 'status'
    ];
    for (const field of requiredFields) {
      if (!form[field as keyof Turma]) {
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
      codigo: '',
      turno: '',
      modalidade: '',
      horario: '',
      cargaHoraria: '',
      vagas: '',
      inicio: '',
      termino: '',
      valor: '',
      docente: '',
      certificacao: '',
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
      <MyView contentContainerStyle={styles.formContainer}>
        <Mytext style={styles.header}>Cadastrar Nova Turma</Mytext>
        {[
          'codigo', 'curso', 'turno', 'modalidade', 'horario',
          'cargaHoraria', 'vagas', 'inicio', 'termino', 'valor',
          'docente', 'certificacao', 'status'
        ].map((campo) => (
          <TextInput
            key={campo}
            style={styles.input}
            placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
            value={(form as any)[campo]}
            onChangeText={(text) => setForm({ ...form, [campo]: text })}
          />
        ))}
        {errorMessage && <Mytext style={styles.errorText}>{errorMessage}</Mytext>}
        <TouchableOpacity style={styles.button} onPress={salvar} >
          <Mytext style={styles.buttonText}>Salvar</Mytext>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setModoCadastro(false)}>
          <Mytext style={styles.buttonText}>Cancelar</Mytext>
        </TouchableOpacity>
      </MyView>
    );
  }

  return (
    <MyView style={styles.container}>
      <Mytext style={styles.header}>Turmas Cadastradas</Mytext>
      <MyList
        data={turmas}
        keyItem={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Mytext style={styles.title}>{item.curso}</Mytext>
            <Mytext>Código: {item.codigo}</Mytext>
            <Mytext>Turno: {item.turno}</Mytext>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => editarTurma(item)}>
                <Ionicons name="pencil" size={20} color="purple" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deletarTurma(item.id)}>
                <Ionicons name="trash" size={20} color="purple" />
              </TouchableOpacity>
            </View>
    </MyView>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={() => setModoCadastro(true)}>
        <Mytext style={styles.buttonText}>Cadastrar Nova Turma</Mytext>
      </TouchableOpacity>
    </MyView>
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
  actions: { flexDirection: 'row', gap: 16, marginTop: 8 },
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
});