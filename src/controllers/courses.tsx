import { supabase } from '../utils/supabase';

interface iCourses {
  name: string;
  id?: number;
  created_at?: string;
  description: string;
  courseplan: string;
  orientationplan: string;
  workload: number;
  userId: number;
}

function toListCourses(data: iCourses[]) {
  return data.map((c) => ({ key: c.id!, option: c.name }));
}

async function setCoursebd(courses: iCourses) {
  // Remove id e created_at para o Supabase gerar automaticamente
  const { id, created_at, ...courseData } = courses;

  const { data, error } = await supabase
    .from('courses')
    .insert([courseData])
    .select();

  if (error) {
    console.log('Erro ao inserir curso:', error);
    return [];
  }

  return data;
}

async function upadateCourse(courses: iCourses) {
  const { id, ...fieldsToUpdate } = courses;
  const { data, error } = await supabase
    .from('courses')
    .update(fieldsToUpdate)
    .eq('id', id!)
    .select();

  if (error) {
    console.log('Erro ao atualizar curso:', error);
    return [];
  }

  return data;
}

async function deleteCourse(id: number) {
  const { data, error } = await supabase
    .from('courses')
    .delete()
    .eq('id', id)
    .select();

  if (error) {
    console.log('Erro ao deletar curso:', error);
    return [];
  }

  return data;
}

async function getCourses(param: any) {
  const { data: todos, error } = await supabase.from('courses').select();
  if (error) return { status: false, error };
  return { status: true, data: todos };
}

export {
  getCourses,
  setCoursebd,
  upadateCourse,
  deleteCourse,
  iCourses,
  toListCourses,
};
