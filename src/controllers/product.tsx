import React, {useState} from 'react';
import { supabase } from '../utils/supabase'


interface iProduct {
    description: string,
    name: string,
    id: number,
    userId: number,
    createAt: string
}
const [products, setProducts] = useState<iProduct[]>([]);

async function setProduct(product:iProduct){
    //aqui vem os tratamentos de regex ou do modelo de negócco antes de inserir 


const { data, error } = await supabase.from ('products')
  .from('products')
  .insert([
    product
  ])
  .select()

    if(error){
    // aqui vem os tratamentos da variável erro
    
        return []
    }
    
    return data 
}
export {setProduct}