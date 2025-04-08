import { supabase } from '../utils/supabase'

interface iDoc{
  id: number; 
  name: string; 
  url: string; 
  user_id: number; 
  type: string; 
  created_at: string;
}



//função do banco de dados
async function insertDocument(document: iDoc) {//mesma coisa que o set só que com nome dif para não ter conflito
  try{
    const { data, error } = await supabase
    .from('documents')
    .insert([
      document //vai receber req da da view do obj princ -- recebe o obj -- some_column: 'someValue', other_column: 'otherValue' },
    ])
    .select();
      
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

export {insertDocument, iDoc}

          
