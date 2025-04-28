import React, { useState } from 'react';
import { supabase } from '../utils/supabase'


interface iIten {
    id: number,
    mark: string,
    asset_number: string,
    amount: number, 
    description: string,
    category_id: number,
    product_id: number,
    local_id: number,
    products_id: number;
    created_at:string
}
function toListItens(data:iIten[]){
    const resp: {key: number, option: string}[]=[];
    data.map((i) =>{
        resp.push({key: i.id, option: i.asset_number})

        })


 }


async function getItens(params:any) {
    const {data: todos,error} = await supabase.from('itens').select();


    if(error)
            return {status:false,error: error}

        return{status: true,data: todos}
}


async function setIten(iten: iIten) {
    // Aqui você pode adicionar tratamentos de regex ou validações de modelo de negócios antes de inserir
    const { data, error } = await supabase
        .from('items')
        .insert([iten])
        .select();

    if (error) {
        // Tratar erro, se ocorrer
        console.error('Erro ao adicionar item:');
        return [];
    }

    return data;
}

// Função para excluir um item baseado no id
async function dell(itenId: number) {
    const { data, error } = await supabase
        .from('items')
        .delete()
        .eq('id', itenId)
        .select();

    if (error) {
        // Tratar erro, se ocorrer
        console.error('Erro ao excluir item');
        return null;
    }

    return data;
}

// Função para editar um item baseado no id
async function edit(iten: iIten) {
    const { data, error } = await supabase
        .from('items')
        .update(iten)
        .eq('id', iten.id)
        .select();

    if (error) {
        // Tratar erro, se ocorrer
        console.error('Erro ao editar item');
        return null;
    }

    return data;
}

export { setIten, dell, edit, iIten, getItens,toListItens};