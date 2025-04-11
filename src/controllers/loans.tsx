import React, { useState } from 'react';
import { supabase } from '../utils/supabase'
import { error } from 'console';


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

async function getLoans(params: any) {
    const { data: todos } = await supabase.from('loans').select();

    if (error)
        return {status: false, error: error}

    return {status:todos, data: todos}
}

async function setLoanbd(loan: iLoans) {
    const { data, error } = await supabase.from('loans')
        .insert([
            loan
        ])
        .select()

    if (error) {
        //aqui vem os tratamentos da variável error
        console.log(error)


        return []
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


async function updateLoansById(id: number, updatedLoans: Partial<iLoans>) {
    const { error } = await supabase
        .from('loans')
        .update(updatedLoans)
        .eq('id', id);

    if (error) {
        console.error("Erro ao atualizar usuário:", error.message);
        return false;
    }
    return true;
}


export { setLoanbd, iLoans, deleteLoansById, updateLoansById, getLoans }
