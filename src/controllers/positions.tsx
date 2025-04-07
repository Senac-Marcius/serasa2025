import React, { useState } from "react";
import { supabase } from '../utils/supabase'
import { Timestamp } from "react-native-reanimated/lib/typescript/commonTypes";

interface iPosition {
    id:number,
    name: string;
    description: string;
    salary: number;
    work_hours: string;
    departament: string;
    supervisor: string;
    creat_at: string;
}



async function setPosition (position: iPosition) {

//aqui é tratamento antes  de inserir (regex)
    try{

        const { data, error } = await supabase
            .from('positions')
            .insert([position])
            .select()


//aqui é tratamento da var error
        if (error) {
            console.error('Erro ao inserir no supabase', error.message);
            throw new Error(error.message)
        }

        return data
    } catch (err){
        console.error('Erro geral setPosition', err);
        return null
    }
}
export{setPosition, iPosition}
