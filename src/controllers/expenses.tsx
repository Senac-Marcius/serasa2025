import React, { useState } from 'react';
import { supabase } from '../utils/supabase'

interface iexpenses {
  id: number,
  created_at: string,
  name: string,
  emails: string,
  contacts: string,
  costs: number,
  descriptions: string,
  url: string,
  user_id: number,
  percentege:number
}

function toListExpenses (data: iexpenses[]){
  const resp: {key: Number, option: String} []=[];
  
  data.map((e) =>{

    resp.push()
    resp.push({key: e.id, option: `${e.name} - ${e.created_at}` })
  })
  return resp;
}

async function toListAreas (data:any[]){
  const resp: {key: number, option: string, percentege:number} []=[];
  
 const retorno = await getAreas({})
 if (retorno.status && retorno.data && retorno.data.length > 0){

    data.map((e) =>{

      resp.push()
      resp.push({key: e.area_id, option: retorno.data.find(a => a.area_id == e.area_id).sectors, percentege:e.percentege })
    })

  }
  return resp;
  
}

async function getExpense(params:any) {
  const {data: todos, error }= await supabase.from('expenses').select()

  if(error)
    return{status:false, error: error}

  return{status:true, data: todos}
}


async function getAreasSlected(id: number) {
  const {data: todos, error }= await supabase.from('expenses_areas').select().eq('area_id', id)

  if(error)
    return{status:false, error: error}

  return{status:true, data: await toListAreas(todos) as  {key: number, option: string, percentege:number} []}
}

async function getAreas(params:any) {
  const {data: todos, error }= await supabase.from('areas').select()

  if(error)
    return{status:false, error: error}

  return{status:true, data: todos}
}
  

async function setExpense (expense:iexpenses, areas:any[]){
    //nessa area é regex

    const { data: todos, error } = await supabase.from('expenses')
    .insert([
      expense
    ])
    .select();

     
    if (todos && todos.length > 0) {
      const expense_id = todos[0].id;
  
      areas.forEach(async (a) => {
        const { error: insertError } = await supabase
          .from('project_user')
          .insert([{ area_id: a.key, expense_id: expense_id, percentege:a.percentege }]);
  
        if (insertError) {
          console.error(`Erro ao adicionar usuario ${a.key} ao Projeto:`, insertError );
        }
      });
    }

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


    export{setExpense, delRegister, updateExpense, iexpenses, getExpense, toListExpenses, getAreas, getAreasSlected}