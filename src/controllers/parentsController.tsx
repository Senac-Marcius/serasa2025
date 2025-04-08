  import React, {useState} from 'react'
  import { supabase } from '../utils/supabase'
 
  
  interface iParent{
      id: number,
      name: string,
      rg:string,
      cpf:string,
      age:string,
      phone:string,
      email: string,
      kinship: string,
      createat: string,
      userid: number,
  }

export async function setParent(parent: iParent) {
    // Aqui você pode aplicar regex ou regras de negócio antes de inserir

    const { data, error } = await supabase
        .from('parents')
        .insert([parent])
        .select();

    if (error) {
        console.error('Erro ao inserir cadrastro do parente: ', error);
        return [];
    }

    return data;
}

/*async function setParentController(parent:iParent){
    //aqui vem os tratamentos de regex ou do modelo de negó´cio antes de inserir
    const { data, error } = await supabase.from('parents')
    .insert([ parent
    // { some_column: 'someValue', other_column: 'otherValue' },
    ])
    .select()

    if (error){
        //aqui vem os tratamentos da variavel error.
        return[]

    }

    return data
}


async function editParentSupa(parent:iParent):Promise<iParent[]| null>{
    const { data, error } = await supabase
    .from('parents')
    .update({
            name: parent.name,
            rg: parent.rg,
            cpf:parent.cpf,
            age: parent.age,
            phone: parent.phone,
            email: parent.email,
            kinship: parent.kinship ,

    })
    .eq('id', parent.id)
    .select()
    
    if (error){
        console.log('erro na edição:', error)
        return null

    }

    return data as iParent[]
}

async function delParentSupa(id:number):Promise<boolean>{
    const { error } = await supabase
    .from('parents')
    .delete()
    .eq('id', id)
    .select()
    
    if (error){
        console.log('erro na edição:', error)
        return false

    }

    return true
}*/
export async function getParents() {
    const { data, error } = await supabase.from('parents').select();

    if (error) {
        console.error('Erro ao buscar records: ', error);
        return [];
    }

    return data;
}

export async function editParentSupa(parent: iParent) {
    const { error } = await supabase
        .from('parent')
        .update({
            name: parent.name,
            rg: parent.rg,
            cpf: parent.cpf,
            age: parent.age,
            phone: parent.phone,
            email: parent.email,
            kinship: parent.kinship,
            createat: parent.createat,
            userid: parent.userid,
        })
        .eq('id', parent.id);

    return error;
}
export async function delParentSupa(id: number) {
    const { error } = await supabase.from('records').delete().eq('id', id);
    return error;
}



export { iParent}
