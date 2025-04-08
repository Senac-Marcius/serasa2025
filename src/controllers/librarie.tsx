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
    year: number,
    edition: string,
    publisher: string,
    location: string,
    number_pages: number,
    serie: string,
    volume: number,
    format: string,
    isbn: string,
    issn: string,
    cdd: string,
    call_number: string,
    subject: string,
    keywords: string,
    summary: string,
    notes: string,
    number_copies: number,
    status: string,
    url: string,
    file: string,
    type_loan: string,
    created_at: string,
    id: number,
}

async function setItem(item: iItem){   

const { data, error } = await supabase.from('items_librarie')
    .insert([
        item
    ])
    .select() 

    if (error){
        console.log (error)
             // aqui vem os tratamentos da variavel error
        return []
    }

    return data
}

export {setItem, iItem}
        