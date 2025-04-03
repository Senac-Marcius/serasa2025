import React, { useState } from "react";
import { supabase } from '../utils/supabase'

interface iProject {
        name: string;
        namep: string;
        id: number;
        url: string;
        createAt: string;
        userId: number;
        recurces: number;
        description: string;
        activity: string;
        timeline: string;
        objective: string;
        methodology: string;
        techniques: string;
        strategies: string;
        planning: string;
        process: string;
    }

const [ projects, setProjects ] = useState<iProject[]>([]);

async function setProject(project:iProject){
const { data, error } = await supabase
  .from('projects')
  .insert([
    { some_column: 'someValue', other_column: 'otherValue' },
  ])
  .select()
}
          