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

  export function toListparent (data: iParent[]){
    //const resp = {key:Number,Option: string}
    const resp: {key:number, option: string}[]=[];

    data.map((p) => {
        resp.push({ key: p.id,option:p.name})
    })
    return resp
  }


  export async function getTimeParents(parents: any){
    const {data: todos,error} = await supabase.from('parents').select()

    if(error){
        console.log(error)//if não utiliza o else apenas se o primeiro return não retornar o erro. 
        return {status: false, error:error};
    }
    return {status:true, data:todos}
}



  export async function setParent(parent: iParent) {
    // 🔍 Tratativas com regex
    const { data, error } = await supabase
        .from('parents')
        .insert([parent])
        .select();

    if (error) {
        console.error('Erro ao inserir record: ', error);
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
        console.error('Erro ao buscar cadastros dos familiares: ', error);
        return [];
    }

    return data;
}

export async function editParent(parent: iParent) {
    const { error } = await supabase
        .from('parents')
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
export async function delParent(id: number) {
    const { error } = await supabase.from('parent').delete().eq('id', id);
    return error;
}



export { iParent}
