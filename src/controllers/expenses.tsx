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

const regexValidators = {
  name: /^[\p{L}\s]{2,50}$/u, // Letras com espaços, 2-50 caracteres
  emails: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Padrão básico de e-mail
  descriptions: /^.{0,255}$/, // Qualquer texto com até 255 caracteres
  costs: /^\d{1,6}([.,]\d{1,2})?$/ // Até 6 dígitos inteiros + opcional decimal com ponto ou vírgula
};

export function validateExpenseFields(expense: Partial<iexpenses>) {
  const { name, emails, descriptions, costs } = expense;

  if (!name || !regexValidators.name.test(name)) {
    throw new Error("Nome inválido. Deve conter apenas letras e ter entre 2 e 50 caracteres.");
  }

  if (!emails || !regexValidators.emails.test(emails)) {
    throw new Error("E-mail inválido.");
  }

  if (!descriptions || !regexValidators.descriptions.test(descriptions)) {
    throw new Error("Descrição inválida. Máximo 255 caracteres.");
  }

  if (!costs || !regexValidators.costs.test(costs)) {
    throw new Error("Custo inválido. Ex: 99.99 ou 99,99");
  }
}



async function setExpense (expense:iexpenses){

  try {
    validateExpenseFields(expense);
  } catch (err: any) {
    console.error("Erro de validação:", err.message);
    return { error: err.message };
  }

  const { data, error } = await supabase.from('expenses').insert([expense]).select();

  if (error) {
    console.error('Erro ao inserir no Supabase:', error.message);
    return { error: error.message };
  }

  return { data };
   
}

async function delRegister(id: number) {

    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao deletar no Supabase:', error.message);
      return false;
   }

    return true;
}

async function updateExpense(expense: iexpenses) {
  try {
    validateExpenseFields(expense);
  } catch (err: any) {
    console.error("Erro de validação:", err.message);
    return { error: err.message };
  }

  const { data, error } = await supabase.from('expenses').update(expense).eq('id', expense.id).select();

  if (error) {
    console.error('Erro ao atualizar:', error.message);
    return { error: error.message };
  }

  return { data };
}


    export{setExpense, delRegister, updateExpense, iexpenses}