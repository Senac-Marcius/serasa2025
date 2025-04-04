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

const [employees, setEmployees] = useState<iEmployees[]>([])

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

export {setEmployee, employees , setEmployees}

        