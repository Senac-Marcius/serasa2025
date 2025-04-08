import React, {useState} from 'react'
import { supabase } from '../utils/supabase'
  
  interface iLevels{
        name: string,
        description: string,
        color: string,
        id: number,
        created_at: string,
       
}


async function setLevel(level: iLevels): Promise < iLevels[] | []> {

    for (const iLevels in level) {
        if (typeof level[ iLevels ] === 'string') {
            level[ iLevels ] = level[ iLevels ].trim(); // remove espaços no começo/fim
        }
    }

    const { data, error } = await supabase
        .from('levels')
        .insert([level])
        .select();

    if (error) {

        // Tratamento do erro
        console.error('Erro ao inserir nível:', error.message);
        return [];
    }

    return data as iLevels[];
}

export { setLevel };





//async function setLevel(level:iLevels){
    //*aqui vem os tratamento os tratamentos de regex ou do modelo de negócio antes de inserir.
    //const { data, error } = await supabase.from('levels')
    //.insert([ level

    //*{some_column: 'someValue', other_column: 'otherValue'},


   // ])
    //.select()

   // if (error){

        //*aqui vem os tratamentos da variavel error.
        
      //  return[]
   // }

   // return data
//}
//export {setLevel, iLevels} 












































