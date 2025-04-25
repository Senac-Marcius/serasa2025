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
      const idRegex = /^\d+$/;
    const descriptionRegex = /^[\w\s.,!?-]{1,500}$/;
    const nameRegex = /^[A-Za-zÀ-ÿ\s-]{2,100}$/;
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    const created_atRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T\d{2}:\d{2}:\d{2}/;
    const valueRegex = /^(R\$\s*)?\d+(,\d{2})?$/;
    const scholarship_statusRegex = /^(ativo|inativo|pendente)$/;
    const discount_percentageRegex = /^(100|\d{1,2}(,\d+)?)$/;

    // Validation checks
    if (!idRegex.test(String(revenue.id))) {
        return "Campo id deve conter apenas números";
        
    }

    if (!descriptionRegex.test(revenue.description)) {
        return "Campo description deve ter entre 1 e 500 caracteres (letras, números ou pontuação básica)";
    }

    if (!nameRegex.test(revenue.name)) {
        return "Campo name deve conter apenas letras, espaços ou hífens (2-100 caracteres)";
    }

    if (!urlRegex.test(revenue.url)) {
        return "Campo url deve conter o seguinte formato https://dominio";
    }

    if (!created_atRegex.test(revenue.created_at)) {
        return "Campo createAt deve conter o seguinte formato YYYY-MM-DD";
    }

    if (!idRegex.test(String(revenue.user_id))) {
        return "Campo userId deve conter apenas números";
    }

    if (!valueRegex.test(revenue.value)) {
        return "Campo value deve ser um valor monetário (ex: '100', 'R$ 50,00')";
    }

    if (!scholarship_statusRegex.test(revenue.scholarship_status)) {
        return "Campo scholarshipStatus deve ser 'ativo', 'inativo' ou 'pendente'";
    }

    if (!discount_percentageRegex.test(revenue.discount_percentage)) {
        return "Campo discountPercentage deve ser uma porcentagem válida (0% a 100%)";
    }
    

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