import React, { useState } from "react";
import { supabase } from '../utils/supabase'

interface iProject {
  id: number;
  name: string;
  namep: string;
  url: string;
  created_at: string;
  time_line: string; // Mantido como string para compatibilidade com Supabase
  description: string;
  objective: string;
  activity: string;
  methodology: string;
  techniques: string;
  strategies: string;
  planning: string;
  process: string;
  recurces: number;        
}

interface TimelineItem {
  date: string;
  description: string;
}

function toListProjects(data: iProject[]) {
  const resp: {key: number, option: string}[] = [];
  data.map((l) => {
    resp.push({ key: l.id, option: l.name })
  })
  return resp;
}

async function getProjects(params: any) {
  const { data: todos, error } = await supabase.from('projects').select()
  if(error) {
    console.log(error)
    return {status: false, error: error}
  } 
  return {status: true, data: todos}
}
async function getProjectUsers(projectId: number) {
  const { data, error } = await supabase
    .from('projects_user')
    .select('user_id')
    .eq('project_id', projectId);

  if (error) {
    console.error("Erro ao buscar usuários do projeto:", error);
    return [];
  }

  return data.map(item => item.user_id);
}
async function updateProjectWithUsers(project: iProject, userIds: number[]) {
  // Inicia uma transação
  const { data: projectData, error: projectError } = await supabase
    .from('projects')
    .update(project)
    .eq('id', project.id)
    .select();

  if (projectError) {
    console.error("Erro ao atualizar projeto:", projectError);
    throw projectError;
  }

  // Remove associações antigas
  const { error: deleteError } = await supabase
    .from('projects_user')
    .delete()
    .eq('project_id', project.id);

  if (deleteError) {
    console.error("Erro ao remover usuários antigos:", deleteError);
    throw deleteError;
  }

  // Adiciona novas associações
  if (userIds.length > 0) {
    const newAssociations = userIds.map(user_id => ({
      project_id: project.id,
      user_id
    }));

    const { error: insertError } = await supabase
      .from('projects_user')
      .insert(newAssociations);

    if (insertError) {
      console.error("Erro ao adicionar novos usuários:", insertError);
      throw insertError;
    }
  }

  return projectData;
}

async function setProject(project: iProject, integrantes: any[]) {
  // Converte a linha do tempo para JSON string se for array
  const projectToSave = {
    ...project,
    time_line: Array.isArray(project.time_line) 
      ? JSON.stringify(project.time_line) 
      : project.time_line
  };

  const { data, error } = await supabase
    .from('projects')
    .insert([projectToSave])
    .select();

  if (error) {
    console.error(error);
    return { error };
  }

  if (data && data.length > 0) {
    const projectId = data[0].id;
    const userIds = integrantes
      .filter(i => i.key !== -1)
      .map(i => i.key);

    if (userIds.length > 0) {
      const newAssociations = userIds.map(user_id => ({
        project_id: projectId,
        user_id
      }));

      const { error: insertError } = await supabase
        .from('projects_user')
        .insert(newAssociations);

      if (insertError) {
        console.error("Erro ao adicionar usuários:", insertError);
        throw insertError;
      }
    }
  }
  return { data };
}

async function updateProject(project: iProject) {
  // Converte a linha do tempo para JSON string se for array
  const projectToUpdate = {
    ...project,
    time_line: Array.isArray(project.time_line) 
      ? JSON.stringify(project.time_line) 
      : project.time_line
  };

  const { data, error } = await supabase
    .from('projects')
    .update(projectToUpdate)
    .eq('id', project.id);

  if (error) {
    console.error("Erro ao atualizar projeto:", error);
    return { error };
  }
  return { data };
}

async function deleteProject(id: number) {
  const { data, error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    console.error("Erro ao deletar projeto:", error);
    return { error };
  }
  return { data };
}

export { 
  setProject, 
  updateProjectWithUsers as updateProject, 
  deleteProject, 
  toListProjects, 
  getProjects,
  getProjectUsers,
  iProject 
};
          

