import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
} from "react-native";

export default function StudentsScreen() {
  const [req, setRec] = useState({
    id: 0,
    name: "",
    password: "",
    email: "",
    createdAt: Date.now().toString(),
  });

  const [student, setStudent] = useState<{
      id: number,
      name: string,
      password: string,
      email: string,
      createdAt: string,
    }[]>([]);

  function handleRegister() {
    setStudent([...student, req])
    setRec({
      id: 0,
      name: "",
      password: "",
      email: "",
      createdAt: Date().toString(),
    })
  }

  return (
   
      <View style={styles.container}>
        <View style={styles.formtxt}>
          <Text>Cadastre-se</Text>

          <TextInput
            style={styles.textinput}
            placeholder="Digite seu nome"
            value={req.name}
            onChangeText={(text) => setRec({ ...req, name: text })}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Digite sua senha"
            value={req.password}
            onChangeText={(text) => setRec({ ...req, password: text })}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Digite seu email"
            value={req.email}
            onChangeText={(text) => setRec({ ...req, email: text })}
          />

          <Button
            onPress={handleRegister          
           }
            title="Cadastrar"
            color="#049e11"
            accessibilityLabel="Botão para cadastrar usuario"
          />
        </View>

        <FlatList
          data={student}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.email}</Text>
              <Text>{item.createdAt}</Text>
            </View>
          )}
        />
      </View>
   
  );
}

const styles = StyleSheet.create({
  textinput: {
    border: "1px solid",
    borderRadius: "25px",
    padding: 5,
  },
  container: {
    display: "flex",
    backgroundColor: "white",
    width: "100vw",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  formtxt: {
    width: "500px",
    height: "600px",
    backgroundColor: "white",
    padding: "25px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    borderRadius: "25px",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
  },
});
