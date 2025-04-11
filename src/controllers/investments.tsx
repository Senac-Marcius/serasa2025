import React, { useState } from 'react';
import { supabase } from '../utils/supabase'

interface iInvestment {
    description: string,
    url: string,
    name: string,
    id: number,
    created_at: string,
    user_id: number,
    value: string,
}

function toListInvestment(data: iInvestment[]) {
    const resp: {key: number, option: string}[] = [];

    data.map((i) =>{
        resp.push()
        resp.push({ key: i.id, option: `${i.created_at} - ${i.name} - ${i.value}`})
        })
    return resp;
}


async function getInvestments (params:any) {
    const { data: all, error } = await supabase.from('investments').select();

    if (error) 
        return {status: false, error: error};
    
    return {status: true, data: all};
}

async function setInvestment(investment:iInvestment){
    //aqui vem os tratamentos de regex ou do modelo de negocio antes de inserir
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    const dateRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?)?$/;
    const nameRegex = /^[a-zA-Z0-9\sáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]{2,100}$/;
    const valueRegex = /^\d+(\.\d{1,2})?$/;

    if (!urlRegex.test(investment.url)) {
        return ('URL inválida');
    }
    if (!dateRegex.test(investment.created_at)) {
        throw ('Data de criação inválida');
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

async function deleteInvestment(id: number) {
    const { error } = await supabase
        .from('investments')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Erro ao excluir investimento:', error);
        return []; 
    }
    return `Investimento com ID ${id} excluído com sucesso.`;
}

async function updateInvestment(updatedInvestment: iInvestment) {
    try {

        if (!updatedInvestment.id) {
            throw new Error('ID do investimento é obrigatório para atualização');
        }

        const { data, error } = await supabase
            .from('investments')
            .update({
                description: updatedInvestment.description,
                url: updatedInvestment.url,
                name: updatedInvestment.name,
                value: updatedInvestment.value,
                created_at: updatedInvestment.created_at,
                user_id: updatedInvestment.user_id
            })
            .eq('id', updatedInvestment.id)
            .select()
            .single();

        if (error) {
            throw error;
        }

        if (!data) {
            throw new Error('Nenhum dado retornado após atualização');
        }

        return data;
    } catch (error) {
        console.error('Erro ao atualizar investimento:', error);
        throw error instanceof Error ? error : new Error('Erro desconhecido ao atualizar investimento');
    }
}

export {setInvestment, deleteInvestment, updateInvestment, getInvestments, toListInvestment,  iInvestment}