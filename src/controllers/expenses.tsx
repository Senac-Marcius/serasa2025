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
  url: string,
  user_id: number,
}

function toListExpenses (data: iexpenses[]){
  const resp: {key: Number, option: String} []=[];
  
  data.map((e) =>{

    resp.push()
    resp.push({key: e.id, option: `${e.name} - ${e.created_at}` })
  })
  return resp;
}

async function getExpense(params:any) {
  const {data: todos, error }= await supabase.from('expenses').select()

  if(error)
    return{status:false, error: error}

  return{status:true, data: todos}
}
  

async function setExpense (expense:iexpenses){
    //nessa area é regex

    const { data: todos, error } = await supabase.from('expenses')
    .insert([
      expense
    ])
    .select();

    if(error)
        //tratamento do codigo do erro 
      return{status:false, error: error}

    return{status:true, data: todos}
   
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
    const { data, error } = await supabase
      .from('expenses')
      .update(expense)
      .eq('id', expense.id)
      .select();

      if (error) {
        console.error('Erro ao atualizar no Supabase:', error.message);
        return null;
      }
      return data;
}


    export{setExpense, delRegister, updateExpense, iexpenses, getExpense, toListExpenses}