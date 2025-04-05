import React, { useState } from 'react';  
import { supabase } from '../utils/supabase';

interface iRecord {
    id: number
    name: string,
    description: string,
    sick: string,
    health: string,
    allergy: string,
    medication: string,
    user_id: number,
    create_at: string,

}  


    

    

    async function  setRecord (record:iRecord){
        //aqui vem tratamentos de regex ou modelo de negócio antes de inserir 

        const { data, error } = await supabase.from('records')
        .insert([
            record 
    ])
    .select()

    if (error){
            //tratamento da variável error
            console.error('Erro ao buscar records: ', error);

        return []


    }

    return data

}

export {setRecord, iRecord}

