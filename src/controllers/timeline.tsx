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
    
    const urlRegex = /^(https?:\/\/)?([a-z0-9]+(\.[a-z0-9]+)+)(\/[a-z0-9#?&%=]*)?$/i;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/


    if (!urlRegex.test(req.url)) {
        return "Campo url deve conter o formato https:siteorganizador";
    }

    if (!dateRegex.test(req.date)) {
        return "Campo deve conter o formato yyyy-mm-dd";
    }

    if (!timeRegex.test(req.beginning)) {
        return "Campo deve conter o formato 13:00";
    }

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
          