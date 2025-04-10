import React, { useState } from 'react';
import { supabase } from '../utils/supabase';

interface iTimeline {
  id: number;
  url: string;
  class_id: number;
  discipline: string;
  local_id: number;
  start_time: string;
  end_time: string;
  created_at: string;
}

// Function to edit a timeline
async function editTimelines(id: number, updatedData: Partial<iTimeline>) {
  try {
    const { data, error } = await supabase
      .from('timelines')
      .update(updatedData) // Pass updated data
      .eq('id', id)
      .select(); // Fetch updated timeline to ensure it's correct

    if (error) {
      console.error('Error updating timeline:', error);
      return null;
    }

    return data; // Return updated data
  } catch (error) {
    console.error('Unexpected error during edit:', error);
    return null;
  }
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

// Function to insert a new timeline
async function setTimeline(timeline: iTimeline) {
  // Example: validation code (you can adjust as needed)
  const urlRegex = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
  const classRegex = /^[a-zA-Z0-9\s\-_]+$/;
  const disciplineRegex = /^[a-zA-ZÀ-ÿ\s\-']+$/;
  const locationRegex = /^[a-zA-Z0-9\s\-,.]+$/;
  const start_timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
  const end_timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  // Validate inputs
  if (!urlRegex.test(timeline.url)) {
    return "URL deve seguir o formato válido (ex: http://exemplo.com)";
  }

  if (!classRegex.test(timeline.class_id.toString())) {
    return "Classe deve conter apenas letras, números, espaços, hífens ou underscores";
  }

  if (!disciplineRegex.test(timeline.discipline)) {
    return "Disciplina deve conter apenas caracteres válidos";
  }

  if (!locationRegex.test(timeline.local_id.toString())) {
    return "Localização contém caracteres inválidos";
  }

  if (!start_timeRegex.test(timeline.start_time)) {
    return "Hora de início deve estar no formato HH:MM (24h)";
  }

  if (!end_timeRegex.test(timeline.end_time)) {
    return "Hora de término deve estar no formato HH:MM (24h)";
  }

  if (!dateRegex.test(timeline.created_at)) {
    return "Data de criação deve estar no formato YYYY-MM-DD";
  }

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

export { setTimeline, iTimeline, delTimelines, editTimelines };
