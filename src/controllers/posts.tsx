import React, { useState } from 'react';
import { supabase } from '../utils/supabase'

interface iPost {
    name: string,
    description: string,
    id: number,
    createAt: string,
    userId: number,
}

const[posts, setPosts] = useState<iPost[]>([]);

async function setPost(post:iPost){
    //aqui vem os tratamentos de regex ou do modelo de negócio antes de inserir
 
    const { data, error } = await supabase.from('posts')
    .insert([
        post
    ])
    .select()
    
    if(error){
        //aqui vem os tratamentos da variável error


        return []
    }

    return data
}

export {setPost} 