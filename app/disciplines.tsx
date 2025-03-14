import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList } from 'react-native';

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
    teacher: string;
  }[]>([]);

  function handRegister() {
    setDisciplines([...disciplines, req]);
    setReq({
      id: 0,
      name: '',
      url: '',
      workload: '',
      createdAt: new Date().toISOString(),
      teacher: '',
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Disciplinas</Text>
      <View style={styles.row}>
        
        {/* Formulário do lado esquerdo nao vai esquecer mula */}
        <View style={styles.form}>
          <Text style={styles.formTitle}>Nova Disciplina</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome"
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

          <Button title="Cadastrar" color="#4CAF50" onPress={() => handRegister()} />
        </View>

        {/* Lista de disciplinas do lado direito ou é pra ir */}
        
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
              </View>
            )}
          />
        </View>
      </View>
    </View>
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
});
