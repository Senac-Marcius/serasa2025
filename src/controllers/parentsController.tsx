  import React, {useState} from 'react'
  import { supabase } from '../utils/supabase'
  
  interface iParent{
    id: number,
      name: string,
      rg:string,
      cpf:string,
      age:string,
      phone:string,
      e_mail: string,
      kinship: string,
      create_at: string,
      user_id: 0,
  }



  const [parents,setParents] = useState<iParent[]>([])//a chave recebe a lista que esta sendo declarada na interface.

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
export {setParentController, parents, setParents}
