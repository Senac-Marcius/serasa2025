import { supabase } from '../utils/supabase'

interface iScale {
    id: number,
    day: string,
    start_time: string,
    end_time: string,
    created_at: string,
    employ_id: number,
    date:string
}

function toListScale (data: iScale[]){
    const resp: {key: number, option:string}[] = [];

    data.map((s) => {
        resp.push({key: s.id, option:`${s.day} - ${s.start_time} - ${s.end_time}`})
    })

    return resp;
}

async function setScale(scale: Omit<iScale, 'id'>) {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (!timeRegex.test(scale.start_time) || !timeRegex.test(scale.end_time)) {
        console.error("Erro: Formato de horário inválido!");
        return [];
    }

    if (!scale.date) {
        console.error("Erro: Data não informada!");
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

// Atualize também a função updateScale para lidar com o campo date
async function updateScale(id: number, updatedFields: Partial<Omit<iScale, 'id'>>) {
    if (updatedFields.date) {
        // Se a data foi alterada, atualize também o dia da semana
        const daysOfWeek = [
            'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 
            'Quinta-feira', 'Sexta-feira', 'Sábado'
        ];
        const date = new Date(updatedFields.date);
        const dayOfWeek = daysOfWeek[date.getDay()];
        updatedFields.day = dayOfWeek;
    }

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

async function getScale(params: any) {
    let query = supabase.from('scales').select('*');
    
    if (params?.employ_id) {
      query = query.eq('employ_id', params.employ_id);
    }
  
    const { data, error } = await query;
  
    if (error) {
      console.error('Error fetching scales:', error);
      return { status: false, error };
    }
  
    return { status: true, data };
  }

export { getScale, setScale, updateScale, deleteScale, iScale, toListScale }
