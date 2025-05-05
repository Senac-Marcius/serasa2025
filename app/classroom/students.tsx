import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator , Pressable,FlatList,Image} from "react-native";
import { getUserRoles,getClassroomData } from "@/src/controllers/classroom";
import MyView from "@/src/components/MyView";
import { Icon } from "react-native-paper";
import { Ionicons, FontAwesome5, Feather, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { getUserById ,iUser} from "@/src/controllers/users";
import { ScrollView } from "react-native-gesture-handler";
import { getAllStudents } from "@/src/controllers/students"; // ajuste o caminho conforme sua estrutura

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
const isAdmin = false;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [role, setRole] = useState<null | {
    isStudent: boolean;
    isEmployee: boolean;
    employeePosition?: string;
    positionId?:number

  }>(null);
  const [user, setUser] = useState<null | iUser>(null);

  const [classroomData, setClassroomData] = useState<null | {
    numberClasses: number | null;
    numberStudents: number | null;
    numberTeachers: number | null;
    numberDiciplines: number | null;
  }>(null);




  // const userId = localStorage.getItem("userId");
  
  

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

    const fetchUserData = async () => {
      const userData = await getUserById(Number(userId));
      setUser(userData.data);
      setLoading(false);
     
    };

    fetchClassroomData();

    fetchRoles();
    fetchUserData();
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
    <View className="flex-row bg-gray-100 px-4 py-3 border-b border-gray-300">
      <Text className="w-[30%] font-semibold text-gray-700">Name</Text>
      <Text className="w-[20%] font-semibold text-gray-700">Registration</Text>
      <Text className="w-[20%] font-semibold text-gray-700">Class</Text>
      <Text className="w-[10%] font-semibold text-gray-700">Age</Text>
      <Text className="w-[20%] font-semibold text-gray-700 text-right">Actions</Text>
    </View>
  );

  const renderItem = ({ item }: { item: Student }) => {
    const turma = item.classroom_students?.[0]?.class?.nome_turma || "Sem turma";
  
    return (
      <View className="flex-row items-center px-4 py-3 border-b border-gray-200">
        <View className="w-[30%]">
          <Text className="text-gray-800 font-medium">{item.users?.name || "Sem nome"}</Text>
          <Text className="text-gray-500 text-sm">{item.users?.email || "Sem e-mail"}</Text>
        </View>
        <Text className="w-[20%] text-gray-600">#{item.id.toString().padStart(7, "0")}</Text>
        <Text className="w-[20%] text-gray-600">{turma}</Text>
        <Text className="w-[10%] text-gray-600">{item.users?.age || "--"}</Text>
        <View className="w-[20%] flex-row justify-end space-x-4">
          <Pressable>
            <Ionicons name="eye-outline" size={20} color="gray" />
          </Pressable>
          {isAdmin && (
            <>
              <Pressable>
                <Feather name="edit" size={20} color="blue" />
              </Pressable>
              <Pressable>
                <Feather name="trash-2" size={20} color="red" />
              </Pressable>
            </>
          )}
        </View>
      </View>
    );
  };




  let turma:string = role?.isEmployee ? 'Turmas' : 'Turma'
  let alunos:string = role?.isEmployee ? 'Alunos' : 'Meu desempenho'
  const menuItems = [
    
  
    { label: 'Home', icon: <Ionicons name="home" size={24} className="color-secondary-400" />, route: 'classroom/' },
    { label: turma, icon:<MaterialIcons name="class" size={24} className="color-secondary-400" />, route: 'classroom/classes' },
    { label: 'Cronograma', icon: <Ionicons name="calendar-sharp" size={24} className="color-secondary-400" />, route: 'classroom/timelines' },
    { label: alunos, icon: <Ionicons name="school" size={24} className="color-primary-100" />, route: 'classroom/students' },
    
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
          className="flex flex-row gap-3 items-center p-1 justify-start w-[200] bg-purple-100 rounded-lg hover:bg-purple-200"
          key={index}
          onPress={() => router.push(item.route)}
        >
          <View className="flex items-center justify-center w-10 h-10 rounded-lg">
            {item.icon}
          </View>
          <Text className="font-medium color-primary-100">{item.label}</Text>
        </Pressable>
      );
    } else {
      return (
        <Pressable
          className="flex flex-row gap-3 items-center p-1 justify-start w-[200] bg-white rounded-lg hover:bg-gray-100"
          key={index}
          onPress={() => router.push(item.route)}
        >
          <View className="flex items-center justify-center w-10 h-10 rounded-lg">
            {item.icon}
          </View>
          <Text className="font-medium color-secondary-400">{item.label}</Text>
        </Pressable>
      );
    }
  })}
 </View>


     

      

      {(role?.isEmployee ) && (
       <ScrollView className="h-full flex-1 bg-secondary-100 items-center ">
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

