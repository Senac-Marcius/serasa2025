import React, { useState } from 'react';
import { supabase } from '../utils/supabase';


interface iCollection {
        id: number,
        createAt:string,
        name: string,
        quantity: string,
        star: string,     
}
async function getCollections(params:any){
    const{data:todos, error} = await supabase.from('collections').select()

    if(error)
        return{status:false, error:error}


    return{status:true, data:todos}
    
}



async function setCollection(collection:iCollection){
    //aqui vem os tratamentos de regex ou do modelo de negócio antes de inserir
 
    const { data, error } = await supabase.from('collections')
    .insert([
        collection
    ])
    .select()
    
    if(error){
        console.error('Erro',error);
    }

    return data
}

async function deleteCollectionById(id: number) {
    const { error } = await supabase
        .from('collections')
        .delete()
        .eq('id', id)

    if (error) {
        console.error("Erro ao deletar usuário:")
        return false
    }

    return true
}


async function updateCollectionById(id: number, updatedCollection: Partial<iCollection>) {
    const { error } = await supabase
        .from('collections')
        .update(updatedCollection)
        .eq('id', id);

    if (error) {
        console.error("Erro ao atualizar usuário:", error.message);
        return false;
    }
    return true;
}

export {setCollection, iCollection,deleteCollectionById,updateCollectionById,getCollections} 