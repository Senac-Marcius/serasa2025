import { supabase } from '../utils/supabase';

interface iDisciplines {
  id: number;
  name: string;
  url: string;
  workload: number;
  created_at: string;
  teacher: string;
}

// Transforma lista de disciplinas no formato que o MySelect precisa
function toListDisciplines(data: iDisciplines[]) {
  const resp: { key: number; option: string }[] = [];

  data.map((d) => {
    resp.push({ key: d.id, option: d.name });
  });

  return resp;
}

// Lista disciplinas completas (para uso geral)
async function getDisciplines(paramens: any) {
  const { data, error } = await supabase.from('disciplines').select();

  if (error)
    return { status: false, data: error };

  return { status: true, data: data };
}

// Lista disciplinas formatadas para <MySelect />
async function getDisciplinesSelectList() {
  const { data, error } = await supabase.from('disciplines').select();

  if (error)
    return { status: false, data: error };

  const lista = toListDisciplines(data as iDisciplines[]);
  return { status: true, data: lista };
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

export {
  SetDisciplinebd,
  UpdateDisciplinebd,
  DeleteDisciplinebd,
  iDisciplines,
  getDisciplines,
  getDisciplinesSelectList, // ✅ export para uso externo
  toListDisciplines,
};
