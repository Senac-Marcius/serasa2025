import { supabase } from "../utils/supabase";

export type UserRole = {
  isStudent: boolean;
  isEmployee: boolean;
  employeePosition?: string; 
};

export async function getUserRoles(userId: number): Promise<UserRole> {
  let isStudent = false;
  let isEmployee = false;
  let employeePosition: string | undefined = undefined;

  const { data: studentData, error:studentError } = await supabase.from("students")
    .select("id,user_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (studentData) {
    isStudent = true;
  }

  console.log("error",studentError)
  

  const { data: employeeData } = await supabase
    .from("employees")
    .select("id, positions_id")
    .eq("user_id", userId)
    .single();

  if (employeeData) {
    isEmployee = true;


    const { data: positionsData } = await supabase
      .from("positions")
      .select("name")
      .eq("id", employeeData.positions_id)
      .single();

    employeePosition = positionsData?.name;
  }

  return { isStudent, isEmployee, employeePosition };
}
