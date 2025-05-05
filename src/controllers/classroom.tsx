import { supabase } from "../utils/supabase";

interface UserRoles {
    isStudent: boolean;
    isProfessor: boolean;
    isAdmin: boolean;
  }
  
  export async function getUserRoles(userId: string): Promise<UserRoles> {
    const roles: UserRoles = {
      isStudent: false,
      isProfessor: false,
      isAdmin: false,
    };
  
    // Verifica se é estudante
    const { data: studentData } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", userId)
      .single();
  
    if (studentData) roles.isStudent = true;
  
    // Verifica se é funcionário
    const { data: funcionarioData } = await supabase
      .from("funcionarios")
      .select("cargo")
      .eq("user_id", userId)
      .single();
  
    if (funcionarioData) {
      const cargo = funcionarioData.cargo.toLowerCase();
      if (cargo === "professor") roles.isProfessor = true;
      if (cargo === "diretor" || cargo === "admin") roles.isAdmin = true;
    }
  
    return roles;
  }
  