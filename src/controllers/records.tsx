import React, { useState } from 'react';  
import { supabase } from '../utils/supabase';
import { iLaunch } from './launchs';



export interface iRecord {
    id: number,
    cpf: number,
    name: string,
    description: string,
    sick: string,
    health: string,
    allergy: string,
    medication: string,
    user_id: number,
    create_at: string,

}  

export function toListRecord (data: iRecord[]) {
    const resp: {key:number, option: string} [] = [];

    data.map ((r) => {
        resp.push({key: r.id, option: r.name})
     })

return resp;

}

// CRIAR REGISTRO
export async function setRecord(record: iRecord) {
    // Aqui você pode aplicar regex ou regras de negócio antes de inserir

    const { data, error } = await supabase
        .from('records')
        .insert([record])
        .select();

    if (error) {
        console.error('Erro ao inserir record: ', error);
        return [];
    }

    return data;
}

// BUSCAR TODOS OS REGISTROS
export async function getRecords(params: any ) {
    const { data: todos, error } = await supabase.from('records').select();

    if (error) {
        console.error('Erro ao buscar records: ', error);
        return {status: false, error:error };
    }

    return {status: true, data: todos};
}

// ATUALIZAR REGISTRO
export async function updateRecord(record: iRecord) {
    const { error } = await supabase
        .from('records')
        .update({
            name: record.name,
            cpf: record.cpf,
            description: record.description,
            sick: record.sick,
            health: record.health,
            allergy: record.allergy,
            medication: record.medication,
            user_id: record.user_id,
        })
        .eq('id', record.id);

    return error;
}

// DELETAR REGISTRO
export async function deleteRecord(id: number) {
    const { error } = await supabase.from('records').delete().eq('id', id);
    return error;
}

