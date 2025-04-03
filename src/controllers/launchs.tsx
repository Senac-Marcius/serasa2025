import React, { useState } from 'react';
import { supabase } from '../utils/supabase';



interface iLaunch {
    id: number,
    observation: string,
    presence: boolean,
    indicator: string,
    note: string,
    createAt: string,
    userId: number,
}


const [launchs, setLaunchs] = useState<iLaunch[]>([]);

async function setLaunch(launch: iLaunch) {
    //aqui vem os tratamentos de regex ou do modelo de negócio antes de inserir
const { data, error } = await supabase.from('launchs')
  .insert([
   launch
  ])
  .select()

  if(error){
//aqui vem os tratamentos da variavel error 


return[]
  }

  return data

}

export {setLaunch}