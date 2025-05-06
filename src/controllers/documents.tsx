import { supabase } from '../utils/supabase'

interface iDoc{
  id: number; 
  name: string; 
  url: string; 
  user_id: number; 
  type: string; 
  created_at: string;
}

// LISTAR DOCUMENTOS POR TIPO
async function getListDocuments(params: { type: string }) {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select()
      .ilike('type', params.type);

    if (error) {
      console.error('Erro ao listar documentos por tipo: ', error.message);
      return [];
    }

    return data;
  } catch (err) {
    console.error('Erro inesperado ao listar documentos: ', err);
    return [];
  }
}



//função do banco de dados - CREATE
async function insertDocument(document: iDoc) {//mesma coisa que o set só que com nome dif para não ter conflito
  try{
    const { data, error } = await supabase
    .from('documents')
    .insert([
      document //vai receber req da da view do obj princ -- recebe o obj -- some_column: 'someValue', other_column: 'otherValue' },
    ])
    //.select(); necessário apenas com o RLS do supabase ativo
      
      if(error){// aqui vem os tratamentos da variavel erro --> "try catch"

        console.error('Erro ao inserir documento: ', error);//message
        return "Erro!";
      }

    return data;

  }catch(err){
    console.error('Erro ao inserir documento2: ', err);
    return 'Erro desconhecido!';
    
  }
}

//UPDATE
async function updateDocument(req: iDoc) {
  try{
    const { error } = await supabase
    .from('documents')
    .update({
      name: req.name, 
      url: req.url,
      user_id: req.user_id, 
      type: req.type,
    })
    .eq('id', req.id);
      
      if(error){// aqui vem os tratamentos da variavel erro --> "try catch"

        console.error('Erro ao atualizar documento: ', error.message);//message
        return false;
      }

    return true;

  }catch(err){
    console.error('Erro 2: atualizar documento ', err);
    return false;
    
  }
}

//DELETE
async function deleteDocument(id: number) {
  try{
    const { error } = await supabase
    .from('documents')
    .delete()
    .eq('id', id);
      
      if(error){// aqui vem os tratamentos da variavel erro --> "try catch"

        console.error('Erro ao deletar documento: ', error);//message
        return false;
      }

    return true;

  } catch(err){
    console.error('Erro 2: ao deletar documento ', err);
    return false;
    
  }
}

export {insertDocument, updateDocument, deleteDocument, getListDocuments, iDoc}//toListDocument

//criar uma branch temporária, a partir da dev, juntar com essa dev e depois juntar com a dev principal
          