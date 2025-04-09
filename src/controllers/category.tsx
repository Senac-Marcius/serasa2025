import { supabase } from '../utils/supabase';

export interface iCategories {
    name: string,
    description: string,
    id: number,
    created_at: string
}

// Criar categoria
async function setCategory(category: iCategories) {
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

    if (error) {
        console.log('Erro ao deletar:', error);
        return false;
    }

    return true;
}

export { setCategory, updateCategory, deleteCategory };
