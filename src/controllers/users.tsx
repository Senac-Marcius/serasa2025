import React, { useState } from 'react';
import { supabase } from '../utils/supabase'

interface iUser {
    name: string,
    password: string,
    cpf: string,
    age: string,
    contact: string,
    email: string,
    address: string,
    createAt: string,
    id: number,

    //Userid: number
}
    //const [users, setUsers] = useState<iUser[]>([])

    async function setUser(user:iUser){
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    

    const { data, error } = await supabase.from('users')
    .insert([
      user
    ])
    .select()
  
    if(error){
        //aqui vem os tratamentos da varíavel error
        console.log('erro', error)
    }

    return data
            
    }

    async function deleteUserById(id: number) {
        const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', id)
    
        if (error) {
            console.error("Erro ao deletar usuário:")
            return false
        }
    
        return true
    }


    async function updateUserById(id: number, updatedUser: Partial<iUser>) {
        const { error } = await supabase
            .from('users')
            .update(updatedUser)
            .eq('id', id);
    
        if (error) {
            console.error("Erro ao atualizar usuário:", error.message);
            return false;
        }
        return true;
    }

 export {setUser, iUser, deleteUserById, updateUserById}