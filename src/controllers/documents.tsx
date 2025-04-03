import React, { useState } from 'react';
import { supabase } from '../utils/supabase'



interface iDoc{
    //passa os parametros do registro aqui
}
//documents, setdocuments
const [file, setFile] = useState<iDoc[]>[()];


async function setDocuments(documents:iDoc) {
    const { data, error } = await supabase
  .from('documents')
  .insert([
    documents //vai receber req da da view do obj princ   //some_column: 'someValue', other_column: 'otherValue' },
  ])
  .select()
    
    if(error){
        // aqui vem os tratamentos da variavel erro --> "try catch"
        return[]
    }
    return data
}

export {setDocuments}

          
