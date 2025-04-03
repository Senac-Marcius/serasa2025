import React, {useState} from 'react'
import { supabase } from '../utils/supabase'
  
  interface iLevels{
    name: string,
        description: string,
        color: string,
        id: number,
        createAt: string,
        userId: number,
        }



  const [levels,setLevels] = useState<iLevels[]>([])//a chave recebe a lista que esta sendo declarada na interface.

async function setLevel(level:iLevels){
    //*aqui vem os tratamento os tratamentos de regex ou do modelo de negócio antes de inserir.
    const { data, error } = await supabase.from('levels')
    .insert([ level
    //*{some_column: 'someValue', other_column: 'otherValue'},
    ])
    .select()

    if (error){
        //*aqui vem os tratamentos da variavel error.
        return[]
    }

    return data
}
export {setLevels}









































