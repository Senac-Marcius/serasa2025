import React, { useState } from 'react';
import { supabase } from '../utils/supabase'; 
 
interface iItems {
    typology: string,
    title: string,
    subtitle: string,
    responsible: string,
    translation: string,
    language: string,
    year: string,
    edition: string,
    publisher: string,
    location: string,
    numberPages: string,
    serie: string,
    volume: string,
    format: string,
    isbn: string,
    issn: string,
    cdd: string,
    callNumber: string,
    subject: string,
    keywords: string,
    summary: string,
    notes: string,
    numberCopies: string,
    status: string,
    url: string,
    file: string,
    typeLoan: string,
    createAt: string,
    id: number,
}

const [items, setItems] = useState<iItems[]>([]);

async function setItem(items: iItems){   

const { data, error } = await supabase.from('items_librarie')
    .insert([
        items
    ])
    .select() 

    if (error){

             // aqui vem os tratamentos da variavel error
        return []
    }

    return data
}

export {setItem}
        