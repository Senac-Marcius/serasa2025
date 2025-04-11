import { supabase } from '../utils/supabase'

interface iPost {
<<<<<<< HEAD
    url: string,
    description: string,
    id: number,
    like: number,
    create_at: string,
    user_id: number,
}

function toListPost(data: iPost[]){
  const resp: {key: number, option: string}[] = [];

  data.map((i) => {
    resp.push({ key: i.id, option: `${i.id}`})
  })
  return resp;
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
=======
  id: number,
  url: string,
  description: string,
  like: number,
  user_id: number,
}

async function getPosts(params:any) {
  const { data: todos, error } = await supabase.from('posts').select();

  if (error) 
    return {status: false, error: error }

  return {status: true, data: todos }

>>>>>>> 3f7606557d78c4c0932b895e643cb74f6da07f1b

}

async function setPost(post: iPost) {
  //aqui vem os tratamentos de regex ou do modelo de negócio antes de inserir

  const { data, error } = await supabase.from('posts')
    .insert([post])
    .select();

  if (error) {
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

<<<<<<< HEAD
async function getPosts(): Promise<iPost[]> {
    const { data, error } = await supabase.from('posts').select();
  
    if (error) {
      console.error('Erro ao buscar posts:', error);
      return [];
    }
  
    return data || [];
}

export {setPost, getPosts, iPost, toListPost} 
=======
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
  user_id: /^\d+$/
};

const isValid = (post: iPost) =>
  regex.id.test(post.id.toString()) &&
  regex.url.test(post.url) &&
  regex.description.test(post.description) &&
  regex.like.test(post.like.toString()) &&
  regex.user_id.test(post.user_id.toString());



export { setPost, iPost, delPosts, editPosts, getPosts } 
>>>>>>> 3f7606557d78c4c0932b895e643cb74f6da07f1b
