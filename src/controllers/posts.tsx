import { supabase } from '../utils/supabase'

interface iPost {
    url: string,
    description: string,
    id: number,
    like: number,
    create_at: string,
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
        console.error('Erro ao buscar posts:', error);

        return []
    }

    return data
}

async function getPosts(): Promise<iPost[]> {
    const { data, error } = await supabase.from('posts').select();
  
    if (error) {
      console.error('Erro ao buscar posts:', error);
      return [];
    }
  
    return data || [];
}

export {setPost, getPosts, iPost} 