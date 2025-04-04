import React, {useState} from "react";
import { supabase } from '../utils/supabase'


interface iCourses{
    id: number,
    created_at: string,
    description: string,
    courseplan: string,
    orientationplan: string,
    workload: string,
    userId: number
}

const [CoursesPosts, setCourses] = useState<iCourses[]> ([]);

async function setCoursebd(courses:iCourses ){
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

export {CoursesPosts, setCoursebd, setCourses}