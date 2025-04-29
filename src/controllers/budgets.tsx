import React, { useState } from 'react';
import { supabase } from '../utils/supabase';
 
interface iBudgets{
    id: number;
    name: string;
    url: string;
    created_at: string;
    user_id: number;
    value: string;
    start_date: string;
    end_date: string;
}
 
    function tulistBudgets(data: iBudgets[]){
        const resp: {key: Number, option: string}[]=[];

        data.map((b) =>{
        resp.push ({key: b.id, option: b.name})
        })
        
    }

// Estado para a lista de receitas

async function getBudgets(params:any){
    const {data: todos, error} = await supabase.from('budgets').select()

   if(error)
    return { status: false, error: error}

   return {status: true, data: todos}
}
 
 
async function  setBudget(budget:iBudgets ){
    // aqui vem os tratamnetos de regex ou do modelo de negocio antes de inserir
       // Regex definitions

    const nameRegex =/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s-]{2,100}$/;
    //const urlRegex =/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    const valueRegex = /^\d+(\.\d{1,2})?$/;
    const startDateRgex = /^\d{4}-\d{2}-\d{2}$/;
    const endDateRegex = /^\d{4}-\d{2}-\d{2}$/; 
        
    if (!nameRegex.test(budget.name)) {
        return "Campo name deve conter apenas letras, espaços ou hífens (2-100 caracteres)";
    }
 
    /*if (!urlRegex.test(budget.url)) {
        return "Campo url deve conter o seguinte formato https://dominio";
    }*/
 
    if (!valueRegex.test(budget.value)) {
        return "Campo value deve ser um valor monetário (ex: '100', 'R$ 50,00')";
    }
    /*if (!startDateRgex.test(budget.create_at)) {
        return "Campo createAt deve conter o seguinte formato YYYY-MM-DD";
    }
    if (!endDateRegex.test(budget.create_at)) {
        return "Campo createAt deve conter o seguinte formato YYYY-MM-DD";
    }*/
 
 
    const { data, error } = await supabase
    .from('budgets')
    .insert([
        budget
    ])
    .select()
 
    
   
    if (error){

 
        return[]
    }
 
    return data
    
}


 async function deleteBudget(id: number): Promise<{ error?: Error }> {
    try {
        const { error } = await supabase
            .from('budgets')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Erro ao deletar:', error);
            return { error: new Error('Falha ao deletar no Supabase') };
        }

        return {}; // Sucesso
    } catch (err) {
        console.error('Erro inesperado:', err);
        return { error: err instanceof Error ? err : new Error('Erro desconhecido') };
    }

}

async function updateBudget(budget: iBudgets): Promise<iBudgets[] | string> {
 
    const nameRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s-]{2,100}$/;
    const valueRegex = /^\d+(\.\d{1,2})?$/;

    if (!nameRegex.test(budget.name)) {
        return "Nome inválido (2-100 caracteres, apenas letras, espaços ou hífens)";
    }

    if (!valueRegex.test(budget.value)) {
        return "Valor deve ser numérico (ex: 100 ou 50.00)";
    }

   
    const { data, error } = await supabase
        .from('budgets')
        .update({
            name: budget.name,
            url: budget.url,
            value: budget.value,
            start_date: budget.start_date,
            end_date: budget.end_date,
            user_id: budget.user_id
        })
        .eq('id', budget.id) 
        .select();

    if (error) {
        console.error('Erro ao atualizar:', error);
        return error.message;
    }

    return data || [];
}
 
export { iBudgets, setBudget, deleteBudget, updateBudget, getBudgets, tulistBudgets}