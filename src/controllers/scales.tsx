import { supabase } from '../utils/supabase'

interface iScale {
    id: number,
    day: string,
    start_time: string,
    end_time: string,
    created_at: string,
    employ_id: number,
}

async function setScale(scale: Omit<iScale, 'id'>) {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (!timeRegex.test(scale.start_time) || !timeRegex.test(scale.end_time)) {
        console.error("Erro: Formato de horário inválido!");
        return [];
    }

    const { data, error } = await supabase
        .from('scales')
        .insert([scale])
        .select();

    if (error) {
        console.error("Erro ao inserir escala:", error);
        alert("Erro ao salvar no Supabase: " + error.message);
        return [];
    }

    return data;
}

async function updateScale(id: number, updatedFields: Partial<Omit<iScale, 'id'>>) {
    const { data, error } = await supabase
        .from('scales')
        .update(updatedFields)
        .eq('id', id)
        .select();

    if (error) {
        console.error("Erro ao atualizar escala:", error);
        return null;
    }

    return data;
}

async function deleteScale(id: number) {
    const { error } = await supabase
        .from('scales')
        .delete()
        .eq('id', id);

    if (error) {
        console.error("Erro ao deletar escala:", error);
        return false;
    }

    return true;
}

export { setScale, updateScale, deleteScale, iScale }
