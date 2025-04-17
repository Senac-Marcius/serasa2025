import React, { useState } from 'react';
import { supabase } from '../utils/supabase';

interface iTimeline {
  id: number;
  class_id: number;
  discipline_id: string;
  local_id: number;
  start_time: string;
  end_time: string;
  date: string,
  created_at: string;
  teacher_id: string;
}

// funçoes que chama o selec e lista

function toListTimeline(data: iTimeline[]){
  const resp: {key: number, option: string}[] = [];

  data.map((t) => {
    resp.push({ key: t.id, option: `${t.created_at} - ${t.class_id} - ${t.local_id}`})
  })

  return resp;
}


async function  getTimelines(params:any) {
  const {data: todos, error} = await supabase.from ('launchs').select();

  if(error)
    return {status: false, error: error}

  return  {status: true, data: todos}
}


// Function to edit a timeline
async function editTimelines(updatedData: iTimeline) {
     const { data, error } = await supabase
      .from('timelines')
      .update(updatedData) // Pass updated data
      .eq('id', updatedData.id)
      .select(); // Fetch updated timeline to ensure it's correct

    if (error) {
      console.error('Error updating timeline:', error.message);
      return null;
    }

    return data; // Return updated data
  } 
  


// Function to delete a timeline
async function delTimelines(id: number) {
  try {
    const { error } = await supabase
      .from('timelines')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting timeline:', error);
      return false;
    }

    return true; // Return true if deletion was successful
  } catch (error) {
    console.error('Unexpected error during delete:', error);
    return false;
  }
}


async function setTimeline(timeline: iTimeline) {

 
  // Insert timeline data into Supabase
  const { data, error } = await supabase
    .from('timelines')
    .insert([timeline])
    .select();

  if (error) {
    console.error('Erro ao inserir o lançamento:', error);
    return [];
  }

  return data;
}

export { setTimeline, iTimeline, delTimelines, editTimelines, getTimelines, toListTimeline };
