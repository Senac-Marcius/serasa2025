import React, { useState } from 'react';
import { supabase } from '../utils/supabase'; 
 
interface iItem {
    typology: string,
    title: string,
    subtitle: string,
    responsible: string,
    translation: string,
    language: string,
    image: string,
    year: string,
    edition: string,
    publisher: string,
    location: string,
    number_pages: string,
    serie: string,
    volume: string,
    format: string,
    isbn: string,
    issn: string,
    cdd: string,
    call_number: string,
    subject: string,
    keywords: string,
    summary: string,
    notes: string,
    number_copies: string,
    status: string,
    url: string,
    file: string,
    type_loan: string,
    incorporated: boolean,
    created_at: string,
    id: number,
}

function toListItems(data:iItem[]){
    const resp = [];
    data.map((c)=>{
        resp.push({key:c.id, option: '$(c.typology) - $(c.title) -  $(c.subtitle) - $(c.responsible) -  $(c.translation) - $(c.language) - $(c.image) -  $(c.year) - $(c.edition) -  $(c.publisher) - $(c.location) -  $(c.number_pages) - $(c.serie) -  $(c.volume) - $(c.format) -  $(c.issn) - $(c.isbn) -  $(c.subject) - $(c.keywords) -  $(c.summary) - $(c.notes) -  $(c.number_copies) - $(c.status) -  $(c.url) - $(c. file) -  $(c.type_loan) -  $(c.incorporated:)' })

    })
}

async function getItems(params:any){
    const{data:todos, error} = await supabase.from('items_librarie').select('*');


    if(error)
        return{status:false, error:error}


    return{status:true, data:todos}    
}

async function setItem(item:iItem){
    //aqui vem os tratamentos de regex ou do modelo de negócio antes de inserir
 
    const { data, error } = await supabase.from('items_librarie')
    .insert([
        item
    ])
    .select()
    
    if(error){
        console.error('Erro',error);
        return null;
    }

    console.log('Item inserido com sucesso:', data);

    return data
}

async function deleteItemById(id: number) {
    const { error } = await supabase
        .from('items_librarie')
        .delete()
        .eq('id', id)

    if (error) {
        console.error("Erro ao deletar item:")
        return false
    }

    return "Item excluído"
}

async function updateItemById(id: number, updatedItem: Partial<iItem>) {
    const { error } = await supabase
        .from('items_librarie')
        .update(updatedItem)
        .eq('id', id);

    if (error) {
        console.error("Erro ao atualizar item:", error.message);
        return false;
    }
    return true;
}



export {iItem, setItem, deleteItemById, updateItemById, getItems, toListItems}
        