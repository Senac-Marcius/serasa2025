import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { getUserRoles } from "@/src/controllers/classroom";
import MyView from "@/src/components/MyView";
import { Icon } from "react-native-paper";

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<null | {
    isStudent: boolean;
    isEmployee: boolean;
    employeePosition?: string;
  }>(null);

  const userId =8;

  useEffect(() => {
    const fetchRoles = async () => {
      const roles = await getUserRoles(userId);
      setRole(roles);
      setLoading(false);
    };

    fetchRoles();
  }, []);

  const CardTop = ({ icon, title, description }: { icon: string; title: string; description: string }) => {
    return (
      <View className="bg-white shadow-md rounded-2xl p-4  sm:w-1/2 lg:w-1/4 flex flex-row gap-3 items-center" >
        <View className="flex items-center justify-center bg-primary-20 w-10 h-10 rounded-lg">
        <Icon source={icon} size={22} color="#9128E2" />

        </View>
        <View className="flex flex-col  justify-start">
        <Text className="text-xl font-bold text-gray-900 ">{title}</Text>
        <Text className="text-sm font-medium text-left color-secondary-400">{description}</Text>
        </View>
      </View>
    );
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
      {role?.isEmployee && role.employeePosition === "Professor" && (
        <View className="mb-6">
          <Text className="text-xl font-bold text-blue-700 mb-2">Área do Professor</Text>
          <Text className="text-gray-700">• Visualizar turmas</Text>
          <Text className="text-gray-700">• Lançar notas</Text>
        </View>
      )}

      {role?.isStudent && (
        <View className="mb-6">
          <Text className="text-xl font-bold text-green-700 mb-2">Área do Estudante</Text>
          <Text className="text-gray-700">• Ver disciplinas</Text>
          <Text className="text-gray-700">• Ver notas</Text>
        </View>
      )}

      {role?.isEmployee && role.employeePosition === "Admin" && (
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-2">Bem-vindo ao sistema</Text>
          <Text className="text-gray-600">Admin.</Text>
        </View>
      )}

      {!role?.isStudent && !(role?.isEmployee && role.employeePosition === "Professor") && (
        <View>

          <Text className="text-xl font-bold text-gray-800 mb-2">Bem-vindo ao sistema</Text>
          <Text className="text-gray-600">Seu perfil ainda não tem uma função definida.</Text>
        </View>
      )}
      <CardTop icon="school" title="12" description="Classes." />
    </MyView>
  );
}
