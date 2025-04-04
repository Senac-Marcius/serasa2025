import React, { useState } from 'react';
import { supabase } from '../utils/supabase'


interface iCategories{
 name: string,
    description: string,
    id: number,
    created_at: string,
    user_id: number,
}

const[categories, setCategories] = useState<iCategories[]>([]);

async function setCategory(category:iCategories){
//aqui vem os tratamentos do regex  ou do modelo de negocio antes de inserir

    const { data, error } = await supabase.from('categories')
    .insert([
       category
    ])
    .select()
    if(error){
        //aqui vem os tratamentos da variVEL error
    
        

return []

}

return data 
}


export {setCategories, categories,setCategory}
