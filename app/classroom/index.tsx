import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator , Pressable} from "react-native";
import { getUserRoles,getClassroomData } from "@/src/controllers/classroom";
import MyView from "@/src/components/MyView";
import { Icon } from "react-native-paper";
import { Ionicons, FontAwesome5, Feather, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { getUserById ,iUser} from "@/src/controllers/users";
import { ScrollView } from "react-native-gesture-handler";
import CalendarComponent from "./CalendarComponent";
export default function HomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<null | {
    isStudent: boolean;
    isEmployee: boolean;
    employeePosition?: string;
    positionId?:number

  }>(null);

  const [classroomData, setClassroomData] = useState<null | {
    numberClasses: number | null;
    numberStudents: number | null;
    numberTeachers: number | null;
    numberDiciplines: number | null;
  }>(null);

  const [user, setUser] = useState<null | iUser>(null);



  // const userId = localStorage.getItem("userId");
  const userId = 3;
  
  

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



  const Card = ({ icon, title, description }: { icon: string; title: string; description: string }) => {
    return (
      <View className="bg-white  rounded-2xl p-10   w-[350] h-[175] flex flex-row gap-3 items-center" >
        <View className="flex items-center justify-center bg-primary-20 w-20 h-20 rounded-lg">
        <Icon source={icon} size={44} color="#9128E2" />
        </View>
        <View className="flex flex-col  justify-start">
          <Text  className="text-xl font-medium  text-left color-secondary-400">{description}</Text>
          <Text className="text-2xl font-bold text-gray-900 ">{title}</Text>
        </View>
      </View>
    );
  };

  let turma:string = role?.isEmployee ? 'Turmas' : 'Turma'
  let alunos:string = role?.isEmployee ? 'Alunos' : 'Meu desempenho'
  const menuItems = [
    
  
    { label: 'Home', icon: <Ionicons name="home" size={24} className="color-primary-100" />, route: 'classroom/index' },
    { label: turma, icon:<MaterialIcons name="class" size={24} className="color-secondary-400" />, route: 'classroom/classes' },
    { label: 'Cronograma', icon: <Ionicons name="calendar-sharp" size={24} className="color-secondary-400" />, route: 'classroom/timelines' },
    { label: alunos, icon: <Ionicons name="school" size={24} className="color-secondary-400" />, route: 'classroom/students' },
    
  ];


  const WelcomeMensage = () => {
    if(role?.isEmployee){
      return(
        <View className="flex flex-row items-center justify-start bg-white mt-[51] px-10  w-full rounded-lg h-[114] ">
         <Text className="text-2xl font-medium text-left color-secondary-500">Bem vindo de volta, <Text className="font-semibold">{user?.name}</Text>!</Text>          
        </View>
      )
    }
  }


 



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
      if (index === 0) {
        return (
          <Pressable
            className="flex flex-row gap-3 items-center p-1 justify-start w-[250] h-[70] bg-purple-100 rounded-lg hover:bg-purple-200"
            key={index}
            onPress={() => router.push(item.route)}
          >
            <View className="flex items-center justify-center w-10 h-10 rounded-lg">
              {item.icon}
            </View>
            <Text className="font-medium text-xl color-primary-100">{item.label}</Text>
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
            <Text className="font-medium text-xl color-secondary-400">{item.label}</Text>
          </Pressable>
        );
      }
    })}
 </View>


      {role?.isEmployee && role.positionId === 4 && (
        <ScrollView className="h-full flex-1 bg-secondary-100 items-center ">
          <WelcomeMensage/>
          <View className="flex flex-row gap-3  p-4">
            <Card icon="account-group" title={classroomData?.numberClasses?.toString() || "0"} description="Total de Turmas"/>
            <Card icon="book" title={classroomData?.numberDiciplines?.toString() || "0"} description="Total de diciplinas"/>
            <Card icon="school" title={classroomData?.numberStudents?.toString() || "0"} description="Total de Alunos"/>
            <Card icon="star" title={ "0"} description="Pendencias"/>
          </View>
          
          <CalendarComponent></CalendarComponent>


        </ScrollView>
      )
      }

      {role?.isStudent && (
          <ScrollView className="h-full flex-1 bg-secondary-100 items-center ">
          <WelcomeMensage/>
          <View className="flex flex-row gap-3  p-4">
            <Card icon="account-group" title={classroomData?.numberClasses?.toString() || "0"} description="Total de Turmas"/>
            <Card icon="book" title={classroomData?.numberDiciplines?.toString() || "0"} description="Total de diciplinas"/>
            <Card icon="school" title={classroomData?.numberStudents?.toString() || "0"} description="Total de Alunos"/>
            <Card icon="star" title={ "0"} description="Pendencias"/>
          </View>
          <CalendarComponent></CalendarComponent>
        </ScrollView>
      )}

      {(role?.isEmployee && (role.positionId === 5 || role.positionId === 6)  ) && (
       <ScrollView className="h-full flex-1 bg-secondary-100 items-center ">
       <WelcomeMensage/>
       <View className="flex flex-row gap-3  p-4">
         <Card icon="account-group" title={classroomData?.numberClasses?.toString() || "0"} description="Total de Turmas"/>
         <Card icon="book" title={classroomData?.numberDiciplines?.toString() || "0"} description="Total de diciplinas"/>
         <Card icon="school" title={classroomData?.numberStudents?.toString() || "0"} description="Total de Alunos"/>
         <Card icon="star" title={ "0"} description="Pendencias"/>
       </View>
       <CalendarComponent></CalendarComponent>


     </ScrollView>
      )}

      {(role?.isEmployee && (role.positionId !== 5 && role.positionId !== 6 && role.positionId !== 4)  )&& (
        <View>

          <Text className="text-xl font-bold text-gray-800 mb-2">Bem-vindo ao sistema</Text>
          <Text className="text-gray-600">Seu perfil ainda não tem uma função definida.</Text>
        </View>
      )}
      </View>

    </MyView>
  );
}
