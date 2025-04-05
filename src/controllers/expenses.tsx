import React, { useState } from 'react';
import { supabase } from '../utils/supabase'

interface iexpenses {
    id: number,
    created_at: string,
    name: string,
    emails: string,
    contacts: string,
    costs: string,
    descriptions: string,
    user_id: number,
}



async function setExpense (expense:iexpenses){
    
  try {
        
    validateExpense(expense);

    const { data, error } = await supabase.from('expenses').insert([expense]).select();

    if (error) {
        console.error('Erro ao inserir no Supabase:', error.message);
        return [];
    }

    return data;
} catch (error: any) {
    console.error('Erro de validação:', error.message);
    return [];
}

function validateExpense(expense: iexpenses) {
    const phoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/; // Ex: (11) 98765-4321
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const costRegex = /^\d+(\.\d{1,2})?$/; // Apenas números ou decimal com 2 casas
    const maxDescriptionLength = 200;
  
    if (!phoneRegex.test(expense.contacts)) {
      throw new Error('Contato inválido. Ex: (11) 98765-4321');
    }
  
    if (!emailRegex.test(expense.emails)) {
      throw new Error('Email inválido.');
    }
  
    if (expense.descriptions.length > maxDescriptionLength) {
      throw new Error(`Descrição muito longa. Máximo de ${maxDescriptionLength} caracteres.`);
    }
  
    if (!costRegex.test(expense.costs)) {
      throw new Error('Custo deve conter apenas números, com até duas casas decimais.');
    }
  
    if (!expense.created_at || isNaN(Date.parse(expense.created_at))) {
      throw new Error('Data inválida.');
    }
  
    if (!expense.name || expense.name.trim().length === 0) {
      throw new Error('Nome é obrigatório.');
    }
  
    return true;
  }

}

    export{setExpense, iexpenses}