import { supabase } from '../utils/supabase';

interface iCalendar {
  id: number;
  studentname: string;
  course: string;
  registrationdate: string;
  period: string;
  created_at: string;
}

// Função auxiliar para converter lista em {key, option}
function toListCalendar(data: iCalendar[]) {
  const resp: { key: number; option: string }[] = [];
  data.map((d) => {
    resp.push({ key: d.id, option: `${d.studentname} - ${d.registrationdate}` });
  });
  return resp;
}

// Função para buscar todos os calendários
async function getCalendars() {
  const { data, error } = await supabase.from('calendar').select();

  if (error) {
    console.error('Erro ao buscar calendários:', error.message);
    return { status: false, data: error };
  }

  return { status: true, data: data as iCalendar[] };
}

// Inserção
type CalendarWithoutId = Omit<iCalendar, 'id'>;

async function SetCalendarbd(calendar: CalendarWithoutId): Promise<iCalendar[] | null> {
  console.log('Inserindo cronograma...', calendar);
  const { data, error } = await supabase
    .from('calendar')
    .insert([calendar])
    .select();

  if (error) {
    console.error('Erro ao inserir:', error.message);
    return null;
  }

  return data as iCalendar[];
}

// Atualização
async function UpdateCalendarbd(calendar: iCalendar): Promise<iCalendar[] | null> {
  console.log('Atualizando cronograma...');
  const { data, error } = await supabase
    .from('calendar')
    .update({
      studentname: calendar.studentname,
      course: calendar.course,
      registrationdate: calendar.registrationdate,
      period: calendar.period,
    })
    .eq('id', calendar.id)
    .select();

  if (error) {
    console.error('Erro ao atualizar:', error.message);
    return null;
  }

  return data as iCalendar[];
}

// Exclusão
async function DeleteCalendarbd(id: number): Promise<boolean> {
  console.log('Deletando cronograma...');
  const { error } = await supabase
    .from('calendar')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Erro ao deletar:', error.message);
    return false;
  }

  return true;
}

export {iCalendar,toListCalendar,getCalendars,SetCalendarbd,UpdateCalendarbd,DeleteCalendarbd,};
