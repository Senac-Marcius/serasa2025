import React, { useState } from 'react';
import { supabase } from '../utils/supabase' 

interface iLocal{
    id: number,
    name: string,
    area: string,
    description: string,
    adress: string,
    createAt: string,
}

const [locals, setLocals] = useState<iLocal[]>([])              

async function setLocal(local:iLocal){
  //aqui vem os tratamentos de regex ou modelo de negócio antes de inserir

const { data, error } = await supabase.from('locals')
  .from('locals')
  .insert([
      local
  ])
  .select()


  if(error){
     //aqui vem os tratamentos da variável error, se der algum problema=>

    return []
}      

    return data

}

export {setLocal}




