import { supabase } from '../utils/supabase';

interface iCalendar {
  studentname: string;
  course: string;
  registrationdate: string;
  period: string;
  id: number;
  created_at: string;
}

async function getCalendars(params:any) {
  
  const { data:todos, error } = await supabase.from('calendar').select();

  if (error)
    return {status:false, error: error}

  return {status:true, data: todos}
}




// Função para adicionar um calendário
async function setCalendarsData(calendar: iCalendar) {
  const { data, error } = await supabase
    .from('calendars')  // Certifique-se de que o nome da tabela é 'calendars' no Supabase
    .insert([calendar])
    .select();  // Você pode omitir o `.select()` se não precisar retornar os dados

  // Tratamento de erros
  if (error) {
    console.log('Erro ao inserir no Supabase:', error);
    return null; // Retorna null em caso de erro
  }

  console.log('Calendário cadastrado com sucesso:', data);
  return data;
}

export { setCalendarsData, iCalendar, getCalendars };
//CORRETO