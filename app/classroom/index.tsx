import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Pressable } from "react-native";
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
import CalendarComponent from "./CalendarComponent";
import { useUserData } from "@/hooks/useUserData";
import { usePathname } from "expo-router";
import SideMenu from "./components/SideMenu";

export default function HomeScreen() {
  const router = useRouter();
  // const userId = localStorage.getItem("userId");
  const userId = 3;

  const pathname = usePathname();

  const { user, role, classroomData, loading } = useUserData(userId);

  const Card = ({
    icon,
    title,
    description,
  }: {
    icon: string;
    title: string;
    description: string;
  }) => {
    return (
      <View className="bg-white rounded-2xl p-5 w-[200] h-[110] flex flex-row gap-3 items-center">
        <View className="flex items-center justify-center bg-primary-20 w-10 h-10 rounded-lg">
          <Icon source={icon} size={22} color="#9128E2" />
        </View>
        <View className="flex flex-col justify-start">
          <Text className="text-sm font-medium text-left color-secondary-400">
        {description}
          </Text>
          <Text className="text-lg font-bold text-gray-900">{title}</Text>
        </View>
      </View>
    );
  };

  const WelcomeMensage = () => {
    if (role?.isEmployee) {
      return (
        <View className="flex flex-row items-center justify-start bg-white mt-[51] px-10  w-full rounded-lg h-[114] ">
          <Text className="text-2xl font-medium text-left color-secondary-500">
            Bem vindo de volta,{" "}
            <Text className="font-semibold">{user?.name}</Text>!
          </Text>
        </View>
      );
    }
  };

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
        {role && <SideMenu role={role} activeRoute={pathname.replace("/", "")} />}

       
          <ScrollView className="h-full flex-1 bg-secondary-100 items-center ">
            <WelcomeMensage />
            <View className="flex flex-row gap-20  p-4">
              <Card
                icon="account-group"
                title={classroomData?.numberClasses?.toString() || "0"}
                description="Total de Turmas"
              />
              <Card
                icon="book"
                title={classroomData?.numberDiciplines?.toString() || "0"}
                description="Total de diciplinas"
              />
              <Card
                icon="school"
                title={classroomData?.numberStudents?.toString() || "0"}
                description="Total de Alunos"
              />
              <Card icon="star" title={"0"} description="Pendencias" />
            </View>

            <CalendarComponent></CalendarComponent>
          </ScrollView>
      

       

       

      
      </View>
    </MyView>
  );
}
