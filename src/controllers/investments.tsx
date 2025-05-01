import React, { useState } from 'react';
import { supabase } from '../utils/supabase'

interface iInvestment {
    name: string,
    description: string,
    url: string,
    id: number,
    created_at: string,
    user_id: number,
    value: number,
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

function toListInvestment(data: iInvestment[]) {
    const resp : {key: number, option:string}[] = []

    data.map((i)=>{
        resp.push({key: i.id,option: i.name})
        })
        return resp
    }


async function getInvestment(params: any) {
    const { data: all, error } = await supabase.from('investments').select();

    if (error) 
        return { status: false, error: error}
        
    return{status:true, data: all}
    
    }



async function deleteInvestment(id: number) {
    const { error } = await supabase
        .from('investments')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Erro ao excluir investimento:', error.message);
        return false; 
    }
    return true
}

async function updateInvestment(updatedInvestment: iInvestment) {
    try {
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

export {setInvestment, deleteInvestment, updateInvestment, getInvestment, toListInvestment, iInvestment}