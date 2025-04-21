import React, { useState } from "react";
import { supabase } from '../utils/supabase'
import { Timestamp } from "react-native-reanimated/lib/typescript/commonTypes";
import { error } from "console";

interface iPosition {
    id:number,
    name: string;
    description: string;
    salary: number;
    work_hours: string;
    departament: string;
    supervisor: string;
    creat_at: string;
}


async function getCargo(params: any) {
const { data: todos, error } = await supabase.from("positions").select()
if (error)
  return {status:false, error : error}

return { status: true, data: todos}

}

async function deletePosition(id: number) {
    try {
      const { error } = await supabase
        .from('positions')
        .delete()
        .eq('id', id);
  
      if (error) {
        console.error("Erro ao deletar no Supabase:", error.message);
        throw new Error(error.message);
      }
  
      return true;
    } catch (err) {
      console.error("Erro geral deletePosition:", err);
      return false;
    }
  }
  



  async function updatePosition(position: iPosition) {
    try {
      const { error } = await supabase
        .from('positions')
        .update(position)
        .eq('id', position.id);
  
      if (error) {
        console.error("Erro ao atualizar no Supabase:", error.message);
        throw new Error(error.message);
      }
  
      return true;
    } catch (err) {
      console.error("Erro geral updatePosition:", err);
      return false;
    }
  }
  



async function setPosition (position: iPosition) {

//aqui é tratamento antes  de inserir (regex)
    try{

        const { data, error } = await supabase
            .from('positions')
            .insert([position])
            .select()


//aqui é tratamento da var error
        if (error) {
            console.error('Erro ao inserir no supabase', error.message);
            throw new Error(error.message)
        }

        return data
    } catch (err){
        console.error('Erro geral setPosition', err);
        return null
    }
}
export { setPosition, updatePosition, deletePosition, iPosition,getCargo };

//