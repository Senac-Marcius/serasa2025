import React, { useEffect, useState } from 'react';
import { iLoans, setLoanbd,deleteLoansById,updateLoansById, getLoans } from '../../src/controllers/loans'
import { supabase } from '../../src/utils/supabase';





export default function loansEmployee() {
const [loans, setLoans] = useState<iLoans[]>([]);

useEffect(() => {
    async function getTodos() {
        const retorno = await getLoans ({})
        if (retorno.status && retorno.data && retorno.data.length > 0) {
            setLoans(retorno.data)
        }
    }
    getTodos()

}, [])

  async function getItemsWithFilter(
        search: string,
        selectFilter: string,
        subject: string,
        year: string,
        responsible: string,
        edition: string

    ) {


        let query = supabase
            .from('items_librarie')
            .select('*');

        if (search) {
            query = query.or(
                `title.ilike.%${search}%,summary.ilike.%${search}%,subject.ilike.%${search}%,responsible.ilike.%${search}%`
            );
        }
        if (selectFilter && selectFilter !== 'Todos') query = query.eq('categoria', selectFilter);
        if (subject !== 'Todos') query = query.eq('subject', subject);
        if (year !== 'Todos') query = query.eq('typology', year);
        if (responsible !== 'Todos') query = query.eq('responsible', responsible);
        if (edition !== 'Todos') query = query.eq('edition', edition);

        const { data, error } = await query;

        if (error) {
            console.error("Erro ao buscar items:", error);
        }

        return data || [];
    }
}