import React, { useState } from 'react';
import { supabase } from '../utils/supabase'

interface iInvestment {
    description: string,
    url: string,
    name: string,
    id: number,
    created_at: string,
    user_id: string,
    value: string,
}

const [investments, setInvestments] = useState<iInvestment[]>([]);

async function setInvestment(investment:iInvestment){
    //aqui vem os tratamentos de regex ou do modelo de negocio antes de inserir
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    const dateRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?)?$/;
    const user_idRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const nameRegex = /^[a-zA-Z0-9\sáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]{2,100}$/;
    const valueRegex = /^\d+(\.\d{1,2})?$/;

    if (!urlRegex.test(investment.url)) {
        return ('URL inválida');
    }
    if (!dateRegex.test(investment.created_at)) {
        throw ('Data de criação inválida');
    }
    if (!user_idRegex.test(investment.user_id)) {
        throw ('ID de usuário inválido');
    }
    if (!nameRegex.test(investment.name)) {
        throw ('Nome inválido');
    }
    if (!valueRegex.test(investment.value)) {
        throw ('Valor inválido');
    }

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

export {setInvestment, investments, setInvestments}