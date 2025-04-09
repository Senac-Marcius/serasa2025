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
    .insert([post])
    .select();  
    
    if(error){
        //aqui vem os tratamentos da variável error


        return []
    }

    return data
}

//aqui função de edit
async function editPosts(id: number, updatedData: Partial<iPost>) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .update(updatedData) // Pass updated data
        .eq('id', id)
        .select(); // Fetch updated timeline to ensure it's correct
   
      if (error) {
        console.error('Erro ao atualizar a postagem:', error);
        return null;
      }
   
      return data; // Return updated data
    } catch (error) {
      console.error('Erro inesperado durante a edição:', error);
      return null;
    }
  }

// aqui função de delete

async function delPosts(id: number) {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);
   
      if (error) {
        console.error('Erro ao excluir postagem:', error);
        return false;
      }
   
      return true; // Return true if deletion was successful
    } catch (error) {
      console.error('Erro inesperado durante a exclusão:', error);
      return false;
    }
  }

  const regex = {
    id: /^\d+$/,
    url: /^https?:\/\/[^\s$.?#].[^\s]*$/,
    description: /^.{1,500}$/,
    like: /^\d+$/,
    created_at: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?$/,
    user_id: /^\d+$/
  };
  
  const isValid = (post: iPost) =>
    regex.id.test(post.id.toString()) &&
    regex.url.test(post.url) &&
    regex.description.test(post.description) &&
    regex.like.test(post.like.toString()) &&
    regex.created_at.test(post.created_at) &&
    regex.user_id.test(post.user_id.toString());
  


export {setPost, iPost, delPosts, editPosts} 