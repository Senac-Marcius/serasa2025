import React, { useState } from "react";
import { supabase } from '../utils/supabase'

interface iProject {
  id: number;
  name: string;
  namep: string;
  url: string;
  created_at: string;
  time_line: string;
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

function toListProjects(data: iProject[]){
  const resp: {key: number, option: string}[] = [];
  data.map((l) => {
    resp.push({ key: l.id, option: l.name })
  })

  return resp;
}

async function getProjects(params:any) {
  const { data: todos , error} = await supabase.from('projects').select()
  if(error){
    console.log(error)
    return {status: false, error: error}
  } 
  return {status: true, data: todos}
}

async function setProject(project: iProject, ids: any[]) {
  const { data, error } = await supabase.from('projects').insert([project]).select();

  if (error) {
    console.error(error);
    return;
  }

  if (data && data.length > 0) {
    const projectId = data[0].id;

    ids.forEach(async (id) => {
      const { error: insertError } = await supabase
        .from('projects_user')
        .insert([{ user_id: id.key, project_id: projectId }]);

      if (insertError) {
        console.error(`Erro ao adicionar usuario ${id.key} ao Projeto:`, insertError );
      }
    });
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
    //console.log("Projeto atualizado:", data);
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
    //console.log("Projeto deletado com sucesso:", data);
  }
}




export {setProject, updateProject, deleteProject, toListProjects, getProjects, iProject}
          

/* .from('projects')
    .insert([project])
    .select();

  if (error) {
    console.error('Erro ao inserir projeto no Supabase:', error);
  } else {
    console.log('Projeto inserido com sucesso no Supabase:', data);
  } */