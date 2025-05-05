import { supabase } from '../utils/supabase';

interface iStudent {
  id?: number;
  created_at?: string;
  user_id: number;
}

async function getAllStudents() {
  const { data, error } = await supabase
    .from('students')
    .select('*, users(*)') // join opcional com users

  if (error) {
    console.error("Erro ao buscar estudantes:", error.message);
    return { status: false, error };
  }

  return { status: true, data };
}

async function getStudentById(id: number) {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error("Erro ao buscar estudante:", error.message);
    return { status: false, error };
  }

  return { status: true, data };
}

async function getStudentByUserId(user_id: number) {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('user_id', user_id)
    .single();

  if (error) {
    console.error("Erro ao buscar estudante por user_id:", error.message);
    return { status: false, error };
  }

  return { status: true, data };
}

async function createStudent(student: iStudent) {
  const { data, error } = await supabase
    .from('students')
    .insert([student])
    .select();

  if (error) {
    console.error("Erro ao criar estudante:", error.message);
    return { status: false, error };
  }

  return { status: true, data };
}

async function updateStudent(id: number, updates: Partial<iStudent>) {
  const { data, error } = await supabase
    .from('students')
    .update(updates)
    .eq('id', id)
    .select();

  if (error) {
    console.error("Erro ao atualizar estudante:", error.message);
    return { status: false, error };
  }

  return { status: true, data };
}

async function deleteStudent(id: number) {
  const { error } = await supabase
    .from('students')
    .delete()
    .eq('id', id);

  if (error) {
    console.error("Erro ao deletar estudante:", error.message);
    return { status: false, error };
  }

  return { status: true };
}

export {
  iStudent,
  getAllStudents,
  getStudentById,
  getStudentByUserId,
  createStudent,
  updateStudent,
  deleteStudent
};
