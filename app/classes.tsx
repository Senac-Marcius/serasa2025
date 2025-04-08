import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
module.exports = {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'], // isso precisa ser o último plugin!
  };
  

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

const Stack = createNativeStackNavigator();

export default function App() {
  const [turmas, setTurmas] = useState<Turma[]>([]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Turmas">
        <Stack.Screen name="Turmas">
          {(props) => (
            <TurmasScreen {...props} turmas={turmas} setTurmas={setTurmas} />
          )}
        </Stack.Screen>
        <Stack.Screen name="CadastroTurma">
          {(props) => (
            <CadastroTurmaScreen {...props} setTurmas={setTurmas} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function TurmasScreen({ navigation, turmas, setTurmas }: any) {
  const deletarTurma = (id: string) => {
    setTurmas(turmas.filter((t: Turma) => t.id !== id));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={turmas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.curso}</Text>
            <Text>Código: {item.codigo}</Text>
            <Text>Turno: {item.turno}</Text>
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
      <Button
        title="Cadastrar Turma"
        onPress={() => navigation.navigate('CadastroTurma')}
      />
    </View>
  );
}

function CadastroTurmaScreen({ navigation, setTurmas }: any) {
  const [form, setForm] = useState<Turma>({
    id: Date.now().toString(),
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
    setTurmas((prev: Turma[]) => [...prev, form]);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.formContainer}>
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
      <Button title="Salvar Turma" onPress={salvar} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
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
  },
});
