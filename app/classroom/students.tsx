import React, { useEffect, useState } from "react";
import MyButton from "@/src/components/MyButtons";
import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  FlatList,
  Image,
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
import { getUserById, iUser } from "@/src/controllers/users";
import { ScrollView } from "react-native-gesture-handler";
import { getAllStudents } from "@/src/controllers/students"; // ajuste o caminho conforme sua estrutura
import { Myinput } from "@/src/components/MyInputs";

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
  const userId = 6;

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isEditing, setEditing] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [req, setReq] = useState<iUser>();
  const [role, setRole] = useState<null | {
    isStudent: boolean;
    isEmployee: boolean;
    employeePosition?: string;
    positionId?: number;
  }>(null);
  const [user, setUser] = useState<null | iUser>(null);

  const [classroomData, setClassroomData] = useState<null | {
    numberClasses: number | null;
    numberStudents: number | null;
    numberTeachers: number | null;
    numberDiciplines: number | null;
  }>(null);

  // const userId = localStorage.getItem("userId");

  const fetchUserData = async (id: string) => {
    const userData = await getUserById(Number(id));
    setUser(userData.data);
    setLoading(false);
  };

  useEffect(() => {
    const fetchRoles = async () => {
      const roles = await getUserRoles(Number(userId));
      setRole(roles);
      setLoading(false);
    };

    const fetchClassroomData = async () => {
      const classroomData = await getClassroomData(Number(userId));
      setClassroomData(classroomData);
      setLoading(false);
    };

    fetchClassroomData();
    fetchRoles();
  }, []);
  useEffect(() => {
    const fetchStudents = async () => {
      const res = await getAllStudents();
      if (res.status) {
        setStudents(res.data);
      } else {
        console.error("Erro ao carregar estudantes");
      }
      setLoading(false);
    };

    fetchStudents();
  }, []);

  const renderHeader = () => (
    <View className="flex-row bg-gray-100 px-8 py-6 border-b border-gray-400 mt-10 rounded-t-lg">
      <Text className="w-[600] font-bold text-gray-800 text-lg">Nome</Text>
      <Text className="w-[150] font-bold text-gray-800 text-lg">ID</Text>
      <Text className="w-[200] font-bold text-gray-800 text-lg">Turma</Text>
      <Text className="w-[150] font-bold text-gray-800 text-lg">Idade</Text>
      <Text className="w-[150] font-bold text-gray-800 text-lg text-right">
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
        className={`flex-row items-center px-8 py-8 border-b bg-white border-gray-300 ${
          isLastItem ? "rounded-b-lg" : ""
        }`}
      >
        <View className="w-[50%]">
          <Text className="text-gray-900 font-bold text-xl">
            {item.users?.name || "Sem nome"}
          </Text>
          <Text className="text-gray-600 text-lg">
            {item.users?.email || "Sem e-mail"}
          </Text>
        </View>
        <Text className="w-[20%] text-gray-700 text-lg">
          #{item.id.toString()}
        </Text>
        <Text className="w-[25%] text-gray-700 text-lg">{turma}</Text>
        <Text className="w-[15%] text-gray-700 text-lg">
          {item.users?.age || "--"}
        </Text>
        {role?.isEmployee &&
          (role.positionId === 5 || role.positionId === 6) && (
            <View className="w-[15%] flex-row justify-end space-x-8">
              <>
                <Pressable
                  onPress={async () => {
                    // setEditing(true)
                    await getUserById(item.user_id).then(({ status, data }) => {
                      setReq(data);
                      setEditing(true);
                    });
                  }}
                >
                  <Feather name="edit" size={32} color="blue" />
                </Pressable>
                <Pressable onPress={() => {}}>
                  <Feather name="trash-2" size={32} color="red" />
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
        <View className="flex flex-col  h-full gap-14 w-[350] bg-white  items-center p-6 rounded-md">
          {menuItems.map((item, index) => {
            if (index === 3) {
              return (
                <Pressable
                  className="flex flex-row gap-3 items-center p-1 justify-start w-[250] h-[70] bg-purple-100 rounded-lg hover:bg-purple-200"
                  key={index}
                  onPress={() => router.push(item.route)}
                >
                  <View className="flex items-center justify-center w-10 h-10 rounded-lg">
                    {item.icon}
                  </View>
                  <Text className="font-medium text-xl color-primary-100">
                    {item.label}
                  </Text>
                </Pressable>
              );
            } else {
              return (
                <Pressable
                  className="flex flex-row gap-3 items-center p-1 justify-start w-[250] h-[70] bg-white rounded-lg hover:bg-gray-100"
                  key={index}
                  onPress={() => router.push(item.route)}
                >
                  <View className="flex items-center justify-center w-10 h-10 rounded-lg">
                    {item.icon}
                  </View>
                  <Text className="font-medium text-xl color-secondary-400">
                    {item.label}
                  </Text>
                </Pressable>
              );
            }
          })}
        </View>

        {role?.isEmployee && (
          <ScrollView className="h-full flex-1 bg-secondary-100 items-center mt-[250] ">
            {isEditing && (
              <View className="absolute w-full h-[800] bg-blue-300 z-30">
               

                  <MyButton title="X" onPress={() =>{ setEditing(false)}}/>
              </View>
            )}

            {renderHeader()}
            <FlatList
              data={students}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 16 }}
            />
          </ScrollView>
        )}
      </View>
    </MyView>
  );
}
