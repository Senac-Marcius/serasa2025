import React, { useState } from 'react'; 
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';



export default function DisciplineScreen() {
       // caixa // braço mecanico   só entra na caixa se passar pelo braço mecanico
  const [req, setReq] = useState ({

            id: 0 ,
            name: '' ,
            url: '' ,
            workload: '',
            createdAt: new Date().toISOString(),
            teacher: '',
  });

    function handRegister(){
      setDisciplines([...disciplines, req])
    }
  


    const [disciplines , setDisciplines] = useState<{

      id: number,
      name: string,
      url:string,
      workload: string,
      createdAt: string,
      teacher: string ,
    }[]>([]);




  return (   
    <View>
      <Text>Disciplinas</Text>
      <View style={styles.row}>
        <View style={styles.form}>

          <TextInput placeholder='Nome' value= {req.name} onChangeText={(text) => setReq({...req, name: text })} />
    
          <TextInput placeholder='url' value= {req.url} onChangeText={(text) => setReq({...req, url: text })}/>

          <TextInput placeholder='Carga Horaria'/>

          <TextInput placeholder='Professor' value= {req.teacher} onChangeText={(text) => setReq({...req, teacher: text })}/>

          
          {/* alterando a cor, color dentro do button*/}
          <Button title='Cadastrar' color='#4CAF50' onPress={() => handRegister }/> 

          </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
    shadowRadius: 5,
  },

  button: {
    marginTop: 10,
  }
});
