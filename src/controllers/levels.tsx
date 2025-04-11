import { supabase } from '../utils/supabase'

export interface iLevels{
    name: string,
    description: string,
    color: string,
    id: number,
    created_at: string,       
}

export async function setLevel(levels: iLevels){

    //* aqui vem os tratamento de regex ou do modelo de negócio antes de inserir.

    const { data, error } = await supabase.from('levels').insert([ levels ]) .select()

    if (error){
        console.error('Erro ao inserir levels: ', error);
        return[]
    }
}

        // BUSCAR TODOS OS REGISTROS

export async function getLevels (params:any){
    const { data: todos, error } = await supabase.from('levels').select();
    if (error) 
      return {status: false, error: error}
    
    
    return {status: true, data: todos} 
 }
        // ATUALIZAR REGISTRO

export async function updateLevels(levels: iLevels) {
        const { error } = await supabase
        .from('levels')
        .update({
        name: levels.name,
        description: levels.description,
        color: levels.color,
        id:levels.id,
        created_at: levels.created_at,
           
   })
        .eq('id', levels.id);
 
        return error;

}
 
        // DELETAR REGISTRO
export async function deleteLevels(id: number) {
        const { error } = await supabase.from('levels').delete().eq('id', id);
        return error;
}
//import {deleteLevels, updateLevels, getLevels, setLevels, iLevels } from '../src/controllers/levels';
