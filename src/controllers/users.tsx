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
    const [users, setUsers] = useState<iUser[]>([])

    async function setUser(user:iUser){
        //aqui vem os tratamentos do regex antes de inserir

    const { data, error } = await supabase.from('users')
    .insert([
      user
    ])
    .select()
  
    if(error){
        //aqui vem os tratamentos da varíavel error
        return[]
    }

    return data
            
    }

 export {setUser, iUser}