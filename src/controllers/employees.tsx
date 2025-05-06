import React, {useState} from 'react';
import { supabase } from '../utils/supabase'
import { getUsers } from './users';

interface iEmployees { 
  id: number;
  urls: string;
  nationality: string;
  disc_personality: string;
  sex: string;
  martinal_status: string;
  ethnicity: string;
  deficiency: string;
  is_active: string; // Alterado para string
  user_id: number;
  positions_id: number;
}
async function toListEmployees(data: iEmployees[]){
  const result = await getUsers({});


  const resp: {key: number, option: string}[] = [];
  data.map((l) => {
    resp.push({ key: l.id, option: result.data?.find(u => u.id == l.user_id).name })
  })

  return resp;
}
async function getEmployees(params: any) { 
  let query = supabase.from('employees').select('*');
  
  if (params?.user_id) {
    query = query.eq('user_id', params.user_id);
  }

  const { data, error } = await query;
  
  if(error){
    console.log(error);
    return {status: false, error: error};
  } 
  return {status: true, data: data};
}

async function setEmployee(employee: iEmployees) {
  const { data, error } = await supabase
    .from('employees')
    .insert([employee]) // Envolva em um array
    .select();

  if (error) {
    console.error("Erro ao criar funcionário:", error);
    return null;
  }
  return data?.[0]; // Retorna o primeiro item inserido
}
async function updateEmployee(id: number, req: iEmployees) {
  const { data, error } = await supabase
    .from('employees')
    .update({
      urls: req.urls,
      nationality: req.nationality,
      disc_personality: req.disc_personality,
      sex: req.sex,
      martinal_status: req.martinal_status,
      ethnicity: req.ethnicity,
      deficiency: req.deficiency,
      is_active: req.is_active,
      positions_id: req.positions_id,
      user_id: req.user_id
    })
    .eq('id', id)
    .select();

  if (error) {
    console.error("Erro ao atualizar funcionário:", error);
    return null;
  }
  return data?.[0];
}
async function dellEmployee(id: number) {
  const { error } = await supabase
    .from('employees')
    .delete()
    .eq('id', id);

  if (error) {
    console.error("Erro ao deletar funcionário:", error);
    throw error; // Ou retorne um objeto { status: false, error }
  }
  return { status: true, message: "Usuário deletado" };
}

export {setEmployee,updateEmployee,dellEmployee,getEmployees,toListEmployees, iEmployees}

        