  import React, {useState} from 'react'
  import { supabase } from '../utils/supabase'
  
  interface iParent{
    Nome: string,
    Email: string,
    parentesco: string,
    id: number,
    createAt: string,
    userId: number,
  }



  const [parents,setParents] = useState<iParent[]>([])//a chave recebe a lista que esta sendo declarada na interface.

async function setParent(parent:iParent){
    //aqui vem os tratamento os tratamentos de regex ou do modelo de negó´cio antes de inserir
    const { data, error } = await supabase.from('parents')
    .insert([ parent
    // { some_column: 'someValue', other_column: 'otherValue' },
    ])
    .select()

    if (error){
        //aqui vem os tratamentos da variavel error
        return[]
    }

    return data
}
export {setParent}