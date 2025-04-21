import React, { useEffect, useState } from 'react';
import { TextInput, FlatList, TouchableOpacity, StyleSheet, View } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyText from '../src/components/MyText';
import MyView from '../src/components/MyView';
import MyList from '../src/components/MyList';
import MyButton from '../src/components/MyButtons';

const supabaseUrl = 'https://fcjbnmhbjolybbkervgg.supabase.co';
const supabaseAnonKey = 'ey...'; // sua chave aqui
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Stack = createNativeStackNavigator();

type Turma = {
  id: number;
  curso: string;
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

export default function TurmasScreenWrapper() {
  return (
    <Stack.Navigator initialRouteName="TurmasScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TurmasScreen" component={TurmasScreen} />
      <Stack.Screen name="TabelaCompleta" component={TabelaCompletaScreen} />
    </Stack.Navigator>
  );
}


function TurmasScreen({ navigation }: any) {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [pesquisa, setPesquisa] = useState('');
  const [modoCadastro, setModoCadastro] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const [form, setForm] = useState<Omit<Turma, 'id'>>({
    curso: '',
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
    const { data } = await supabase.from('class').select('*').order('id', { ascending: false });
    setTurmas(data || []);
  };

  const salvar = async () => {
    console.log("iniciando processo de salvamento")
    const requiredFields = [
     'curso', 'turno', 'modalidade', 'horario', 
      'cargaHoraria', 'vagas', 'inicio', 'termino', 'valor', 
      'docente', 'certificacao', 'status'
    ];
    for (const field of requiredFields) {
      if (!form[field as keyof Turma]) {
        console.log(field)
        setErrorMessage(`O campo "${field}" é obrigatório.`);
        return;
      }
    }
    setErrorMessage(null);

    if (editandoId) {
      await supabase.from('class').update(form).eq('id', editandoId);
    } else {
      await supabase.from('class').insert([form]);
    }

    carregarTurmas();
    resetarForm();
    setModoCadastro(false);
  };

  const deletarTurma = async (id: number) => {
    await supabase.from('class').delete().eq('id', id);
    carregarTurmas();
  };

  const editarTurma = (turma: Turma) => {
    const { id, ...rest } = turma;
    setForm(rest);
    setEditandoId(id);
    setModoCadastro(true);
  };

  const resetarForm = () => {
    setForm({
      curso: '',
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
    setEditandoId(null);
  };

  useEffect(() => {
    carregarTurmas();
  }, []);

  const turmasFiltradas = turmas.filter((turma) =>
    turma.curso.toLowerCase().includes(pesquisa.toLowerCase())
  );

  if (modoCadastro) {
    return (
      <MyView>
        <MyText style={styles.header}>{editandoId ? 'Editar Turma' : 'Cadastrar Nova Turma'}</MyText>

        {/* Exibindo o ID, mas o campo é somente leitura */}
        {editandoId && (
          <TextInput
            style={styles.input}
            placeholder="ID (somente leitura)"
            value={editandoId.toString()}
            editable={false}
          />
        )}

        {Object.keys(form).map((campo) => (
          <TextInput
            key={campo}
            style={styles.input}
            placeholder={campo}
            value={(form as any)[campo]}
            onChangeText={(text) => setForm({ ...form, [campo]: text })}
          />
        ))}

        <MyButton title="Salvar" onPress={salvar} />
        <MyButton title="Cancelar" onPress={() => { resetarForm(); setModoCadastro(false); }} />
      </MyView>
    );
  }

  return (
    <View style={styles.container}>
      <MyText style={styles.header}>Turmas</MyText>
      <TextInput
        placeholder="Pesquisar por turma..."
        value={pesquisa}
        onChangeText={setPesquisa}
        style={styles.input}
      />
      <MyButton title="Cadastrar nova turma" onPress={() => setModoCadastro(true)} />
      <MyText style={styles.subHeader}>Últimas Turmas</MyText>
      <FlatList
        data={turmasFiltradas.slice(0, 5)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <MyText style={styles.title}>{item.curso}</MyText>
            <MyText>Código: {item.id}</MyText>
            <MyText>Turno: {item.turno}</MyText>
            <MyText>Modalidade: {item.modalidade}</MyText>
            <MyText>Carga Horária: {item.cargaHoraria}</MyText>
            <MyText>Dias de Aula: {item.horario}</MyText>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => editarTurma(item)}>
                <Ionicons name="pencil" size={20} color="purple" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deletarTurma(item.id)}>
                <Ionicons name="trash" size={20} color="purple" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <MyButton title="Ver todas as turmas" onPress={() => navigation.navigate('TabelaCompleta')} />
    </View>
  );
}

function TabelaCompletaScreen({ navigation }: any) {
  const [turmas, setTurmas] = useState<Turma[]>([]);

  const carregarTurmas = async () => {
    const { data } = await supabase.from('class').select('*').order('id', { ascending: false });
    setTurmas(data || []);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarTurmas);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <MyText style={styles.header}>Tabela Completa de Turmas</MyText>
      <FlatList
        data={turmas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {Object.entries(item).map(([key, value]) => (
              <MyText key={key}>
                <MyText style={{ fontWeight: 'bold' }}>{key}:</MyText> {value}
              </MyText>
            ))}
          </View>
        )}
      />
      <MyButton title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#993399',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
});
