import React, { useEffect, useState, useRef } from "react";
import MyButton from "@/src/components/MyButtons";
import MySearch from "@/src/components/MySearch";
import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  FlatList,
  Image,
  Animated,
} from "react-native";
import { getUserRoles, getClassroomData } from "@/src/controllers/classroom";
import MyView from "@/src/components/MyView";
import { Icon } from "react-native-paper";
import {
  Ionicons,
  FontAwesome5,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  getUserById,
  iUser,
  updateUserById,
  setUser,
  deleteUserById,
} from "@/src/controllers/users";
import { createStudent } from "@/src/controllers/students";
import { ScrollView } from "react-native-gesture-handler";
import { getAllStudents } from "@/src/controllers/students";
import { Myinput } from "@/src/components/MyInputs";
import Toast from "react-native-toast-message";
import { useUserData } from "@/hooks/useUserData";
import { usePathname } from "expo-router";
import SideMenu from "./components/SideMenu";

interface Student {
  id: number;
  user_id: number;
  created_at?: string;
  users?: {
    name?: string;
    email?: string;
    age?: string;
  };
  classroom_students?: {
    class?: {
      nome_turma?: string;
    };
  }[];
}
export default function Students() {
  const userId = 3;

  const pathname = usePathname();

  const { user, role, classroomData, loading } = useUserData(userId);

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);

  const [isEditing, setEditing] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [req, setReq] = useState<iUser>();

  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
    address: "",
    phone: "",
    cpf: "",
  });

  // const userId = localStorage.getItem("userId");

  useEffect(() => {
    setFilteredStudents(students);
  }, [students]);

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await getAllStudents();
      if (res.status) {
        setStudents(res.data || []);
        setFilteredStudents(res.data || []);
      } else {
        console.error("Erro ao carregar estudantes");
      }
    };

    fetchStudents();
  }, []);

  const toggleForm = () => {
    const toValue = showForm ? 0 : 1;
    setShowForm(!showForm);
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const formHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 800],
  });

  const filterStudents = (text?: string) => {
    const term = (text ?? searchTerm).trim().toLowerCase();

    if (!term) {
      setFilteredStudents(students);
      return;
    }

    const resultado = students.filter((item) => {
      const name = item.users?.name?.toLowerCase() || "";
      const email = item.users?.email?.toLowerCase() || "";
      const age = item.users?.age?.toString() || "";

      return name.includes(term) || email.includes(term) || age.includes(term);
    });

    setFilteredStudents(resultado);
  };

  const handleCancel = () => {
    setForm({
      name: "",
      email: "",
      age: "",
      password: "",
      cpf: "",
      phone: "",
      address: "",
    });
    setEditing(false);
    setShowForm(false);
    animation.setValue(0);
  };

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.age) {
      Toast.show({
        type: "error",
        text1: "Campos obrigatórios",
        text2: "Preencha todos os campos antes de continuar.",
      });
      return;
    }

    try {
      const newUser = {
        name: form.name,
        email: form.email,
        password: form.password,
        cpf: form.cpf,
        contact: form.phone,
        address: form.address,
        age: form.age,
        createAt: new Date().toISOString(),
      };

      console.log("Antes de cadastrar:", newUser);

      const result = await setUser(newUser);

      if (!result) {
        throw new Error("Erro ao inserir no Supabase");
      }
      const userId = result.data?.[0]?.id;

      if (!userId) {
        throw new Error("ID do usuário não retornado");
      }

      const studentResult = await createStudent({ user_id: userId });

      if (!studentResult.status) {
        throw new Error("Erro ao vincular usuário à tabela students");
      }
      setStudents([...students]);

      Toast.show({
        type: "success",
        text1: "Aluno cadastrado",
        text2: "O novo aluno foi cadastrado com sucesso!",
      });

      setForm({
        name: "",
        email: "",
        age: "",
        password: "",
        address: "",
        phone: "",
        cpf: "",
      });

      toggleForm();
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Erro ao cadastrar",
        text2: "Tente novamente mais tarde.",
      });
      console.error("Erro ao cadastrar aluno:", e);
    }
  };
  const handleUpdate = async () => {
    if (!form.name || !form.email || !form.age) {
      Toast.show({
        type: "error",
        text1: "Campos obrigatórios",
        text2: "Preencha todos os campos antes de continuar.",
      });
      return;
    }

    try {
      const success = await updateUserById(req?.id as number, {
        name: form.name,
        email: form.email,
        age: form.age,
        password: form.password,
        cpf: form.cpf,
        contact: form.phone,
        address: form.address,
      });

      if (!success) {
        throw new Error("Erro ao atualizar");
      }

      Toast.show({
        type: "success",
        text1: "Aluno atualizado!",
        text2: "As alterações foram salvas com sucesso.",
      });

      setEditing(false);
      setShowForm(false);
      animation.setValue(0);
      setForm({
        name: "",
        email: "",
        age: "",
        password: "",
        cpf: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao atualizar",
        text2: "Tente novamente mais tarde.",
      });
      console.error(error);
    }
  };

  const renderHeader = () => (
    <View className="flex-row bg-white px-8 py-6 border-b border-gray-300  rounded-t-lg ">
      <Text className="w-[600] font-bold text-gray-800 text-sm">Nome</Text>
      <Text className="w-[150] font-bold text-gray-800 text-sm">ID</Text>
      <Text className="w-[200] font-bold text-gray-800 text-sm">Turma</Text>
      <Text className="w-[150] font-bold text-gray-800 text-sm">Idade</Text>
      <Text className="w-[150] font-bold text-gray-800 text-sm text-right">
        Ações
      </Text>
    </View>
  );

  const renderItem = ({ item, index }: { item: Student; index: number }) => {
    const turma =
      item.classroom_students?.[0]?.class?.nome_turma || "Sem turma";
    const isLastItem = index === students.length - 1;

    return (
      <View
        className={`flex-row items-center px-8 py-8 border-b bg-white border-gray-200 ${
          isLastItem ? "rounded-b-lg" : ""
        }`}
      >
        <View className="w-[50%]">
          <Text className="text-gray-900 font-bold text-base">
            {item.users?.name || "Sem nome"}
          </Text>
          <Text className="text-gray-600 text-sm">
            {item.users?.email || "Sem e-mail"}
          </Text>
        </View>
        <Text className="w-[20%] text-gray-700 text-sm">
          #{item.id.toString()}
        </Text>
        <Text className="w-[25%] text-gray-700 text-sm">{turma}</Text>
        <Text className="w-[15%] text-gray-700 text-sm">
          {item.users?.age || "--"}
        </Text>
        {role?.isEmployee &&
          (role.positionId === 5 || role.positionId === 6) && (
            <View className="w-[15%] flex-row justify-end space-x-8">
              <>
                <Pressable
                  onPress={async () => {
                    await getUserById(item.user_id).then(({ status, data }) => {
                      setReq(data);
                      setForm({
                        name: data.name || "",
                        email: data.email || "",
                        age: data.age?.toString() || "",
                        password: "",
                        cpf: data.cpf || "",
                        phone: data.phone || "",
                        address: data.address || "",
                      });
                      setEditing(true);
                      setShowForm(true);
                      animation.setValue(1);
                    });
                  }}
                >
                  <Feather name="edit" size={20} color="blue" />
                </Pressable>
                <Pressable
                  onPress={() => {
                    setUserToDelete(item.user_id);
                    setConfirmDeleteVisible(true);
                  }}
                >
                  <Feather name="trash-2" size={20} color="red" />
                </Pressable>
              </>
            </View>
          )}
      </View>
    );
  };

  let turma: string = role?.isEmployee ? "Turmas" : "Turma";
  let alunos: string = role?.isEmployee ? "Alunos" : "Meu desempenho";
  const menuItems = [
    {
      label: "Home",
      icon: <Ionicons name="home" size={24} className="color-secondary-400" />,
      route: "classroom/",
    },
    {
      label: turma,
      icon: (
        <MaterialIcons name="class" size={24} className="color-secondary-400" />
      ),
      route: "classroom/classes",
    },
    {
      label: "Cronograma",
      icon: (
        <Ionicons
          name="calendar-sharp"
          size={24}
          className="color-secondary-400"
        />
      ),
      route: "classroom/timelines",
    },
    {
      label: alunos,
      icon: <Ionicons name="school" size={24} className="color-primary-100" />,
      route: "classroom/students",
    },
  ];

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator />
        <Text className="mt-2 text-gray-700">Carregando...</Text>
      </View>
    );
  }

  return (
    <MyView>
      <View className="flex flex-row h-full w-full bg-secondary-100">
        {role && (
          <SideMenu role={role} activeRoute={pathname.replace("/", "")} />
        )}

        <ScrollView className="h-full flex-1 bg-secondary-100 items-center mt-[100] ">
          {!showForm && (
            <View className="flex flex-row items-center w-[100%] justify-between">
              <MySearch
                style={{ marginVertical: 10, width: "30%" }}
                busca={searchTerm}
                placeholder="Buscar aluno por nome, email ou idade..."
                onChangeText={(text) => {
                  setSearchTerm(text);
                  filterStudents(text); // 🔄 usa o texto atualizado
                }}
                onPress={() => filterStudents()} // usa o valor atual do estado
              />

              <MyButton
                icon="plus"
                title="Novo Aluno"
                onPress={() => {
                  setForm({
                    name: "",
                    email: "",
                    age: "",
                    password: "",
                    cpf: "",
                    phone: "",
                    address: "",
                  });
                  setEditing(false);
                  setShowForm(true);
                  animation.setValue(1);
                }}
                width={150}
              />
            </View>
          )}

          <Animated.View
            style={{ height: formHeight, overflow: "hidden" }}
            className="w-[90%] mt-2 bg-white p-4 rounded-lg"
          >
            {showForm && (
              <View className="gap-4 mt-4">
                <Myinput
                  iconName="short-text"
                  label="Nome"
                  type="text"
                  value={form.name}
                  onChangeText={(t) => setForm({ ...form, name: t })}
                />
                <Myinput
                  iconName="email"
                  label="Email"
                  type="text"
                  value={form.email}
                  onChangeText={(t) => setForm({ ...form, email: t })}
                />
                <Myinput
                  iconName="calendar-month"
                  label="Idade"
                  type="text"
                  value={form.age}
                  onChangeText={(t) => setForm({ ...form, age: t })}
                />
                <Myinput
                  iconName="key"
                  label="Senha"
                  type="password"
                  value={form.password}
                  onChangeText={(t) => setForm({ ...form, password: t })}
                />
                <Myinput
                  iconName="123"
                  label="CPF"
                  type="cpf"
                  value={form.cpf}
                  onChangeText={(t) => setForm({ ...form, cpf: t })}
                />
                <Myinput
                  iconName="phone"
                  label="Contato"
                  type="phone"
                  value={form.phone}
                  onChangeText={(t) => setForm({ ...form, phone: t })}
                />
                <Myinput
                  iconName="house"
                  label="Endereço"
                  value={form.address}
                  onChangeText={(t) => setForm({ ...form, address: t })}
                />
                <View className="flex-row justify-center gap-4">
                  <MyButton
                    title="Cancelar"
                    width={150}
                    onPress={handleCancel}
                    color="#e5e7eb"
                    text_color="#374151"
                    height={50}
                    font_size={16}
                  />
                  <MyButton
                    title={isEditing ? "Salvar" : "Cadastrar"}
                    width={150}
                    onPress={isEditing ? handleUpdate : handleRegister}
                    height={50}
                    font_size={16}
                  />
                </View>
              </View>
            )}
          </Animated.View>

          {renderHeader()}
          <FlatList
            data={filteredStudents}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 16 }}
          />

          {confirmDeleteVisible && (
            <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 justify-center width-full items-center z-50">
              <View className="bg-white p-6 rounded-lg w-[80%]">
                <Text className="text-lg font-bold text-center mb-4">
                  Confirmar exclusão
                </Text>
                <Text className="text-center text-gray-600 mb-6">
                  Tem certeza que deseja excluir este usuário? Essa ação não
                  poderá ser desfeita.
                </Text>

                <View className="flex-row justify-center gap-4">
                  <MyButton
                    title="Cancelar"
                    width={120}
                    onPress={() => {
                      setConfirmDeleteVisible(false);
                      setUserToDelete(null);
                    }}
                    color="#e5e7eb"
                    text_color="#111827"
                    height={40}
                    font_size={14}
                  />
                  <MyButton
                    title="Excluir"
                    width={120}
                    onPress={async () => {
                      if (userToDelete != null) {
                        const success = await deleteUserById(userToDelete);
                        if (success) {
                          Toast.show({
                            type: "success",
                            text1: "Usuário excluído com sucesso!",
                          });
                        } else {
                          Toast.show({
                            type: "error",
                            text1: "Erro ao excluir",
                            text2: "Tente novamente mais tarde.",
                          });
                        }
                        setConfirmDeleteVisible(false);
                        setUserToDelete(null);
                      }
                    }}
                    color="#ef4444"
                    text_color="#ffffff"
                    height={40}
                    font_size={14}
                  />
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </MyView>
  );
}
