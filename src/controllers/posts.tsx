import { supabase } from '../utils/supabase'

interface iPost {
    id: number,
    url: string,
    description: string,
    like: number,
    created_at: string,
    user_id: number,
}

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

export {setPost, iPost} 