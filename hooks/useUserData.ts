import { useEffect, useState } from 'react';
import { getUserById, iUser } from '@/src/controllers/users';
import { getUserRoles } from '@/src/controllers/classroom';
import { getClassroomData } from '@/src/controllers/classroom';

export interface iRole {
  isStudent: boolean;
  isEmployee: boolean;
  employeePosition?: string;
  positionId?: number;
}

export interface iClassroomData {
  numberClasses: number | null;
  numberStudents: number | null;
  numberTeachers: number | null;
  numberDiciplines: number | null;
}

export function useUserData(userId: number) {
  const [user, setUser] = useState<iUser | null>(null);
  const [role, setRole] = useState<iRole | null>(null);
  const [classroomData, setClassroomData] = useState<iClassroomData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [userRes, rolesRes, classroomRes] = await Promise.all([
          getUserById(userId),
          getUserRoles(userId),
          getClassroomData(userId)
        ]);

        if (userRes.status) setUser(userRes.data);
        if (rolesRes) setRole(rolesRes);
        if (classroomRes) setClassroomData(classroomRes);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [userId]);

  return { user, role, classroomData, loading };
}
