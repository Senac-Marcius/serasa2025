import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Mytext from '../../src/components/MyText';
import MyButton from '../../src/components/MyButtons';
import MyView from '../../src/components/MyView';
import { MyItem } from '../../src/components/MyItem';
import { Myinput, MyTextArea } from '../../src/components/MyInputs';
import { useRouter } from 'expo-router';

export default function CoursesScreen() {
  const [req, setReq] = useState({
    description: '',
    Courseplan: '',
    Orientationplan: '',
    Workload: '',
    id: -1,
    userId: 0,
  });

  const [CoursesPosts, setCourses] = useState<typeof req[]>([]);

  function handleRegister() {
    if (req.id === -1) {
      const newId = CoursesPosts.length ? CoursesPosts[CoursesPosts.length - 1].id + 1 : 0;
      const newCourses = { ...req, id: newId };
      setCourses([...CoursesPosts, newCourses]);
    } else {
      setCourses(CoursesPosts.map(c => (c.id === req.id ? req : c)));
    }

    setReq({
      description: '',
      Courseplan: '',
      Orientationplan: '',
      Workload: '',
      id: -1,
      userId: 0,
    });
  }

  function editCourses(id: number) {
    const courseToEdit = CoursesPosts.find(course => course.id === id);
    if (courseToEdit) setReq(courseToEdit);
  }

  function deleteCourses(id: number) {
    setCourses(CoursesPosts.filter(course => course.id !== id));
  }

  const router = useRouter();

  return (
    <MyView style={styles.page}>
      <View style={styles.header}>
        <Mytext style={styles.title}>Cadastro de Cursos</Mytext>
      </View>

      <View style={styles.formContainer}>
        <MyTextArea
          iconName="description"
          label="Descrição"
          value={req.description}
          onChangeText={(text) => setReq({ ...req, description: text })}
          placeholder="Digite a descrição do curso..."
        />
        <Myinput
          iconName="book"
          label="Plano de Curso"
          value={req.Courseplan}
          onChangeText={(text) => setReq({ ...req, Courseplan: text })}
          placeholder="Digite o plano de curso..."
        />
        <Myinput
          iconName="school"
          label="Plano de Orientação"
          value={req.Orientationplan}
          onChangeText={(text) => setReq({ ...req, Orientationplan: text })}
          placeholder="Digite o plano de orientação..."
        />
        <Myinput
          iconName="schedule"
          label="Carga Horária"
          value={req.Workload}
          onChangeText={(text) => setReq({ ...req, Workload: text })}
          placeholder="Digite a carga horária..."
        />
        <MyButton title="CADASTRAR" onPress={handleRegister} button_type="rect" style={styles.button} />
      </View>

      <View style={styles.listWrapper}>
        <Mytext style={styles.subTitle}>Cursos Cadastrados</Mytext>
        <View style={styles.cardGrid}>
          {CoursesPosts.map((item) => (
            <MyItem
              key={item.id}
              style={styles.card}
              onEdit={() => editCourses(item.id)}
              onDel={() => deleteCourses(item.id)}
            >
              <Mytext style={styles.cardTitle}>📚 {item.description}</Mytext>
              <Mytext style={styles.cardInfo}>📘 Plano: {item.Courseplan}</Mytext>
              <Mytext style={styles.cardInfo}>🎓 Orientação: {item.Orientationplan}</Mytext>
              <Mytext style={styles.cardInfo}>⏱️ Carga Horária: {item.Workload}</Mytext>
            </MyItem>
          ))}
        </View>
      </View>
    </MyView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4B0082',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 30,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#6A1B9A',
  },
  listWrapper: {
    flex: 1,
    marginTop: 20,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B0082',
    marginBottom: 10,
    marginLeft: 6,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 12,
    paddingHorizontal: 6,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    width: 280,
    marginBottom: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  cardInfo: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
});
