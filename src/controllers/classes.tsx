import React, { useState } from 'react';
import { supabase } from '../utils/supabase';

export type Turma = {
  id: number;
  curso: string;
  nome_turma: string;
  turno: string;
  modalidade: string;
  horario: string;
  cargaHoraria: string;
  vagas: string;
  inicio: string;
  termino: string;
  valor: string;
  docente: string;
  status: string;
};

const tabela = 'class';

export async function buscarTurmas(): Promise<Turma[]> {
  const { data, error } = await supabase.from(tabela).select('*');
  if (error) throw new Error(error.message);
  return data as Turma[];
}

export async function salvarTurma(turma: Turma) {
  const { error } = await supabase.from(tabela).insert([turma]);
  if (error) throw new Error(error.message);
}

export async function deletarTurma(id: number) {
  const { error } = await supabase.from(tabela).delete().eq('id', id);
  if (error) throw new Error(error.message);
}
