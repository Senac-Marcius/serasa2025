import { supabase } from '../utils/supabase';

interface iDisciplines {
  id: number;
  name: string;
  url: string;
  workload: number;
  created_at: string;
  teacher: string;
}

type DisciplineWithoutId = Omit<iDisciplines, 'id'>;

async function SetDisciplinebd(discipline: DisciplineWithoutId): Promise<iDisciplines[] | null> {
  console.log('Inserindo disciplina...');
  const { data, error } = await supabase
    .from('disciplines')
    .insert([discipline])
    .select();

  if (error) {
    console.log('Erro ao inserir:', error);
    return null;
  }

  return data as iDisciplines[];
}

async function UpdateDisciplinebd(discipline: iDisciplines): Promise<iDisciplines[] | null> {
  console.log('Atualizando disciplina...');
  const { data, error } = await supabase
    .from('disciplines')
    .update({
      name: discipline.name,
      url: discipline.url,
      workload: discipline.workload,
      teacher: discipline.teacher,
    })
    .eq('id', discipline.id)
    .select();

  if (error) {
    console.log('Erro ao atualizar:', error);
    return null;
  }

  return data as iDisciplines[];
}

async function DeleteDisciplinebd(id: number): Promise<boolean> {
  console.log('Deletando disciplina...');
  const { error } = await supabase
    .from('disciplines')
    .delete()
    .eq('id', id);

  if (error) {
    console.log('Erro ao deletar:', error);
    return false;
  }

  return true;
}

export { SetDisciplinebd, UpdateDisciplinebd, DeleteDisciplinebd, iDisciplines };
