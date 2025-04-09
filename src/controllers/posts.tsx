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
 
    const { data, error } = await supabase.from('Timelines')
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

//aqui função de edit
async function editPosts(id: number, updatedData: Partial<iPost>) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .update(updatedData) // Pass updated data
        .eq('id', id)
        .select(); // Fetch updated timeline to ensure it's correct
   
      if (error) {
        console.error('Error updating post:', error);
        return null;
      }
   
      return data; // Return updated data
    } catch (error) {
      console.error('Unexpected error during edit:', error);
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
        console.error('Error deleting post:', error);
        return false;
      }
   
      return true; // Return true if deletion was successful
    } catch (error) {
      console.error('Unexpected error during delete:', error);
      return false;
    }
  }


export {setPost, iPost, delPosts, editPosts} 