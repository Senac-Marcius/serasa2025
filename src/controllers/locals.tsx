import React, { useState } from 'react';
import { supabase } from '../utils/supabase' 

interface iLocal{
    id: number,
    name: string,
    dimension: string,
    description: string,
    adress: string,
    created_at: string,
}


async function setLocal(local:iLocal){
  //aqui vem os tratamentos de regex ou modelo de negócio antes de inserir

const { data, error } = await supabase.from('locals')
  .insert([
      local
  ])
  .select()


  if(error){
     //aqui vem os tratamentos da variável error, se der algum problema=>
    console.log(error)
    return []
}      

    return data

}

export {setLocal, iLocal}




