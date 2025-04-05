  import React, {useState} from 'react'
  import { supabase } from '../utils/supabase'
  
  interface iParent{
      id: number,
      name: string,
      rg:string,
      cpf:string,
      age:string,
      phone:string,
      email: string,
      kinship: string,
      createat: string,
      userid: number,
  }



  

async function setParentController(parent:iParent){
    //aqui vem os tratamentos de regex ou do modelo de negó´cio antes de inserir
    const { data, error } = await supabase.from('parents')
    .insert([ parent
    // { some_column: 'someValue', other_column: 'otherValue' },
    ])
    .select()

    if (error){
        //aqui vem os tratamentos da variavel error.
        return[]
    }

    return data
}
export {setParentController, iParent }
