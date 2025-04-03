import React, { useState } from 'react';
import { supabase } from '../utils/supabase'

interface iRevenues{
    id: number;
    description: string;
    name: string;
    url: string;
    createAt: string;
    userId: number;
    value: string;
    scholarshipStatus: string;
    discountPercentage: string;
}


// Estado para a lista de receitas
const [revenues, setRevenues] = useState<iRevenues[]>([]);



async function  setRevenue(revenue:iRevenues ){
    // aqui vem os tratamnetos de regex ou do modelo de negocio antes de inserir
       // Regex definitions
    const idRegex = /^\d+$/;
    const descriptionRegex = /^[\w\s.,!?-]{1,500}$/;
    const nameRegex = /^[A-Za-zÀ-ÿ\s-]{2,100}$/;
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    const valueRegex = /^(R\$\s*)?\d+(,\d{2})?$/;
    const statusRegex = /^(ativo|inativo|pendente)$/;
    const percentageRegex = /^(100|\d{1,2}(,\d+)?)%$/;

    // Validation checks
    if (!idRegex.test(String(req.id))) {
        return "Campo id deve conter apenas números";
    }

    if (!descriptionRegex.test(req.description)) {
        return "Campo description deve ter entre 1 e 500 caracteres (letras, números ou pontuação básica)";
    }

    if (!nameRegex.test(req.name)) {
        return "Campo name deve conter apenas letras, espaços ou hífens (2-100 caracteres)";
    }

    if (!urlRegex.test(req.url)) {
        return "Campo url deve conter o seguinte formato https://dominio";
    }

    if (!dateRegex.test(req.createAt)) {
        return "Campo createAt deve conter o seguinte formato YYYY-MM-DD";
    }

    if (!idRegex.test(String(req.userId))) {
        return "Campo userId deve conter apenas números";
    }

    if (!valueRegex.test(req.value)) {
        return "Campo value deve ser um valor monetário (ex: '100', 'R$ 50,00')";
    }

    if (!statusRegex.test(req.scholarshipStatus)) {
        return "Campo scholarshipStatus deve ser 'ativo', 'inativo' ou 'pendente'";
    }

    if (!percentageRegex.test(req.discountPercentage)) {
        return "Campo discountPercentage deve ser uma porcentagem válida (0% a 100%)";
    }



    const { data, error } = await supabase
    .from('revenues')
    .insert([
        revenue
    ])
    .select()

   
   
    if (error){
 // aqui vem os tratamentos da variavel error


        return[]
    }

    return data
}

export {setRevenue}