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

// No arquivo products.ts (controller)
async function updateProduct(product: iProduct) {
  const { data, error } = await supabase
      .from('products')
      .update(product)
      .eq('id', product.id)
      .select();

  if (error) {
      console.log(error);
      return null;
  }
  
  return data;
}

async function deleteProduct(id: number) {
  const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

  if (error) {
      console.log(error);
      return false;
  }
  
  return true;
}



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
          
export {setProduct, updateProduct, deleteProduct, iProduct };

