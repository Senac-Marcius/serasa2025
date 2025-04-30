import { supabase } from '../utils/supabase';

interface iCategories {
    name: string,
    description: string,
    id: number,
    created_at: string
}

function toListCategorie(data:iCategories[]){
   const resp : {key:number,option: string}[] = [];

   data.map((c) => {
    resp.push({key:c.id, option: c.name})
   })

   return resp;

}
// Criar categoria
async function setCategory(category: iCategories) {
    const { data, error } = await supabase
        .from('categories')
        .insert([category])
        .select();
}


async function getCategories(params:any) {
    const { data: todos, error } = await supabase.from('categories').select();
    if (error) 
        return {status:false,error:error}

    return {status: true,data: todos}
}


    



// Atualizar categoria
async function updateCategory(category: iCategories) {
    const { data, error } = await supabase
        .from('categories')
        .update({
            name: category.name,
            description: category.description,
            created_at: category.created_at
        })
        .eq('id', category.id)
        .select();

    if (error) {
        console.log('Erro ao atualizar:', error);
        return [];
    }

    return data;
}

// Deletar categoria
async function deleteCategory(id: number) {
    const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);
    return 'Categoria Deletado'
  
}

export { iCategories, setCategory, updateCategory, deleteCategory, getCategories, toListCategorie };
