import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  _View,
} from "react-native";
import MyButton from "../../../src/components/MyButtons";
import MyView from "../../../src/components/MyView";
import { useRouter } from "expo-router";
import {
  delStudent,
  editStudent,
  getStudent,
  setStudent,
  eStudent,
} from "../../../src/controllers/students";
import styles from "./styles";

export default function StudentsScreen() {
  const [students, setStudents] = useState<eStudent[] | null>([]);
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
  async function fetchStudents() {
    const todos = await getStudent();
    if (todos && todos.length > 0) {
      setStudents(todos);
    }
  }
  useEffect(() => {
    fetchStudents();
  }, [students]);

  async function handleRegister() {
    if (isEditing) {
      if (studentEdit) {
        const { id, ...othervalues } = studentEdit;
        const updateStudent = { id, ...req };
        console.log(updateStudent);
        await editStudent(updateStudent);
      }
      setEditState(false);
      ;
      return;
    }
    console.log("Registering student:", req);
    await setStudent(req)
      .then(() => {
        console.log("Student registered successfully");
        ;
      })
      .catch((error) => {
        console.error("Error registering student:", error);
      });
  }
  async function removeStudent(id: number) {
    let remove = await delStudent(id);

    if (remove) {
      ;
    }
  }

  const router = useRouter();

  const renderItem = ({ item }: { item: eStudent }) => (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.email}</Text>
      <MyButton
        title="Editar"
        onPress={() => {
          setEditStudent(item);
          setReq(item);
          setEditState(true);
        }}
      />
      <MyButton title="Delete" onPress={() => removeStudent(item.id)} />
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
            onChangeText={(text) => {
              setReq({ ...req, name: text });
            }}
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

