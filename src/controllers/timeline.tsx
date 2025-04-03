import React, { useState } from 'react';
import { supabase } from '../utils/supabase';


interface iTimeline {
    id: number,
    url: string,
    class: string,
    userId: number,
    discipline: string,
    location: string,
    start_time: string,
    end_time: string,
    createAt: string,
}


const [timelines, setTimelines] = useState<iTimeline[]>([]);


async function setTimeline(timeline:iTimeline){
    //aqui vem os tratamentos do regex ou do modelo de negocio antes de inserir
const { data, error } = await supabase
  .from('timeline')
  .insert([
    timeline
    
  ])
  .select()

  if(error){
    //aqui vem os tratamentos da variavel error

    return[]
  }

return data

}

export {setTimeline}
          