import React, {useState} from "react";
import { supabase } from '../utils/supabase'


interface iCourses{
    description: string,
    Courseplan: string,
    Orientationplan: string,
    Workload: string,
    id: number,
    userId: number,
}

const [CoursesPosts, setCourses] = useState<iCourses[]> ([]);

async function setCourse(courses:iCourses ){
    //aqui vem os tratamenos de regez ou model ode negocio antes de inseir
    const { data, error } = await supabase.from('courses')
    .insert([
      { courses },
    ])
    .select()
    
    
    if(error){
    // aqui vm os tratamentos da variavel error 
    return[]   
    }

    return data


}        

export {setCourse}