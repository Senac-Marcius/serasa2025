import React, { useState } from "react";
import { supabase } from '../utils/supabase'

interface iPosition {
    id:number,
    name: string;
    description: string;
    salary: number;
    workHours: string;
    departament: string;
    supervisor: string;
    creatAt: string;
}

const [positions, setPositions] = useState<iPosition[]>([]);

async function setPosition (position: iPosition) {

//aqui é tratamento antes  de inserir (regex)

    const { data, error } = await supabase
        .from('positions')
        .insert([
            position
        ])
        .select()


//aqui é tratamento da var error
        if (error) {

           return console.log('Erro', error);
        }

        return data
}
export{setPosition, positions, setPositions}
