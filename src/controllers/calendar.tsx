import { supabase } from '../utils/supabase';

interface iCalendar {
  id: number;
  studentname: string;
  course: string;
  registrationdate: string;
  period: string;
  created_at: string;
}

type CalendarWithoutId = Omit<iCalendar, 'id'>;

async function SetCalendarbd(calendar: CalendarWithoutId): Promise<iCalendar[] | null> {
  console.log('Inserindo cronograma...', calendar);
  const { data, error } = await supabase
    .from('calendar') // TABELA CORRETA
    .insert([calendar])
    .select();

  if (error) {
    console.error('Erro ao inserir:', error.message);
    return null;
  }

  return data as iCalendar[];
}

async function UpdateCalendarbd(calendar: iCalendar): Promise<iCalendar[] | null> {
  console.log('Atualizando cronograma...');
  const { data, error } = await supabase
    .from('calendar') // TABELA CORRETA
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

async function DeleteCalendarbd(id: number): Promise<boolean> {
  console.log('Deletando cronograma...');
  const { error } = await supabase
    .from('calendar') // TABELA CORRETA
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Erro ao deletar:', error.message);
    return false;
  }

  return true;
}

export { iCalendar, SetCalendarbd, UpdateCalendarbd, DeleteCalendarbd };
