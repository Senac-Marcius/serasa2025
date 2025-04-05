import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase'


interface iCategories{
    name: string,
    description: string,
    id: number,
    created_at: string
}



async function setCategory(category:iCategories){
//aqui vem os tratamentos do regex  ou do modelo de negocio antes de inserir

    const { data, error } = await supabase.from('categories').insert([category]).select()


    if(error){
        console.log(error)
        //aqui vem os tratamentos da variVEL error
    
        

return []

}

return data 
}


export {setCategory, iCategories}
