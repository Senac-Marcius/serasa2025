import React, { useState } from 'react';
import { supabase } from '../utils/supabase'

interface iInvestment {
    description: string,
    url: string,
    name: string,
    id: number,
    createAt: string,
    userId: string,
    value: string,
}

const [investments, setInvestments] = useState<iInvestment[]>([]);

async function setInvestment(investment:iInvestment){
    //aqui vem os tratamentos de regex ou do modelo de negocio antes de inserir
    const { data, error } = await supabase
    .from('investments')
    .insert([
    investment
    ])
    .select()
    

    if(error){
        //aqui vem os tratamentos de variavel error


        return []
    }
    return data
}

export {setInvestment}