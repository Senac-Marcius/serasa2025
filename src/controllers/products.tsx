import React, {useState} from 'react';
import { supabase } from '../utils/supabase'


interface iProduct {
    description: string,
    name: string,
    id: number,
    user_id: number,
    create_at: string
}
const [products, setProducts] = useState<iProduct[]>([]);

async function setProduct(products:iProduct){
    //aqui vem os tratamentos de regex ou do modelo de negócco antes de inserir 


const { data, error } = await supabase.from ('products')
  .insert([
    products
  ])
  .select()

    if(error){
       console.log(error)           // aqui vem os tratamentos da variável erro
    
        return []
    }
    
    return data 
}
export {setProduct, iProduct}