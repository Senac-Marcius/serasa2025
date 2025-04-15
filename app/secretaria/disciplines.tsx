import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import MyView from '../../src/components/MyView';
import { useRouter } from 'expo-router';
import { iDisciplines, SetDisciplinebd, UpdateDisciplinebd, DeleteDisciplinebd } from '../../src/controllers/disciplines';
import { supabase } from '../../src/utils/supabase';
//111
export default function DisciplineScreen() {
  const [req, setReq] = useState<iDisciplines>({
    id: -1,
    name: '',
    url: '',
    workload: 0,
    created_at: new Date().toISOString(),
    teacher: '',
  });

  const [disciplines, setDisciplines] = useState<iDisciplines[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('disciplines').select();
      if (error) console.log('Erro ao carregar disciplinas:', error);
      if (data) setDisciplines(data);
    })();
  }, []);

  function handleRegister() {
    if (!req.name.trim() || !req.url.trim() || !req.teacher.trim()) {
      console.log('Preencha todos os campos!');
      return;
    }

    if (isEditing) {
      handleUpdate();
      return;
    }

    const newDiscipline = { ...req };

    (async () => {
      const result = await SetDisciplinebd(newDiscipline);
      if (result && result[0]) {
        setDisciplines([...disciplines, result[0]]);
        console.log('Disciplina cadastrada com sucesso!');
      } else {
        console.log('Erro ao cadastrar disciplina.');
      }
    })();

    resetForm();
  }

  function handleUpdate() {
    setDisciplines(disciplines.map((d) => (d.id === req.id ? req : d)));

    (async () => {
      await UpdateDisciplinebd(req);
      console.log('Disciplina atualizada.');
    })();

    resetForm();
  }

  function handleDelete(id: number) {
    (async () => {
      setDisciplines(disciplines.filter((d) => d.id !== id));
      await DeleteDisciplinebd(id);
      console.log(`Disciplina ${id} excluída.`);
    })();
  }

  function handleEdit(id: number) {
    const discipline = disciplines.find((d) => d.id === id);
    if (discipline) {
      setReq(discipline);
      setIsEditing(true);
    }
  }

  function resetForm() {
    setReq({
      id: -1,
      name: '',
      url: '',
      workload: 0,
      created_at: new Date().toISOString(),
      teacher: '',
    });
    setIsEditing(false);
  }

  return (
    <MyView style={styles.container}>
      <Text style={styles.title}>Disciplinas</Text>
      <View style={styles.row}>
        <View style={styles.form}>
          <Text style={styles.formTitle}>{isEditing ? 'Editar Disciplina' : 'Nova Disciplina'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome da disciplina"
            value={req.name}
            onChangeText={(text) => setReq({ ...req, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="URL"
            value={req.url}
            onChangeText={(text) => setReq({ ...req, url: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Professor"
            value={req.teacher}
            onChangeText={(text) => setReq({ ...req, teacher: text })}
          />

          <Button title={isEditing ? 'Atualizar' : 'Cadastrar'} color="#4CAF50" onPress={handleRegister} />
        </View>

        <View style={styles.listContainer}>
          <FlatList
            data={disciplines}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardText}>URL: {item.url}</Text>
                <Text style={styles.cardText}>Carga Horária: {item.workload}</Text>
                <Text style={styles.cardText}>Professor: {item.teacher}</Text>

                <View style={styles.actions}>
                  <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item.id)}>
                    <Text style={styles.buttonText}>EDIT</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                    <Text style={styles.buttonText}>DELETE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </MyView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  form: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    marginRight: 10,
    minWidth: '45%',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#FFF',
  },
  listContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    minWidth: '45%',
  },
  card: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 20,
  },
  editButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
