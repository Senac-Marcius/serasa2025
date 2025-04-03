import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import MyView from '../src/components/MyView';
import { useRouter } from 'expo-router';


//esse é o certo

export default function DisciplineScreen() {
  const [req, setReq] = useState({
    id: 0,
    name: '',
    url: '',
    workload: '',
    createdAt: new Date().toISOString(),
    teacher: '',
  });

  const [disciplines, setDisciplines] = useState<{ 
    id: number; 
    name: string; 
    url: string; 
    workload: string; 
    createdAt: string; 
    teacher: string 
  }[]>([]);

  const [isEditing, setIsEditing] = useState(false);

  function handleRegister() {
    if (!req.name?.trim() || !req.url?.trim() || !req.workload?.trim() || !req.teacher?.trim()) {
      alert('Preencha todos os campos!');
      return;
    }

    if (isEditing) {
      handleUpdate()
      return;
    }

    const newDiscipline = {
      ...req,
      id: new Date().getTime(), 
    };

    setDisciplines([...disciplines, newDiscipline])
    resetForm()
  }

  function handleUpdate() {
    setDisciplines(disciplines.map((d) => (d.id === req.id ? req : d)))
    resetForm()
  }

  function handleDelete(id: number) {
    setDisciplines(disciplines.filter((d) => d.id !== id))
  }

  function handleEdit(id: number) {
    const discipline = disciplines.find((d) => d.id === id)
    if (discipline) {
      setReq(discipline)
      setIsEditing(true) 
    }
  }

  function resetForm() {
    setReq({
      id: 0,
      name: '',
      url: '',
      workload: '',
      createdAt: new Date().toISOString(),
      teacher: '',
    });
    setIsEditing(false)
  }

  const router = useRouter();


  return (
    <MyView router={router} style={styles.container}>
      <Text style={styles.title}>Disciplinas</Text>
      <View style={styles.row}>
        {/* Formulário */}
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
            placeholder="Carga Horária"
            value={req.workload}
            onChangeText={(text) => setReq({ ...req, workload: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Professor"
            value={req.teacher}
            onChangeText={(text) => setReq({ ...req, teacher: text })}
          />

          <Button title={isEditing ? 'Atualizar' : 'Cadastrar'} color="#4CAF50" onPress={handleRegister} />
        </View>

        {/* Lista de Disciplinas */}
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    minWidth: '45%',
  },
  card: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
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
