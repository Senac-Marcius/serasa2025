
import React,{ useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import  Mytext  from '../src/components/MyText';
import MyButton from '../src/components/MyButtons';
import MyList from '../src/components/MyList';
import MyView from '../src/components/MyView';
import {MyItem} from '../src/components/MyItem';
import { Myinput, MyTextArea } from '../src/components/MyInputs';
import { useRouter } from 'expo-router';
import {getCourses,iCourses, upadateCourse, deleteCourse, setCoursebd} from '../src/controllers/courses'



//fuction
export default function CoursesScreen(){
    const [req, setReq] = useState({
        id: -1,
        created_at: new Date().toISOString(),
        description: '',
        courseplan: '',
        orientationplan: '',
        workload: 0,
        userId: 1
    });

    const [courses, setCourses] = useState<iCourses[]> ([]);

    useEffect(() =>{
      async function getTodos(){
        const retorno = await getCourses({})
        if (retorno.status && retorno.data && retorno.data.length > 0 ){
          setCourses(retorno.data)
        }
      }
      getTodos()

      


    }, [])

    async function handleRegister(){
      if(req.id == -1){
        const newId = courses.length ? courses[courses.length -1].id +1 : 0;
        const newCourses = {...req, id: newId};
        const resp = await setCoursebd(newCourses);
        console.log("Criando",resp)
        setCourses([...courses, newCourses]);
      }else{
        const resp = await upadateCourse(req);	
        setCourses(courses.map(c => (c.id == req.id ? req:c)));
        console.log("Atualizar:", resp);
      }
        setReq({
        id: -1,
        created_at: new Date().toISOString(),
        description: '',
        courseplan: '',
        orientationplan: '',
        workload: 0,
        userId: 1,
        })
    }

    function editCourses(id: number) {
      const courseToEdit = courses.find(course => course.id === id);
      if (courseToEdit) {
        setReq(courseToEdit); 
      }
    }

    async function deleteCourses(id:number){
      const resp = await deleteCourse(id);
      console.log("Deletado:", resp);
     setCourses(courses.filter(course => course.id !==id));
    }

    const router = useRouter();


    return (
      <ScrollView style={styles.container}>
      <MyView router={router} >
        <Mytext>Cursos</Mytext>
        <View style={styles.row}>
            <View style={styles.form}>
                <MyTextArea
                    iconName='description'
                    label="Descrição"
                    value={req.description}
                    onChangeText={(text) => setReq({...req, description: text})}    
                    placeholder="Digite a descrição..."       
                    />

                
                
                <Myinput
                    iconName='book'
                    label="Plano de Curso"
                    value={req.courseplan}
                    onChangeText={(text) => setReq({...req, courseplan: text})}
                    placeholder="Digite o plano de curso..."
                     />
                
                <Myinput
                   iconName='school'
                   label="Plano de Orientação"
                   value={req.orientationplan}
                   onChangeText={(text) => setReq({...req,orientationplan: text})}
                   placeholder="Digite o plano de orientação..."
                />
                
                <Myinput
                    iconName='schedule'
                    label='Carga horaria:' 
                    value={req.workload.toString()}
                   onChangeText={(text) => setReq({...req,workload: Number (text)})}
                   placeholder="Digite a carga horária..."
                />
                <MyButton title="CADASTRAR" onPress={handleRegister} button_type="rect" />
        </View> 
            <MyList
          data={courses}
          keyItem={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MyItem  style={styles.listItem}

              onEdit={()=> editCourses(item.id)}
              onDel={()=> deleteCourses(item.id)}
            >
              <Mytext style={styles.listText}>Descrição: {item.description}</Mytext>
              <Mytext style={styles.listText}>Plano: {item.courseplan}</Mytext>
              <Mytext style={styles.listText}>Orientação: {item.orientationplan}</Mytext>
              <Mytext style={styles.listText}>Carga: {item.workload}</Mytext>

              

            </MyItem>
          )}
        />
      </View>
    </MyView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flex: 1,
  },
  form: {
    flex: 1,
    marginRight: 10,
    padding: 20,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingVertical: 4,
  },
  listContainer: {
    flex: 1,
  },
  listItem: {
    padding: 15,
    backgroundColor: '#e8e8e8',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  listText: {
    fontSize: 14,
    marginBottom: 4,
  },
  buttonsContanier:{
    backgroundColor: '#F2F2F2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flex: 1,
  },
});