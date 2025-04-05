import { supabase } from '../utils/supabase'

interface iDoc{
  id: number; 
  user_id: number; 
  created_at: string;  //passa os parametros do registro aqui
}


//função do banco de dados
async function insertDocument(document: iDoc) {//mesma coisa que o set só que com nome dif para não ter conflito
  try{
    const { data, error } = await supabase.from('documents')
    .insert([
      document //vai receber req da da view do obj princ -- recebe o obj -- some_column: 'someValue', other_column: 'otherValue' },
    ])
    .select()
      
      if(error){// aqui vem os tratamentos da variavel erro --> "try catch"

        console.error('Erro ao inserir docuemnto: ', error);//message
        return "Erro!"
      }
  }catch(err){
    console.error('Erro ao inserir docuemnto: ', err);
    return 'Erro desconhecido!'
    
  }
}

export {insertDocument, iDoc}

          
