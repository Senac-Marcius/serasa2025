
import { supabase } from '../utils/supabase'


interface iCourses{
    id: number,
    created_at: string,
    description: string,
    courseplan: string,
    orientationplan: string,
    workload: number,
    userId: number
}



async function setCoursebd(courses:iCourses ){
    //aqui vem os tratamenos de regez ou model ode negocio antes de inseir
    const { data, error } = await supabase
    .from
    ('courses')
    .insert
      ([courses])
    .select();
    
    
    if(error){
      console.log(error);
    // aqui vm os tratamentos da variavel error 
    return[]   
    }

    return data

}     

async function upadateCourse(courses:iCourses) {
  const{id, ...fieldsToUpdate} = courses;
  const {data, error} = await supabase
  .from ('courses')
  .update(fieldsToUpdate)
  .eq('id', courses.id)
  .select();

  if (error){
    console.log("Erro ao atualizar curso:", error);
    return[];
  }
  console.log("Curso atualizado com sucesso:", data)
  return data;
}

async function deleteCourse(id: number){
  const {data, error} = await supabase
  .from('courses')
  .delete()
  .eq('id',id)
  .select();

  if (error){
    console.log("Erro ao deletar curso:", error)
    return[];
  }
  return data;

}

export {setCoursebd, upadateCourse, deleteCourse, iCourses}