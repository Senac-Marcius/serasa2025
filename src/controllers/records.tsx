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
    userId: number,
    createAt: string,

}  


    const [records, setRecords] = useState<iRecord[]>([]);

    

    async function  setRecord (record:iRecord){
        //aqui vem tratamentos de regex ou modelo de negócio antes de inserir 

        const { data, error } = await supabase.from('records')
        .insert([
            record 
    ])
    .select()

    if (error){
            //tratamento da variável error

        return []


    }

    return data

}

export {setRecords, records , setRecord}

