import React, {useState} from 'react';
import { supabase } from '../utils/supabase'

interface iEmployees { 
    id: number,
    urls: string,
    name: string,
    date_birth: string,
    tell: string,
    email: string,
    address: string,
    nationality: string,
    disc_personality: string,
    cpf: string,
    sex: string,
    martinal_status: string,
    ethnicity: string,
    deficiency: string,
    created_at: string,
    is_active: string,
    user_id:number,
    positions_id:number
}

async function  setEmployee(employee:iEmployees){

    //aqui vem o tratamento da informação antes da inserção
    
    const { data, error } = await supabase.from('employees')
    .insert(
        employee
    ).select()

   
    if(error){
      //aqui vem o tratamento da variavel error


        return[]
    }
    return data
}
async function updateEmployee(id: number, req:any){
    const { data, error } = await supabase
  .from('employees')
  .update({
    urls: req.urls,
    name: req.name,
    tell: req.tell,
    email: req.email,
    address: req.address,
    nationality: req.nationality,
    disc_personality: req.disc_personality,
    sex: req.sex,
    martinal_status: req.martinal_status,
    is_active: req.is_active,
    positions_id: req.positions_id
     })
  .eq('id', id)
  .select()
  if(error){
    //aqui vem o tratamento da variavel error


      return[]
  }
  return data
}
async function  dellEmployee(id:number) {
    const { error } = await supabase
  .from('employees')
  .delete()
  .eq('id', id)
  return 'Usuario Deletado'
}

export {setEmployee,updateEmployee,dellEmployee, iEmployees}

        