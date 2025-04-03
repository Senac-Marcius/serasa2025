import React, { useState, Children } from 'react';
import { supabase } from '../utils/supabase'

interface iexpenses {
    contact: string,
    name: string,
    email: string,
    description: string,
    id: number,
    cost: string,
    creatAt: string,
    userId: number,
}

const [expense,setExpenses] = useState< iexpenses[]>([]) 

async function setExpense (expense:iexpenses){
    // aqui vem os tratamentos de regex ou do modelo de negócio antes de inserir
    const { data, error } = await supabase.from('expenses')
    .insert([
        {expense},
    ])
    .select()

    if(error){
        //aqui vem os tratamentos de variável error
        return[]
    }

    return data
}

export{setExpense}