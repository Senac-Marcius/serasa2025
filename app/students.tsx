import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

export default function StudentsScreen() {
  const [req, setReq] = useState({
    id: 0,
    name: "",
    password: "",
    email: "",
    createdAt: Date.now().toString(),
  });

  const [student, setStudent] = useState<
    {
      id: number;
      name: string;
      password: string;
      email: string;
      createdAt: string;
    }[]
  >([]);
  

  function handleRegister() {
    if (req.id == -1) {
      setStudent([...student, req]);
      
    } else {
      setStudent(student.map(i => (i.id == req.id)? req: i )  );
    }
    setReq({
      id: -1,
      name: "",
      password: "",
      email: "",
      createdAt: Date().toString(),
    });
  }

  function editStudent(id: number) {
    let stu = student.find((s) => {
      if (s.id == id) return s;
    });
    if (stu != undefined) {
      setReq(stu);
    }
  }

  function deleteStudent(id: number) {
    setStudent((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.formtxt}>
          <Text style={styles.titulos}>Cadastre-se</Text>

          <TextInput
            style={styles.textinput}
            placeholder="Digite seu nome"
            value={req.name}
            onChangeText={(text) => setReq({ ...req, name: text })}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Digite sua senha"
            value={req.password}
            onChangeText={(text) => setReq({ ...req, password: text })}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Digite seu email"
            value={req.email}
            onChangeText={(text) => setReq({ ...req, email: text })}
          />

          <TouchableOpacity
            onPress={handleRegister}
            style={styles.button_handle}
          >
            Cadastrar
          </TouchableOpacity>

          <FlatList
            data={student}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.output}>
                <Text>{item.name}</Text>
                <Text>{item.email}</Text>
                <Text>{item.createdAt}</Text>
                <View style={styles.row}>
                  <TouchableOpacity
                    onPress={() => {
                      deleteStudent(item.id);
                    }}
                    style={styles.button_deletar}
                  >
                    Deletar
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      editStudent(item.id);
                    }}
                    style={styles.button_editar}
                  >
                    Editar
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  output: {
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
    borderRadius: 25,
    width: 250,
    height: 150,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 5,
  },
  titulos: {
    fontSize: 34,
    fontWeight: 600,
  },
  button_handle: {
    width: 150,
    height: 50,
    borderRadius: 25,
    backgroundColor: "green",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    fontSize: 18,
    color: "white",
  },

  textinput: {
    borderRadius: "5px",
    padding: 5,
    width: 400,
  },
  container: {
    display: "flex",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  row: {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  button_editar: {
    backgroundColor: "yellow",
    borderRadius: 25,
    width: 80,
    height: 40,
    color: "black",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button_deletar: {
    backgroundColor: "red",
    borderRadius: 25,
    width: 80,
    height: 40,
    color: "black",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },


  formtxt: {
    width: 500,
    height: 600,
    backgroundColor: "white",
    padding: 25,
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
