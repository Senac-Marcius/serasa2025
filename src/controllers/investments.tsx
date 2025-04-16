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



async function setInvestment(investment: iInvestment) {
    /*console.log('Enviando para Supabase:', investment);*/

    try {
        const { data, error } = await supabase
            .from('investments')
            .insert([investment])
            .select();

        /*console.log('Resposta do Supabase:', { data, error });*/

        if (error) {
            console.error('Erro ao cadastrar investimento no Supabase:', error);
            return [];
        }

        return data;
    } catch (e) {
        console.error('Exceção ao tentar inserir no Supabase:', e);
        return [];
    }
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

export {setInvestment, deleteInvestment, updateInvestment, iInvestment}