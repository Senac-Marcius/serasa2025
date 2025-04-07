import { supabase } from '../utils/supabase'

interface iDisciplines {
    id: number; 
    name: string; 
    url: string; 
    workload: number;      
    created_at: string; 
    teacher: string ;
}

  
async function SetDisciplinebd(disciplines:iDisciplines){
  console.log('chamou')

  const { data, error } = await supabase.from('disciplines')
  .insert([
    disciplines
  ])
  .select()

//aqui vem os tratamentos de variavel error
  if(error){
    console.log(error)

    return {}
  }

  return data
}

export {SetDisciplinebd, iDisciplines}
        