import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Mytext from '../../src/components/MyText';
import MyButton from '../../src/components/MyButtons';
import MyView from '../../src/components/MyView';
import { MyItem } from '../../src/components/MyItem';
import { Myinput, MyTextArea } from '../../src/components/MyInputs';
import { useRouter } from 'expo-router';
import {
  getCourses,
  setCoursebd,
  upadateCourse,
  deleteCourse as deleteCourseDb,
  iCourses
} from '../../src/controllers/courses';

export default function CoursesScreen() {
  const initialReq = {
    name: '',
    description: '',
    courseplan: '',
    orientationplan: '',
    workload: '',
    id: undefined,
    userId: 0,
  };

  const [req, setReq] = useState(initialReq);
  const [showForm, setShowForm] = useState(false);
  const [CoursesPosts, setCourses] = useState<typeof req[]>([]);
  const router = useRouter();

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    const result = await getCourses({});
    if (result.status && result.data) {
      setCourses(result.data);
    } else {
      console.error("Erro ao buscar cursos:", result.error);
    }
  }

  async function handleRegister() {
    const courseToSave = {
      ...req,
      workload: parseInt(req.workload as string) || 0,
      courseplan: req.courseplan,
      orientationplan: req.orientationplan,
    };

    if (!req.id) {
      const inserted = await setCoursebd(courseToSave);
      if (inserted.length) {
        await loadCourses();
        setReq(initialReq);
        setShowForm(false);
      }
    } else {
      const updated = await upadateCourse(courseToSave);
      if (updated.length) {
        await loadCourses();
        setReq(initialReq);
        setShowForm(false);
      }
    }
  }

  async function deleteCourses(id: number) {
    const deleted = await deleteCourseDb(id);
    if (deleted.length) {
      await loadCourses();
    }
  }

  return (
    <MyView style={{ flex: 1, backgroundColor: '#f0f2f5' }}>
      <View style={{ flex: 1, backgroundColor: '#f0f2f5', padding: 20 }}>
        <View style={styles.headerRow}>
          <Mytext style={styles.title}>Cursos</Mytext>
          <Pressable style={styles.buttonNew} onPress={() =>{setReq({...initialReq}); setShowForm(true);}}>
            <Mytext style={styles.buttonNewText}>+ Novo Curso</Mytext>
          </Pressable>
        </View>

        {showForm && (
          <View style={styles.formContainer}>
            <Myinput
              iconName="book"
              label="Nome do Curso"
              value={req.name}
              onChangeText={(text) => setReq({ ...req, name: text })}
            />
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
              value={req.courseplan}
              onChangeText={(text) => setReq({ ...req, courseplan: text })}
            />
            <Myinput
              iconName="school"
              label="Plano de Orientação"
              value={req.orientationplan}
              onChangeText={(text) => setReq({ ...req, orientationplan: text })}
            />
            <Myinput
              iconName="schedule"
              label="Carga Horária"
              value={req.workload}
              onChangeText={(text) => setReq({ ...req, workload: text })}
            />

            <MyButton title="Salvar" onPress={handleRegister} button_type="rect" style={styles.button} />
          </View>
        )}

        <View style={styles.listWrapper}>
          <Mytext style={styles.subTitle}>Cursos Cadastrados</Mytext>
          <View style={styles.cardGrid}>
            {CoursesPosts.map((item) => (
              <MyItem
                key={item.id}
                style={styles.card}
                onEdit={() => { setReq(item); setShowForm(true); }}
                onDel={() => deleteCourses(item.id!)}
              >
                <Mytext style={styles.cardTitle}>📚 {item.name}</Mytext>
                <Mytext style={styles.cardInfo}>📝 {item.description}</Mytext>
                <Mytext style={styles.cardInfo}>📘 Plano: {item.courseplan}</Mytext>
                <Mytext style={styles.cardInfo}>🎓 Orientação: {item.orientationplan}</Mytext>
                <Mytext style={styles.cardInfo}>⏱️ Carga Horária: {item.workload}</Mytext>
              </MyItem>
            ))}
          </View>
        </View>
      </View>
    </MyView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4B0082',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#6A1B9A',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonNew: {
    backgroundColor: '#6A1B9A',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonNewText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 30,
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
    color: '#333',
    marginBottom: 6,
  },
  cardInfo: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
});
