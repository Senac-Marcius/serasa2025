import React, { useState } from "react";
import { supabase } from '../utils/supabase'

interface iProject {
        name: string;
        namep: string;
        id: number;
        url: string;
        created_at: string;
        user_id: number;
        recurces: number;
        description: string;
        activity: string;
        time_line: string;
        objective: string;
        methodology: string;
        techniques: string;
        strategies: string;
        planning: string;
        process: string;
    }



async function setProject(project: iProject) {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select();

  if (error) {
    console.error('Erro ao inserir projeto no Supabase:', error);
  } else {
    console.log('Projeto inserido com sucesso no Supabase:', data);
  }

  return { data, error };
}
    

async function updateProject(project: iProject) {
  const { data, error } = await supabase
    .from('projects')
    .update({
      ...project
    })
    .eq('id', project.id);

  if (error) {
    console.error("Erro ao atualizar projeto:", error);
  } else {
    console.log("Projeto atualizado:", data);
  }
}

async function deleteProject(id: number) {
  const { data, error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    console.error("Erro ao deletar projeto:", error);
  } else {
    console.log("Projeto deletado com sucesso:", data);
  }
}




export {setProject, updateProject, deleteProject, iProject}
          