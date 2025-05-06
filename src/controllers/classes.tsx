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

export async function salvarTurma(turma: Omit<Turma, 'id'>): Promise<Turma> {
  const { data, error } = await supabase
    .from(tabela)
    .insert([turma])
    .select('*') 
    .single();

  if (error) throw new Error(error.message);

  return data as Turma;
}

export async function atualizarTurma(turma: Turma): Promise<Turma> {
  const { data, error } = await supabase
    .from(tabela)
    .update(turma)
    .eq('id', turma.id)
    .select('*')
    .single();

  if (error) throw new Error(error.message);
  return data as Turma;
}



export async function deletarTurma(id: number) {
  const { error } = await supabase.from(tabela).delete().eq('id', id);
  if (error) throw new Error(error.message);
}
