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
    //Tratamento de Regex antes de inserir

    const { data, error } = await supabase
    .from('scales')
    .insert([
      scale,
    ])
    .select()

    if(error){
        //Aqui vem a variavel erro
        
        return[]
    }
    
    return data
}

export{setScale}