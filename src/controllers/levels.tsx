import React, {useState} from 'react'
import { supabase } from '../utils/supabase'
  export interface iLevels{
        name: string,
        description: string,
        color: string,
        id: number,
        created_at: string,
       
    }

export async function setLevels(levels:iLevels){

    //*aqui vem os tratamento de regex ou do modelo de negócio antes de inserir.

    const { data, error } = await supabase.from('levels')
    .insert([ levels, {some_column: 'someValue', other_column: 'otherValue'},

        ]) .select()

    if (error){
        console.error('Erro ao inserir levels: ', error);
        return[]
    }
    }

        // BUSCAR TODOS OS REGISTROS

        export async function getLevels() {
        
        const { data, error } = await supabase.from('levels').select();
 
        if (error) {

            console.error('Erro ao buscar levels: ', error);

        return [];
        }
 
        return data;
    }
 
        // ATUALIZAR REGISTRO

        export async function updateLevels(levels: iLevels) {
        const { error } = await supabase
        .from('levels')
        .update({
        name: levels.name,
        description: levels.description,
        color: levels.color,
        id:levels.id,
        created_at: levels.created_at,
           
   })
        .eq('id', levels.id);
 
        return error;

    }
 
        // DELETAR REGISTRO
        export async function deleteLevels(id: number) {
        const { error } = await supabase.from('levels').delete().eq('id', id);
        return error;
        }