
import React,{ useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import  Mytext  from '../src/components/Mytext';
import MyButton from '../src/components/Mybuttons';
import MyList from '../src/components/mylist';
import MyView from '../src/components/MyView';
import Myiten from '../src/components/myItenlist';
import { Myinput, MyTextArea } from '../src/components/Myinputs';
//fuction
export default function CoursesScreen(){
    const [req, setReq] = useState({
        description: '',
        Courseplan: '',
        Orientationplan: '',
        Workload: '',
        id: -1,
        userId: 0,

    });

    const [CoursesPosts, setCourses] = useState<{description: string,
         Courseplan: string,
          Orientationplan: string,
           Workload: string,
           id: number,
           userId: number,
         }[]> ([]);

    function handleRegister(){
      if(req.id == -1){
        const newId = CoursesPosts.length ? CoursesPosts[CoursesPosts.length -1].id +1 : 0;
        const newCourses = {...req, id: newId};

        setCourses([...CoursesPosts, newCourses]);
      }else{
        setCourses(CoursesPosts.map(c => (c.id == req.id ? req:c)));
      }

        
        setReq({
        description: '',
        Courseplan: '',
        Orientationplan: '',
        Workload: '',
        id: -1,
        userId: 0,
        })
    }

    function editCourses(id: number) {
      const courseToEdit = CoursesPosts.find(course => course.id === id);
      if (courseToEdit) {
        setReq(courseToEdit); 
      }
    }

    function deleteCourses(id:number){
     setCourses(CoursesPosts.filter(course => course.id !==id));
    }

    return (
      <ScrollView style={styles.container}>
      <MyView>
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
                    value={req.Courseplan}
                    onChangeText={(text) => setReq({...req, Courseplan: text})}
                    placeholder="Digite o plano de curso..."
                     />
                
                <Myinput
                   iconName='school'
                   label="Plano de Orientação"
                   value={req.Orientationplan}
                   onChangeText={(text) => setReq({...req,Orientationplan: text})}
                   placeholder="Digite o plano de orientação..."
                />
                
                <Myinput
                    iconName='schedule'
                    label='Carga horaria:' 
                    value={req.Workload}
                   onChangeText={(text) => setReq({...req,Workload: text})}
                   placeholder="Digite a carga horária..."
                />
                <MyButton title="CADASTRAR" onPress={handleRegister} button_type="rect" />
        </View> 
            <MyList
          data={CoursesPosts}
          keyItem={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Myiten  style={styles.listItem}

              onEdit={()=> editCourses(item.id)}
              onDel={()=> deleteCourses(item.id)}
            >
              <Mytext style={styles.listText}>Descrição: {item.description}</Mytext>
              <Mytext style={styles.listText}>Plano: {item.Courseplan}</Mytext>
              <Mytext style={styles.listText}>Orientação: {item.Orientationplan}</Mytext>
              <Mytext style={styles.listText}>Carga: {item.Workload}</Mytext>

              

            </Myiten>
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