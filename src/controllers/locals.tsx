import React, { useState } from 'react'
import { supabase } from '../utils/supabase' 

interface iLocal{
    id: number,
    name: string,
    dimension: string,
    description: string,
    adress: string,
    created_at: string,
}


function toListLocal(data: iLocal[]){
  const resp: {key: number, option: string}[] = [];

  data.map((l) => {
    resp.push({ key: l.id, option: l.name})
  })

  return resp;
} 


//commit, fetch all, entra no git, achar a ultima da dev com filtro dev - corrigind prod e myview, criar uma temporaria - 
// botao direito create branch => dev_locals1.2, verificar se esta na dev temp, ir para o meu ultimo commit e mergear com
//juntar a minha dev tem com a dev, mudar o git para o dev ORIGINAL


async function getLocals (params: any) {
    const {data: todos, error} = await supabase.from('locals').select();

    if(error) {
      console.log(error)
      return {status: true, data: todos}}
    else{

      return {status: true, data: todos}
    }
}


async function setLocal(local:iLocal){
  //aqui vem os tratamentos de regex ou modelo de negócio antes de inserir

const { data, error } = await supabase.from('locals')
  .insert([
      local
  ])
  .select() 

  if(error){
     //aqui vem os tratamentos da variável error, se der algum problema=>
    console.log(error)
    return []
}      

    return data
}


async function deleteLocal(id: number) {
    const { error } = await supabase
      .from('locals')
      .delete()
      .eq('id', id)
  
    if (error) {
      console.log(error)
      return {status: false,message: error}
    }
  
    return {status: true, message: "Removido local"}
  }


  async function updateLocal(local: iLocal) {
    const { data, error } = await supabase
      .from('locals')
      .update({
        name: local.name,
        dimension: local.dimension,
        description: local.description,
        adress: local.adress,
        created_at: local.created_at
      })
      .eq('id', local.id)
      .select()
  
    if (error) {
      console.log(error)
      return null
    }
  
    return data
  }


export {setLocal, deleteLocal, updateLocal, iLocal, getLocals, toListLocal }  




