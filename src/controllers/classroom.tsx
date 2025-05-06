import { supabase } from "../utils/supabase";

export type UserRole = {
  isStudent: boolean;
  isEmployee: boolean;
  employeePosition?: string; 
  positionId?:number

};

export type ClassRoomData = {
  numberCourses: number | null;
  numberStudents: number | null
  numberTeachers: number | null
  numberClasses: number | null
  numberDiciplines: number | null

}


export async function getClassroomData(userId: number): Promise<ClassRoomData>{
  let numberCourses: number | null = 0
  let numberStudents: number | null = 0
  let numberTeachers: number | null = 0
  let numberClasses: number | null = 0
  let numberDiciplines: number | null = 0
  
  const contarCourses = async () => {
        const { count, error } = await supabase
          .from('courses')
          .select('*', { count: 'exact', head: true });
      
        if (error) {
          console.error('Erro ao contar cursos:', error);
          return 0;
        }
      
        console.log('Total de cursos:', count);
        return count;
      };
      const contarClasses = async () => {
        const { count, error } = await supabase
          .from('class')
          .select('*', { count: 'exact', head: true });
      
        if (error) {
          console.error('Erro ao contar turmas:', error);
          return 0;
        }
      
        console.log('Total de turmas:', count);
        return count;
      };



      const contarStudents = async () => {
        const { count, error } = await supabase
          .from('students')
          .select('*', { count: 'exact', head: true });
      
        if (error) {
          console.error('Erro ao contar alunos:', error);
          return 0;
        }
      
        console.log('Total de alunos:', count);
        return count;
      };

      const contarTeachers = async () => {
        const { count, error } = await supabase
          .from('employees')
          .select('*', { count: 'exact', head: true })
          .eq("positions_id",4);
      
        if (error) {
          console.error('Erro ao contar professores:', error);
          return 0;
        }
      
        console.log('Total de professores:', count);
        return count;
      };


      const contarDiciplines = async () => {
        const { count, error } = await supabase
          .from('disciplines')
          .select('*', { count: 'exact', head: true });
      
        if (error) {
          console.error('Erro ao contar disciplinas:', error);
          return 0;
        }
      
        console.log('Total de disciplinas:', count);
        return count;
      };

    numberDiciplines = await contarDiciplines()
    numberCourses = await contarCourses()
    numberStudents = await contarStudents()
    numberTeachers = await contarTeachers()
    numberClasses = await contarClasses()
  
  
  
    return {
    numberCourses,
    numberStudents,
    numberTeachers,
    numberClasses,
    numberDiciplines
  }

} 


export async function getUserRoles(userId: number): Promise<UserRole> {
  let isStudent = false;
  let isEmployee = false;
  let employeePosition: string | undefined = undefined;
  let positionId: number | undefined = undefined



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
    positionId = employeeData.positions_id
  
  }

  return { isStudent, isEmployee, employeePosition, positionId, };
}
