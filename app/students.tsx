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
  _View,
} from "react-native";
import MyButton from "../src/components/MyButtons";
import MyView from "../src/components/MyView";
import { useRouter } from "expo-router";
import {
  delStudent,
  editStudent,
  getStudent,
  selectStudent,
  setStudent,
  iStudent,
  eStudent,
} from "../src/controllers/students";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";

export default function StudentsScreen() {
  const [students, setStudents] = useState<eStudent[]>([]);
  const [studentEdit, setEditStudent] = useState<eStudent | null>(null);

  const [req, setReq] = useState({
    name: "",
    birthday: "",
    email: "",
    phone: "",
    rg: "",
    cpf: "",
    cep: "",
    address: "",
    city: "",
    state: "",
    password: "",
    user_id: 1,
  });

  const [isEditing, setEditState] = useState(false);

  useEffect(() => {
    async function fetchStudents() {
      const todos = await getStudent();
      if (todos && todos.length > 0) {
        setStudents(todos);
      }
    }
    fetchStudents();
  }, []);

  async function handleRegister() {
    if (isEditing) {
      if (studentEdit) {
        setEditStudent({ id: studentEdit.id, ...req });
        editStudent(studentEdit)
      }
      setEditState(false)
      return
    }
    console.log("Registering student:", req);
    await setStudent(req)
      .then(() => {
        console.log("Student registered successfully");
      })
      .catch((error) => {
        console.error("Error registering student:", error);
      });
  }

  const router = useRouter();

  const renderItem = ({ item }: { item: eStudent }) => (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.email}</Text>
      <MyButton
        title="Editar"
        onPress={() => {
          setEditStudent(item)
          setReq(item);
          setEditState(true);
        }}
      />
      <MyButton title="Delete" onPress={() => delStudent(item.id)} />
    </View>
  );

  return (
    <MyView router={router}>
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
            placeholder="Data de nascimento"
            value={req.birthday}
            onChangeText={(text) => setReq({ ...req, birthday: text })}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Digite seu email"
            value={req.email}
            onChangeText={(text) => setReq({ ...req, email: text })}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Digite seu phone"
            value={req.phone}
            onChangeText={(text) => setReq({ ...req, phone: text })}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Digite seu rg"
            value={req.rg}
            onChangeText={(text) => setReq({ ...req, rg: text })}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Digite seu cpf"
            value={req.cpf}
            onChangeText={(text) => setReq({ ...req, cpf: text })}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Digite seu cep"
            value={req.cep}
            onChangeText={(text) => setReq({ ...req, cep: text })}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Digite seu address"
            value={req.address}
            onChangeText={(text) => setReq({ ...req, address: text })}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Digite seu city"
            value={req.city}
            onChangeText={(text) => setReq({ ...req, city: text })}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Digite seu state"
            value={req.state}
            onChangeText={(text) => setReq({ ...req, state: text })}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Digite seu password"
            value={req.password}
            onChangeText={(text) => setReq({ ...req, password: text })}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Digite seu user id"
            value={req.user_id.toString()}
            onChangeText={(text) => setReq({ ...req, user_id: Number(text) })}
          />

          <TouchableOpacity
            onPress={handleRegister}
            style={styles.button_handle}
          >
            Cadastrar
          </TouchableOpacity>
        </View>
        <FlatList
          data={students}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        ></FlatList>
      </View>
    </MyView>
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
