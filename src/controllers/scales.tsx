import React, {useState} from 'react'; //Importa o react e atualiza a lista Automaticamente.
import { supabase } from '../utils/supabase'

interface iScale {
    id:number,
    day: string,
    starttime:string,
    endtime:string,
    creatAt: string,
    userId: number,
}

const [scales, setScales] = useState<iScale[]>([]);

async function setScale(scale:iScale){
    
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Valida formato HH:mm

    if (!timeRegex.test(scale.starttime) || !timeRegex.test(scale.endtime)) {
        console.error("Erro: Formato de horário inválido!");
        return [];
    }

    const { data, error } = await supabase
    .from('scales')
    .insert([
      scale,
    ])
    .select()

    if(error){
        console.error("Erro ao inserir escala:", error);
        return[]
    }
    
    return data
}

export{setScale}