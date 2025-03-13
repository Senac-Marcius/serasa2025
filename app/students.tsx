import React, { useState, useReducer, useEffect } from "react";
import { Text,View, StyleSheet,ScrollView, TextInput,Button } from "react-native";

export default function StudentsScreen() {
  const [req, setRec] = useState({
    id:0,
    name:"",
    password:"",
    email:"",
    createdAt:(Date.now()).toString()
  })

  const [student, setStudent] = useState<{
    id:number,
    name:string,
    password:string,
    email:string,
    createdAt:string
  }[]>([])

  

  let textoteste = student.length > 0  ? `${student.forEach(req => {
    return (
      req.name,
      req.email,
      req.createdAt
    )
  })}` : "" 
  
  function handleRegister():void{
    setStudent([...student,req])
    textoteste = student.length > 0  ? `${student.forEach(req => {
      return (
        req.name,
        req.email,
        req.createdAt
      )
    })}` : "" 
 }
  return (
    <ScrollView>
        <View style={styles.container}>
      <View style={styles.formtxt}>
        <Text>Cadastre-se</Text>

        
        <TextInput
          style={styles.textinput}
          placeholder="Digite seu nome"
          value={req.name}
          onChangeText={(text) => setRec({...req,name:text})}
        />
        <TextInput
            style={styles.textinput}
            placeholder="Digite sua senha"
            value={req.password}
            onChangeText={(text) => setRec({...req,password:text})}
        />
        <TextInput
            style={styles.textinput}
            placeholder="Digite seu email"
            value={req.email}
            onChangeText={(text) => setRec({...req,email:text})}
        />
       
       <Button
              
             onPress={() => {setStudent([...student,req])}}
             title="Cadastrar"
             color="#049e11"
             accessibilityLabel="Botão para cadastrar usuario"
       />

       <Text>{textoteste
       }</Text>
        
      </View>
    </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  
  textinput:{
    border:"1px solid",
    borderRadius:"25px",
    padding: "5px",
  

  },
  container: {
    display:'flex',
    backgroundColor:'white',
    width:'100vw',
    height:'100vh',
    alignItems:'center',
    justifyContent:"center",
    
  },

  formtxt: {
    width:"500px",
    height:"600px",
    backgroundColor:"white",
    padding:"25px",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    gap:"10px",
    borderRadius:"25px",
    boxShadow:"rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
    
  },




});
