import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MyButton from '../src/components/MyButtons';
import MyText from '../src/components/MyText';
import { Myinput, MyTextArea } from '../src/components/MyInputs';




type Turma = {
  id: string;
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
    id: '',
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

  const handleChange = (field: keyof Turma, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const salvar = () => {
    const novaTurma = { ...form, id: Date.now().toString() };
    setTurmas((prev) => [...prev, novaTurma]);
    setForm({
      id: '',
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

  const deletarTurma = (id: string) => {
    setTurmas(turmas.filter((t) => t.id !== id));
  };

  if (modoCadastro) {
    return (
      <ScrollView contentContainerStyle={styles.formContainer}>
        <MyText style={styles.header}>Cadastrar Nova Turma</MyText>
        {[
          'codigo',
          'curso',
          'turno',
          'modalidade',
          'horario',
          'cargaHoraria',
          'vagas',
          'inicio',
          'termino',
          'valor',
          'docente',
          'certificacao',
          'status',
        ].map((campo) => (
          <TextInput
            key={campo}
            style={styles.input}
            placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
            value={(form as any)[campo]}
            onChangeText={(text) => handleChange(campo as keyof Turma, text)}
          />
        ))}
        <MyButton title="Salvar" onPress={salvar} />
        <MyButton title="Cancelar" onPress={() => setModoCadastro(false)} color="gray" />
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <MyText style={styles.header}>Turmas Cadastradas</MyText>
      <FlatList
        data={turmas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <MyText style={styles.title}>{item.curso}</MyText>
            <MyText>Código: {item.codigo}</MyText>
            <MyText>Turno: {item.turno}</MyText>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => {}}>
                <Ionicons name="pencil" size={20} color="purple" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deletarTurma(item.id)}>
                <Ionicons name="trash" size={20} color="purple" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <MyButton title="Cadastrar Nova Turma" onPress={() => setModoCadastro(true)} />
    </View>
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
    backgroundColor: '#fff',
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
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
});
