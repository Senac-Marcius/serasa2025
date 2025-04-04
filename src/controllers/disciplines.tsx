import React, { useState } from 'react';
import { supabase } from '../utils/supabase'

interface iDisciplines {
    id: number; 
    name: string; 
    url: string; 
    workload: string;      
    createdAt: string; 
    teacher: string ;
}

const [disciplines, setDisciplines] = useState<iDisciplines[]>([]);

  
  async function SetDisciplinebd(disciplines:iDisciplines){
  const { data, error } = await supabase.from('disciplines')
.insert([
  disciplines
])
.select()

//aqui vem os tratamentos de variavel error
if(error){
    console.log('Preencha todos os dados!')

    return {}
}

return data


}

export {setDisciplines, SetDisciplinebd, disciplines}
        