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

async function setProject(project: iProject, ids: number[]) {
  const { data, error } = await supabase.from('projects').insert([project]).select;

  if (error) {
    console.error(error);
    return;
  }

  if (data && data.length > 0) {
    const projectId = data[0].id;

    ids.forEach(async (id) => {
      const { error: insertError } = await supabase
        .from('project_user')
        .insert([{ user_id: id, project_id: projectId }]);

      if (insertError) {
        console.error(`Erro ao adicionar usuario ${id} ao Projeto:`, insertError );
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




export {setProject, updateProject, deleteProject, toListProjects, getProjects, iProject}
          

/* .from('projects')
    .insert([project])
    .select();

  if (error) {
    console.error('Erro ao inserir projeto no Supabase:', error);
  } else {
    console.log('Projeto inserido com sucesso no Supabase:', data);
  } */