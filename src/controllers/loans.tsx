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


async function setLoanbd(loans: iLoans) {
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

async function deleteLoansById(id: number) {
    const { error } = await supabase
        .from('loans')
        .delete()
        .eq('id', id)

    if (error) {
        console.error("Erro ao deletar usuário:")
        return false
    }

    return true
}


async function updateLoansById(id: number, updatedUser: Partial<iLoans>) {
    const { error } = await supabase
        .from('loans')
        .update(updatedUser)
        .eq('id', id);

    if (error) {
        console.error("Erro ao atualizar usuário:", error.message);
        return false;
    }
    return true;
}


export {setLoanbd, iLoans}
