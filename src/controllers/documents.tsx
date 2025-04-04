import { useState } from 'react';
import { supabase } from '../utils/supabase'

interface iDoc{
  id: number; 
  userId: number; 
  createAt: string;  //passa os parametros do registro aqui
}

//documents, setdocuments
const [documents, setDocuments] = useState<iDoc[]>([]);



//função do banco de dados
async function insertDocument(document: iDoc/*, p0: number, userId: any, p1: number*/) {//mesma coisa que o set só que com nome dif para não ter conflito
    const { data, error } = await supabase.from('documents')
  .insert([
    document //vai receber req da da view do obj princ -- recebe o obj -- some_column: 'someValue', other_column: 'otherValue' },
  ])
  .select()
    
    if(error){// aqui vem os tratamentos da variavel erro --> "try catch"
        
        return "Erro!"
    }//catch error
    return data
}

export {insertDocument, documents, setDocuments}

          
