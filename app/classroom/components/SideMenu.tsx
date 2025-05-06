import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

interface SideMenuProps {
  role: {
    isEmployee: boolean;
    isStudent: boolean;
    positionId?: number;
  };
  activeRoute: string;
}

const SideMenu: React.FC<SideMenuProps> = ({ role, activeRoute }) => {
  const router = useRouter();

  const turma = role?.isEmployee ? 'Turmas' : 'Turma';
  const alunos = role?.isEmployee ? 'Alunos' : 'Alunos';

  const menuItems = [
    {
      label: 'Home',
      iconName: 'home',
      iconLib: 'Ionicons',
      route: 'classroom',
    },
    {
      label: turma,
      iconName: 'class',
      iconLib: 'MaterialIcons',
      route: 'classroom/classes',
    },
    {
      label: 'Cronograma',
      iconName: 'calendar-sharp',
      iconLib: 'Ionicons',
      route: 'classroom/timelines',
    },
    {
      label: alunos,
      iconName: 'school',
      iconLib: 'Ionicons',
      route: 'classroom/students',
    },
  ];

  return (
    <View className="hidden md:flex flex-col h-full gap-6 w-[280px] bg-white items-center p-6 rounded-md shadow-md">
      {menuItems.map((item, index) => {
        const isActive = item.route === activeRoute;
        const iconColor = isActive ? '#9128E2' : '#6B7280';

        const IconComponent =
          item.iconLib === 'MaterialIcons' ? MaterialIcons : Ionicons;

        return (
          <Pressable
            key={index}
            onPress={() => router.push(item.route)}
            className={`flex flex-row gap-3 items-center justify-start w-full h-[60px] rounded-lg px-4 ${
              isActive ? 'bg-purple-100 hover:bg-purple-200' : 'hover:bg-gray-100'
            }`}
          >
            <View className="w-8 h-8 items-center justify-center">
              <IconComponent name={item.iconName as any} size={24} color={iconColor} />
            </View>
            <Text
              className={`text-base font-medium ${
                isActive ? 'text-purple-700' : 'text-gray-700'
              }`}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default SideMenu;
