import React, { useState } from 'react';
import { supabase } from '../utils/supabase';



interface iTimeline {
    id: number,
    url: string,
    class_id: number,
    discipline: string,
    local_id: number,
    start_time: string,
    end_time: string,
    created_at: string,
}




async function setTimeline(timeline:iTimeline){
    //aqui vem os tratamentos do regex ou do modelo de negocio antes de inserir
    /*
    const urlRegex= /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
    const classRegex = /^[a-zA-Z0-9\s\-_]+$/;
    const disciplineRegex = /^[a-zA-ZÀ-ÿ\s\-']+$/;
    const locationRegex = /^[a-zA-Z0-9\s\-,.]+$/;
    const start_timeRegex= /^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
    const end_timeRegex= /^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;



if (!urlRegex.test(timeline.url)) {
    return "URL deve seguir o formato válido (ex: http://exemplo.com)";
}

if (!classRegex.test(timeline.class)) {
    return "Classe deve conter apenas letras, números, espaços, hífens ou underscores";
}


if (!disciplineRegex.test(timeline.discipline)) {
    return "Disciplina deve conter apenas caracteres válidos";
}

if (!locationRegex.test(timeline.location)) {
    return "Localização contém caracteres inválidos";
}

if (!start_timeRegex.test(timeline.start_time)) {
    return "Hora de início deve estar no formato HH:MM (24h)";
}

if (!end_timeRegex.test(timeline.end_time)) {
    return "Hora de término deve estar no formato HH:MM (24h)";
}

if (!dateRegex.test(timeline.createAt)) {
    return "Data de criação deve estar no formato YYYY-MM-DD";
}*/

const { data, error } = await supabase
  .from('timelines')
  .insert([
    timeline
    
  ])
  .select()

  if(error){
    console.log('erro ao inserir o lançamento')
    console.log(error)
    //aqui vem os tratamentos da variavel error

    return[]
  }

return data

}

export {setTimeline, iTimeline}
