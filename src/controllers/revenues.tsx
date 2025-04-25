import React, { useState } from 'react';
import { supabase } from '../utils/supabase'


interface iRevenue{
    id: number;
    created_at: string;
    name: string;
    description: string;
    url: string;
    value: string;
    scholarship_status: string;
    discount_percentage: string;
    user_id: number;
}





function toListRevenues(data:iRevenue[]) {
   const resp : {key:Number,option:string}[]=[]

   data.map((r)=>{
    resp.push({key: r.id,option: r.name})
   })
   return resp
}





async function getRevenues(params:any) {
    const {data: todos, error} = await supabase.from('revenues').select();
    
    if (error)
        return {status: false, error: error}
    
    return {status:true, data: todos}
    
}

// aqui estamos carregando os alunos




async function  setRevenue(revenue:iRevenue ){
    // aqui vem os tratamnetos de regex ou do modelo de negocio antes de inserir
   
      //* Regex definitions
    

 //*

    const { data, error } = await supabase
    .from('revenues')
    .insert([revenue])
    .select()

   
   
    if (error){
 // aqui vem os tratamentos da variavel error


        return error
    }

    return data
}

async function deleteRevenue(id: number) {
    try {
        // Validação do ID
        const idRegex = /^\d+$/;
        if (!idRegex.test(String(id))) {
            return { error: { message: "ID inválido" } };
        }

        const { error } = await supabase
            .from('revenues')
            .delete()
            .eq('id', id);

        if (error) {
            return { error };
        }

        return { success: true };
        
    } catch (error) {
        return { 
            error: { 
                message: error instanceof Error ? error.message : 'Erro desconhecido' 
            } 
        };
    }
}


async function updateRevenue(revenue: iRevenue) {
    try {
        // Validações (reutilize as mesmas validações da função setRevenue)
        const idRegex = /^\d+$/;
        if (!idRegex.test(String(revenue.id))) {
            return { error: { message: "ID inválido" } };
        }

        // Adicione aqui as outras validações conforme necessário...

        const { data, error } = await supabase
            .from('revenues')
            .update( revenue
                
                // Não atualize created_at e user_id normalmente
            )
            .eq('id', revenue.id)  // Atualiza onde o ID corresponde
            .select();  // Retorna o registro atualizado

        if (error) {
            return { error };
        }

        return { data: data[0] };  // Retorna o primeiro item do array
        
    } catch (error) {
        return { 
            error: { 
                message: error instanceof Error ? error.message : 'Erro desconhecido ao atualizar' 
            } 
        };
    }
}





export {setRevenue, iRevenue, deleteRevenue, updateRevenue, getRevenues, toListRevenues }