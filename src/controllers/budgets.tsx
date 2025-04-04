import React, { useState } from 'react';
import { supabase } from '../utils/supabase';
 
interface iBudgets{
    id: number;
    name: string;
    url: string;
    create_at: string;
    user_id: number;
    value: string;
    start_date: string;
    end_date: string;
}
 
 
// Estado para a lista de receitas

 
 
 
async function  setBudget(budget:iBudgets ){
    // aqui vem os tratamnetos de regex ou do modelo de negocio antes de inserir
       // Regex definitions

    const idRegex = /^\d+$/;
    const nameRegex =/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s-]{2,100}$/;
    const urlRegex =/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    const valueRegex = /^\d+(\.\d{1,2})?$/;
    const startDateRgex = /^\d{4}-\d{2}-\d{2}$/;
    const endDateRegex = /^\d{4}-\d{2}-\d{2}$/;            
      
    // Validation checks
    if (!idRegex.test(String(budget.id))) {
        return "Campo id deve conter apenas números";
    }
 
    if (!nameRegex.test(budget.name)) {
        return "Campo name deve conter apenas letras, espaços ou hífens (2-100 caracteres)";
    }
 
    if (!urlRegex.test(budget.url)) {
        return "Campo url deve conter o seguinte formato https://dominio";
    }
 
    if (!idRegex.test(String(budget.user_id))) {
        return "Campo userId deve conter apenas números";
    }
 
    if (!valueRegex.test(budget.value)) {
        return "Campo value deve ser um valor monetário (ex: '100', 'R$ 50,00')";
    }
    if (!startDateRgex.test(budget.create_at)) {
        return "Campo createAt deve conter o seguinte formato YYYY-MM-DD";
    }
    if (!endDateRegex.test(budget.create_at)) {
        return "Campo createAt deve conter o seguinte formato YYYY-MM-DD";
    }
 
 
    const { data, error } = await supabase
    .from('budgets')
    .insert([
        budget
    ])
    .select()
 
   
   
    if (error){
 // aqui vem os tratamentos da variavel error
 
 
        return[]
    }
 
    return data
}
 
export { iBudgets, setBudget}