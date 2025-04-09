import { supabase } from '../utils/supabase';

export interface iCategories {
    name: string,
    description: string,
    id: number,
    created_at: string
}

<<<<<<< HEAD
// Criar categoria
async function setCategory(category: iCategories) {
=======
// Criar minha categoria
async function setCategory(category: Omit<iCategories, 'id'>) {
>>>>>>> 39c7ffb718898f6c01083b3c93d4e044baa6f326
    const { data, error } = await supabase
        .from('categories')
        .insert([category])
        .select();

    if (error) {
        console.log('Erro ao cadastrar:', error);
        return [];
    }

    return data;
}

<<<<<<< HEAD
// Atualizar categoria
=======
// Atualizar ela
>>>>>>> 39c7ffb718898f6c01083b3c93d4e044baa6f326
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

<<<<<<< HEAD
// Deletar categoria
=======
// Deletar agr
>>>>>>> 39c7ffb718898f6c01083b3c93d4e044baa6f326
async function deleteCategory(id: number) {
    const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

    if (error) {
        console.log('Erro ao deletar:', error);
        return false;
    }

    return true;
}

export { setCategory, updateCategory, deleteCategory };
