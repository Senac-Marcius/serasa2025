import React, { useState } from 'react';
import { supabase } from '../utils/supabase'


interface iCollections {
        id: number,
        createAt:string,
        name: string,
        quantity: string,
        star: string,
        
        
}



async function setCollection(collections:iCollections){
    //aqui vem os tratamentos de regex ou do modelo de negócio antes de inserir
 
    const { data, error } = await supabase.from('collections')
    .insert([
        collections
    ])
    .select()
    
    if(error){
        console.error('Erro',error);


        return []
    }

    return data
}

export {setCollection, iCollections} 