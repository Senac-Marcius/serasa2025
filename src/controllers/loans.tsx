import React, { useState } from 'react';
import { supabase } from '../utils/supabase'


interface iLoans {
    id: number,
    bookId: string,
    loanDate: string,
    expectedLoanDate: string,
    effectiveLoanDate: string,
    renewal: string,
    creatAt: string,
    statusLoan: string,
    observation: string,
}

const [loans, setLoans] = useState<iLoans[]>([]);


async function setLoan(loans: iLoans) {
    const { data, error } = await supabase.from('loans')
    .insert([
        loans
    ])
    .select()
    
    if(error){
         //aqui vem os tratamentos da variável error

         return[]
    }

    return data
}    

export {setLoan}