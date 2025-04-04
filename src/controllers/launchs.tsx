import React, { useState } from 'react';
import { supabase } from '../utils/supabase';



interface iLaunch {
    id: number,
    observation: string,
    presence: boolean,
    indicator: string,
    note: string,
    created_at: string,
    userId: number,
    students_id: number,
    class_id: number,
    employees_id: number,
}


const [launchs, setLaunchs] = useState<iLaunch[]>([]);

async function setLaunch(launch: iLaunch) {
    //aqui vem os tratamentos de regex ou do modelo de negócio antes de inserir
    const observationRegex = /^[\w\sáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ.,;:!?()'"-]{1,1000}$/;
    const presenceRegex = /^(true|false)$/i;  // Para boolean (aceita "true" ou "false")
    const indicatorRegex = /^[A-Z0-9_]{1,20}$/;  // Ex: "INDICATOR_01"
    const noteRegex = /^[\w\sáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ.,;:!?()'"-]{1,500}$/;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;  // Formato YYYY-MM-DD


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

export {setLaunch, launchs, setLaunchs}