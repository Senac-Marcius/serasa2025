import React, {useState} from 'react';
import { supabase } from '../utils/supabase'

interface iEmployees {
    id: number,
    urls: string,
    name: string,
    datebirth: string,
    tell: string,
    email: string,
    address: string,
    nationality: string,
    discPersonality: string,
    cpf: string,
    sex: string,
    martinalStatus: string,
    position: string,
    ethnicity: string,
    deficiency: string,
    createAt: string,
    isActive: string
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

export {setEmployee}

        